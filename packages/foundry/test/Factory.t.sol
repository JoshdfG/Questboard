// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/CommunityFactory.sol";
import "../contracts/CommunityMembership.sol";
import "../contracts/Community_NFT.sol";
import "../libraries/Error.sol";
import "../libraries/Event.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../libraries/Event.sol";

contract TestToken is ERC20 {
    constructor() ERC20("TestToken", "TTK") {
        _mint(msg.sender, 1_000_000 ether);
    }
}

contract CommunityFactoryTest is Test {
    CommunityFactory public factory;
    TestToken public token;
    address public admin1 = address(0xA11CE);
    address public admin2 = address(0xBEEF);
    address public admin3 = address(0xCAFE);
    address[] public admins;
    string public name = "DevDAO";
    string public description = "A dev community";
    string public communityImage = "ipfs://communityImage";

    function setUp() public {
        token = new TestToken();
        factory = new CommunityFactory();
        admins.push(admin1);
        admins.push(admin2);
        admins.push(admin3);
    }

    function testCreateCommunitySuccess() public {
        (address communityAddr, uint256 communityId) =
            factory.createCommunity(name, description, communityImage, admins, address(token));
        assertEq(communityId, 1, "Community ID should be 1");

        assertTrue(factory.isCommunityContract(communityAddr), "Community should be marked as created");

        address communityFromMapping = factory.getCommunity(communityId);

        assertEq(communityFromMapping, communityAddr, "Community address from mapping should match");

        factory.getTotalCommunities();

        Community community = Community(communityAddr);

        assertEq(community.name(), name);

        assertEq(community.description(), description);

        assertEq(community.communityImage(), communityImage, "Community image should match");

        assertEq(community.getTokenAddress(), address(token), "Token address should match");

        address[] memory communityAdmins = community.getAdmins();

        assertEq(communityAdmins.length, 3, "Community should have 3 admins");

        assertEq(communityAdmins[0], admin1, "Admin1 should match");

        assertEq(communityAdmins[1], admin2, "Admin2 should match");

        assertEq(communityAdmins[2], admin3, "Admin3 should match");
    }

    function testRevertWhenNotEnoughAdmins() public {
        address[] memory shortAdmins = new address[](2);
        shortAdmins[0] = admin1;
        shortAdmins[1] = admin2;

        vm.expectRevert(Error.NotEnoughAdmins.selector);
        factory.createCommunity(name, description, communityImage, shortAdmins, address(token));
    }

    function testRevertWhenEmptyName() public {
        vm.expectRevert(Error.EmptyName.selector);
        factory.createCommunity("", description, communityImage, admins, address(token));
    }

    function testRevertWhenEmptyCommunityImage() public {
        vm.expectRevert(Error.EmptyCommunityImage.selector);
        factory.createCommunity(name, description, "", admins, address(token));
    }

    function testRevertWhenInvalidTokenAddress() public {
        vm.expectRevert(Error.InvalidTokenAddress.selector);
        factory.createCommunity(name, description, communityImage, admins, address(0));
    }
}
