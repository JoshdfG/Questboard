// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../libraries/Error.sol";
import "../contracts/CommunityMembership.sol";
import "../contracts/Community_NFT.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor() ERC20("TestToken", "TTK") {
        _mint(msg.sender, 1_000_000 ether);
    }
}

contract CommunityTest is Test {
    Community public community;
    CommunityMembershipNFT public membershipNFT;
    TestToken public token;

    address[] public admins;
    address admin1 = address(0xA11CE);
    address admin2 = address(0xBEEF);
    address admin3 = address(0xCAFE);
    address leader = address(0xD00D);
    address member1 = address(0x1234);
    address member2 = address(0x5678);

    function setUp() public {
        token = new TestToken();

        admins.push(admin1);
        admins.push(admin2);
        admins.push(admin3);

        community = new Community("DevDAO", "A dev community", "ipfs://communityImage", admins, address(token));
        membershipNFT = CommunityMembershipNFT(community.getMembershipNFT());

        token.transfer(admin1, 1000 ether);

        vm.startPrank(admin1);
        token.approve(address(community), type(uint256).max);
        community.fundCommunity(500 ether);
        vm.stopPrank();
    }

    function test_RevertWhen_NotEnoughAdmins() public {
        address[] memory shortAdmins = new address[](2);
        shortAdmins[0] = admin1;
        shortAdmins[1] = admin2;

        vm.expectRevert(Error.MustHaveAtLeastThreeAdmins.selector);
        new Community("ShortDAO", "desc", "ipfs://img", shortAdmins, address(token));
    }

    function test_RevertWhen_EmptyName() public {
        vm.expectRevert(Error.EmptyName.selector);
        new Community("", "desc", "ipfs://img", admins, address(token));
    }

    function test_RevertWhen_EmptyCommunityImage() public {
        vm.expectRevert(Error.EmptyCommunityImage.selector);
        new Community("DevDAO", "desc", "", admins, address(token));
    }

    function testRequestToJoin() public {
        vm.prank(member1);
        community.requestToJoin();

        uint256 requestId = community.memberJoinRequestId(member1);
        assertGt(requestId, 0);
    }

    function testApproveJoinRequest() public {
        vm.prank(member1);
        community.requestToJoin();

        uint256 requestId = community.memberJoinRequestId(member1);

        vm.prank(admin1);
        community.addLeader(admin2);
        vm.prank(admin1);
        community.addLeader(admin3);

        vm.prank(admin1);
        community.approveJoinRequest(requestId);
        vm.prank(admin2);
        community.approveJoinRequest(requestId);
        vm.prank(admin3);
        community.approveJoinRequest(requestId);

        assertTrue(community.isMember(member1));
    }

    function test_RevertWhen_AlreadyAMemberRequestsJoin() public {
        vm.prank(admin1);
        vm.expectRevert(Error.AlreadyAMember.selector);
        community.requestToJoin();
    }

    function testCreateTask() public {
        vm.prank(admin1);
        community.createTask("Do something", 100 ether);

        uint256 tasklength = community.getTaskLength();
        assertEq(tasklength, 1);

        (string memory desc, uint256 reward,,,,,,) = community.getTaskDetails(1);
        assertEq(desc, "Do something");
        assertEq(reward, 100 ether);
    }

    function testGetTasklength() public {
        testCreateTask();
        uint256 tasklength = community.getTaskLength();
        assertEq(tasklength, 1);
    }

    function testGetAllTask() public {
        testCreateTask();
        uint256 tasklength = community.getTaskLength();
        assertEq(tasklength, 1);
    }

    function testAssignTask() public {
        vm.prank(member1);
        community.requestToJoin();

        uint256 requestId = community.memberJoinRequestId(member1);

        vm.prank(admin1);
        community.addLeader(admin2);
        vm.prank(admin1);
        community.addLeader(admin3);
        vm.prank(admin1);
        community.approveJoinRequest(requestId);
        vm.prank(admin2);
        community.approveJoinRequest(requestId);
        vm.prank(admin3);
        community.approveJoinRequest(requestId);

        vm.prank(admin1);
        community.createTask("Fix bug", 50 ether);

        uint256 tasklength = community.getTaskLength();
        assertEq(tasklength, 1);

        vm.prank(admin1);
        community.assignTask(2, member1);

        (,,,,, address assignee,,) = community.getTaskDetails(2);
        assertEq(assignee, member1);
    }

    function testSubmitProofAndApproveTask() public {
        vm.prank(admin1);
        community.createTask("Write docs", 20 ether);

        vm.prank(admin1);
        community.assignTask(1, admin1);

        vm.prank(admin1);
        community.submitProof(1, "ipfs://proof");

        vm.prank(admin1);
        community.addLeader(admin2);
        vm.prank(admin1);
        community.addLeader(admin3);

        vm.prank(admin1);
        community.approveTask(1);
        vm.prank(admin2);
        community.approveTask(1);
        vm.prank(admin3);
        community.approveTask(1);

        uint256 claimable = community.claimableRewards(admin1);
        assertEq(claimable, 20 ether);
    }

    function testClaimReward() public {
        vm.prank(admin1);
        community.createTask("Do work", 10 ether);
        vm.prank(admin1);
        community.assignTask(1, admin1);
        vm.prank(admin1);
        community.submitProof(1, "proof");

        vm.prank(admin1);
        community.addLeader(admin2);
        vm.prank(admin1);
        community.addLeader(admin3);
        vm.prank(admin1);
        community.approveTask(1);
        vm.prank(admin2);
        community.approveTask(1);
        vm.prank(admin3);
        community.approveTask(1);

        vm.prank(admin1);
        community.claimReward();

        assertEq(token.balanceOf(admin1), 510 ether);
    }

    function testFundCommunity() public {
        vm.prank(admin1);
        community.fundCommunity(50 ether);

        assertEq(community.communityBalance(), 550 ether);
    }
}
