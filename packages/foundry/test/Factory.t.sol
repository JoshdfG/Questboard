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
// CommunityFactory public factory;
// TestToken public token;
// address public admin1 = address(0xA11CE);
// address public admin2 = address(0xBEEF);
// address public admin3 = address(0xCAFE);
// address[] public admins;
// string public name = "DevDAO";
// string public description = "A dev community";
// string public communityImage = "ipfs://communityImage";
//
// function setUp() public {
//     token = new TestToken();
//     factory = new CommunityFactory();
//     admins.push(admin1);
//     admins.push(admin2);
//     admins.push(admin3);
// }
//
// function testCreateCommunitySuccess() public {
//     vm.expectEmit(true, true, true, true);
//     emit Event.CommunityCreated(1, address(0), address(this), name);
//
//     (address communityAddr, uint256 communityId) =
//         factory.createCommunity(name, description, communityImage, admins, address(token));
//     assertEq(communityId, 1, "Community ID should be 1");
//     assertTrue(factory.isCommunityContract(communityAddr), "Community should be marked as created");
//     address communityFromMapping = factory.getCommunity(communityId);
//     assertEq(communityFromMapping, communityAddr, "Community address from mapping should match");
//     address[] memory communities = factory.getCommunities();
//     assertEq(communities.length, 1, "Communities array should have 1 element");
//     assertEq(communities[0], communityAddr, "Community address should match");
//
//     Community community = Community(communityAddr);
//     assertEq(community.name(), name, "Community name should match");
//     assertEq(community.description(), description, "Community description should match");
//     assertEq(community.communityImage(), communityImage, "Community image should match");
//     assertEq(community.getTokenAddress(), address(token), "Token address should match");
//     address[] memory communityAdmins = community.getAdmins();
//     assertEq(communityAdmins.length, 3, "Community should have 3 admins");
//     assertEq(communityAdmins[0], admin1, "Admin1 should match");
//     assertEq(communityAdmins[1], admin2, "Admin2 should match");
//     assertEq(communityAdmins[2], admin3, "Admin3 should match");
// }
//
// function testRevertWhenNotEnoughAdmins() public {
//     address[] memory shortAdmins = new address[](2);
//     shortAdmins[0] = admin1;
//     shortAdmins[1] = admin2;
//
//     vm.expectRevert(Error.MustHaveAtLeastThreeAdmins.selector);
//     factory.createCommunity(name, description, communityImage, shortAdmins, address(token));
// }
//
// function testRevertWhenEmptyName() public {
//     vm.expectRevert(Error.EmptyName.selector);
//     factory.createCommunity("", description, communityImage, admins, address(token));
// }
//
// function testRevertWhenEmptyCommunityImage() public {
//     vm.expectRevert(Error.EmptyCommunityImage.selector);
//     factory.createCommunity(name, description, "", admins, address(token));
// }
//
// function testRevertWhenInvalidTokenAddress() public {
//     vm.expectRevert(Error.InvalidTokenAddress.selector);
//     factory.createCommunity(name, description, communityImage, admins, address(0));
// }
//
// function testMultipleCommunityCreation() public {
//     (address communityAddr1, bool success1) =
//         factory.createCommunity(name, description, communityImage, admins, address(token));
//     assertTrue(success1, "First community creation should succeed");
//     (address communityAddr2, bool success2) =
//         factory.createCommunity("AnotherDAO", "Another community", "ipfs://anotherImage", admins, address(token));
//     assertTrue(success2, "Second community creation should succeed");
//
//     assertEq(factory.getCommunityCount(), 2, "Community count should be 2");
//     address[] memory communities = factory.getCommunities();
//     assertEq(communities.length, 2, "Communities array should have 2 elements");
//     assertEq(communities[0], communityAddr1, "First community address should match");
//     assertEq(communities[1], communityAddr2, "Second community address should match");
// }
//
// function testCommunityFunctionalityAfterCreation() public {
//     (address communityAddr, bool success) =
//         factory.createCommunity(name, description, communityImage, admins, address(token));
//     assertTrue(success, "Community creation should succeed");
//     Community community = Community(communityAddr);
//
//     vm.prank(admin1);
//     token.approve(communityAddr, type(uint256).max);
//     vm.prank(admin1);
//     community.fundCommunity(500 ether);
//
//     vm.prank(admin1);
//     community.createTask("Do work", 10 ether);
//
//     (
//         string memory desc,
//         uint256 reward,
//         address creator,
//         bool isActive,
//         bool isCompleted,
//         address assignee,
//         string memory proof,
//         uint256 approvals
//     ) = community.getTaskDetails(1);
//     assertEq(desc, "Do work", "Task description should match");
//     assertEq(reward, 10 ether, "Task reward should match");
//     assertEq(community.communityBalance(), 490 ether, "Community balance should be 490 ether after task creation");
// }
}
