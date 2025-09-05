// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/CommunityMembership.sol";
import "../libraries/Error.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

contract MockCommunity {
    function mintNFT(address nftContract, address to) external returns (uint256) {
        return CommunityMembershipNFT(nftContract).mint(to);
    }
}

contract CommunityMembershipNFTTest is Test {
    CommunityMembershipNFT public nft;
    MockCommunity public community;
    address public communityAddr;
    address public user1 = address(0x1234);
    address public user2 = address(0x5678);
    string public name = "DevDAO Membership";
    string public symbol = "DDM_NFT";
    string public communityImage = "ipfs://communityImage";

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DEFAULT_ADMIN_ROLE = bytes32(0);

    function setUp() public {
        community = new MockCommunity();
        communityAddr = address(community);
        nft = new CommunityMembershipNFT(name, symbol, communityImage, communityAddr);
    }

    function testConstructor() public {
        assertEq(nft.name(), name, "Name should match constructor input");
        assertEq(nft.symbol(), symbol, "Symbol should match constructor input");
        assertEq(nft.communityContract(), communityAddr, "Community contract address should match");
        emit log_address(communityAddr);
        emit log_bytes32(DEFAULT_ADMIN_ROLE);
        assertTrue(nft.hasRole(MINTER_ROLE, communityAddr), "Community should have MINTER_ROLE");
        assertTrue(nft.hasRole(DEFAULT_ADMIN_ROLE, communityAddr), "Community should have DEFAULT_ADMIN_ROLE");
    }

    function testMintSuccess() public {
        vm.prank(communityAddr);
        uint256 tokenId = community.mintNFT(address(nft), user1);

        assertEq(tokenId, 0, "Token ID should be 0");
        assertEq(nft.ownerOf(tokenId), user1, "Token should be owned by user1");
        assertEq(nft.tokenURI(tokenId), communityImage, "Token URI should match community image");
        assertEq(nft.balanceOf(user1), 1, "User1 should own 1 NFT");
    }

    function testMintRevertsForNonMinter() public {
        vm.prank(user1);
        vm.expectRevert(
            abi.encodeWithSelector(IAccessControl.AccessControlUnauthorizedAccount.selector, user1, MINTER_ROLE)
        );
        nft.mint(user2);
    }

    function testTokenURIRevertsForNonExistentToken() public {
        vm.expectRevert(Error.UriQueryForNonExistentToken.selector);
        nft.tokenURI(0);
    }

    function testSetTokenURIIndirectlyThroughMint() public {
        vm.prank(communityAddr);
        uint256 tokenId = community.mintNFT(address(nft), user1);
        assertEq(nft.tokenURI(tokenId), communityImage, "Token URI should match community image");

        vm.expectRevert(Error.UriQueryForNonExistentToken.selector);
        nft.tokenURI(tokenId + 1);
    }

    function testMultipleMints() public {
        vm.prank(communityAddr);
        uint256 tokenId1 = community.mintNFT(address(nft), user1);
        vm.prank(communityAddr);
        uint256 tokenId2 = community.mintNFT(address(nft), user2);

        assertEq(tokenId1, 0, "First token ID should be 0");
        assertEq(tokenId2, 1, "Second token ID should be 1");
        assertEq(nft.ownerOf(tokenId1), user1, "Token 0 should be owned by user1");
        assertEq(nft.ownerOf(tokenId2), user2, "Token 1 should be owned by user2");
        assertEq(nft.tokenURI(tokenId1), communityImage, "Token 0 URI should match community image");
        assertEq(nft.tokenURI(tokenId2), communityImage, "Token 1 URI should match community image");
        assertEq(nft.balanceOf(user1), 1, "User1 should own 1 NFT");
        assertEq(nft.balanceOf(user2), 1, "User2 should own 1 NFT");
    }

    function testSupportsInterface() public view {
        assertTrue(nft.supportsInterface(0x80ac58cd), "Should support ERC721 interface");
        assertTrue(nft.supportsInterface(0x7965db0b), "Should support AccessControl interface");
        assertTrue(nft.supportsInterface(0x01ffc9a7), "Should support ERC165 interface");
        assertFalse(nft.supportsInterface(0x12345678), "Should not support invalid interface");
    }

    function testMintIncrementsTokenIdCounter() public {
        vm.prank(communityAddr);
        uint256 tokenId1 = community.mintNFT(address(nft), user1);
        vm.prank(communityAddr);
        uint256 tokenId2 = community.mintNFT(address(nft), user2);

        assertEq(tokenId1, 0, "First token ID should be 0");
        assertEq(tokenId2, 1, "Second token ID should be 1");
    }
}
