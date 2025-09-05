// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../libraries/Error.sol";

contract CommunityMembershipNFT is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 private _taskIdCounter;
    uint256 private _requestIdCounter;
    uint256 private _tokenIdCounter;

    string private _communityImage;
    address public communityContract;

    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name, string memory symbol, string memory communityImage, address community)
        ERC721(name, symbol)
    {
        _communityImage = communityImage;
        communityContract = community;
        _grantRole(DEFAULT_ADMIN_ROLE, community);
        _grantRole(MINTER_ROLE, community);
    }

    function mint(address to) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _communityImage);
        return tokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        if (_ownerOf(tokenId) == address(0)) {
            revert Error.UriOfNonExistentToken();
        }
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (_ownerOf(tokenId) == address(0)) {
            revert Error.UriQueryForNonExistentToken();
        }
        return _tokenURIs[tokenId];
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
