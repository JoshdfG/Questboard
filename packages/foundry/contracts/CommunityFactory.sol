//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../contracts/CommunityMembership.sol";
import "../libraries/Event.sol";

contract CommunityFactory is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    uint256 private communityIdCounter;

    error EmptyName();
    error EmptyCommunityImage();

    mapping(uint256 => address) public communities;
    mapping(address => uint256[]) public userCommunities;
    mapping(address => bool) public isCommunityContract;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        communityIdCounter = 1;
    }

    function createCommunity(
        string memory _name,
        string memory _description,
        string memory _communityImage,
        address[] memory _admins,
        address _token_address
    ) external returns (address communityAddress, uint256 communityId) {
        if (bytes(_name).length == 0) {
            revert EmptyName();
        }

        if (bytes(_communityImage).length == 0) {
            revert EmptyCommunityImage();
        }

        if (_admins.length < 3) {
            revert Error.NotEnoughAdmins();
        }

        communityId = communityIdCounter;
        communityIdCounter += 1;

        Community newCommunity = new Community(_name, _description, _communityImage, _admins, _token_address);

        communityAddress = address(newCommunity);
        communities[communityId] = communityAddress;
        userCommunities[msg.sender].push(communityId);
        isCommunityContract[communityAddress] = true;

        emit Event.CommunityCreated(communityId, communityAddress, msg.sender, _name);

        return (communityAddress, communityId);
    }

    function getCommunity(uint256 _communityId) external view returns (address) {
        return communities[_communityId];
    }

    function getUserCommunities(address _user) external view returns (uint256[] memory) {
        return userCommunities[_user];
    }

    function getTotalCommunities() external view returns (uint256) {
        return communityIdCounter;
    }

    function isValidCommunity(address _community) external view returns (bool) {
        return isCommunityContract[_community];
    }
}
