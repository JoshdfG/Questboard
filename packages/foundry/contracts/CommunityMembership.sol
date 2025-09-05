// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Pausable.sol";
import "../contracts/Community_NFT.sol";
import "../libraries/Error.sol";
import "../libraries/Event.sol";

contract Community is AccessControl, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    bytes32 public constant LEADER_ROLE = keccak256("LEADER_ROLE");
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");

    address[] public admins;
    mapping(address => bool) isAdmin;

    struct Task {
        uint256 id;
        string description;
        uint256 reward;
        address creator;
        bool isActive;
        bool isCompleted;
        address assignee;
        string proofSubmission;
        uint256 approvalCount;
        bool fundsReleased;
    }

    Task[] allTasks;

    struct JoinRequest {
        address requester;
        bool approved;
        uint256 approvalCount;
    }

    uint256 private _idCounter;
    string public name;
    string public description;
    string public communityImage;
    CommunityMembershipNFT public membershipNFT;
    IERC20 public token;
    mapping(uint256 => Task) public tasks;
    mapping(uint256 => JoinRequest) public joinRequests;
    mapping(address => uint256) public memberJoinRequestId;
    mapping(address => uint256) public claimableRewards;
    mapping(uint256 => mapping(address => bool)) public taskApprovals;
    mapping(uint256 => mapping(address => bool)) public joinRequestApprovals;
    mapping(uint256 => uint256) public taskReservedFunds;

    uint256 public constant QUORUM_SIZE = 3;
    uint256 public communityBalance;

    modifier onlyMember() {
        if (!hasRole(MEMBER_ROLE, msg.sender)) {
            revert Error.NotACommunityMember();
        }
        _;
    }

    modifier onlyLeader() {
        if (!hasRole(LEADER_ROLE, msg.sender)) {
            revert Error.NotACommunityLeader();
        }
        _;
    }

    constructor(
        string memory _name,
        string memory _description,
        string memory _communityImage,
        address[] memory _admins,
        address _tokenAddress
    ) {
        if (_admins.length < 3) {
            revert Error.MustHaveAtLeastThreeAdmins();
        }

        if (bytes(_name).length == 0) {
            revert Error.EmptyName();
        }

        if (bytes(_communityImage).length == 0) {
            revert Error.EmptyCommunityImage();
        }

        if (_tokenAddress == address(0)) {
            revert Error.InvalidTokenAddress();
        }

        name = _name;
        description = _description;
        communityImage = _communityImage;
        _idCounter = 1;
        token = IERC20(_tokenAddress);

        membershipNFT = new CommunityMembershipNFT(
            string(abi.encodePacked(_name, " Membership")),
            string(abi.encodePacked(_name, "_NFT")),
            _communityImage,
            address(this)
        );

        for (uint256 i = 0; i < _admins.length; i++) {
            _addAdmin(_admins[i]);
        }
    }

    function _addAdmin(address admin) internal {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(LEADER_ROLE, admin);
        _grantRole(MEMBER_ROLE, admin);

        membershipNFT.mint(admin);
        admins.push(admin);
        isAdmin[admin] = true;

        emit Event.AdminAdded(admin);
    }

    function addAdmin(address newAdmin) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _addAdmin(newAdmin);
    }

    function removeAdmin(address admin) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (admins.length <= 3) {
            revert Error.MustHaveAtLeastThreeAdmins();
        }

        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == admin) {
                admins[i] = admins[admins.length - 1];
                admins.pop();
                break;
            }
        }

        _revokeRole(DEFAULT_ADMIN_ROLE, admin);
        _revokeRole(LEADER_ROLE, admin);
        _revokeRole(MEMBER_ROLE, admin);

        emit Event.AdminRemoved(admin);
    }

    function getAdmins() external view returns (address[] memory) {
        return admins;
    }

    function requestToJoin() external whenNotPaused {
        if (hasRole(MEMBER_ROLE, msg.sender)) {
            revert Error.AlreadyAMember();
        }

        if (memberJoinRequestId[msg.sender] != 0) {
            revert Error.JoinRequestAlreadyExists();
        }

        uint256 requestId = _idCounter;
        _idCounter += 1;

        JoinRequest storage request = joinRequests[requestId];
        request.requester = msg.sender;

        memberJoinRequestId[msg.sender] = requestId;

        emit Event.JoinRequested(msg.sender, requestId);
    }

    function approveJoinRequest(uint256 requestId) external onlyLeader whenNotPaused {
        JoinRequest storage request = joinRequests[requestId];

        if (request.requester == address(0)) {
            revert Error.InvalidRequest();
        }

        if (request.approved) {
            revert Error.AlreadyApproved();
        }

        if (joinRequestApprovals[requestId][msg.sender]) {
            revert Error.AlreadyApprovedByLeader();
        }
        joinRequestApprovals[requestId][msg.sender] = true;
        request.approvalCount++;

        if (request.approvalCount >= QUORUM_SIZE) {
            request.approved = true;
            _grantRole(MEMBER_ROLE, request.requester);

            membershipNFT.mint(request.requester);

            memberJoinRequestId[request.requester] = 0;

            emit Event.JoinApproved(request.requester, requestId);
        }
    }

    function createTask(string memory _description, uint256 _reward) external onlyLeader whenNotPaused {
        if (_reward == 0) {
            revert Error.RewardMustBeGreaterThanZero();
        }
        if (communityBalance < _reward) {
            revert Error.InsufficientCommunityBalance();
        }

        uint256 taskId = _idCounter;
        _idCounter += 1;

        Task storage task = tasks[taskId];
        task.id = taskId;
        task.description = _description;
        task.reward = _reward;
        task.creator = msg.sender;
        task.isActive = true;

        allTasks.push(task);
        taskReservedFunds[taskId] = _reward;
        communityBalance -= _reward;

        emit Event.TaskCreated(taskId, _description, _reward);
    }

    function getAllTasks() external view returns (Task[] memory) {
        return allTasks;
    }

    function getTaskLength() external view returns (uint256) {
        return allTasks.length;
    }

    function cancelTask(uint256 taskId) external onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused {
        Task storage task = tasks[taskId];
        if (!task.isActive || task.isCompleted) {
            revert Error.TaskNotAvailable();
        }
        uint256 reservedAmount = taskReservedFunds[taskId];
        taskReservedFunds[taskId] = 0;
        task.isActive = false;
        communityBalance += reservedAmount;
        emit Event.TaskCanceled(taskId);
    }

    function assignTask(uint256 taskId, address assignee) external onlyLeader whenNotPaused {
        if (!hasRole(MEMBER_ROLE, assignee)) {
            revert Error.AssigneeMustBeAMember();
        }

        Task storage task = tasks[taskId];

        if (!(task.isActive && !task.isCompleted)) {
            revert Error.TaskNotAvailable();
        }

        if (task.assignee != address(0)) {
            revert Error.TaskAlreadyAssigned();
        }

        task.assignee = assignee;
        emit Event.TaskAssigned(taskId, assignee);
    }

    function submitProof(uint256 taskId, string memory proof) external onlyMember whenNotPaused {
        Task storage task = tasks[taskId];

        if (task.assignee != msg.sender) {
            revert Error.NotAssignedToThisTask();
        }

        if (!(task.isActive && !task.isCompleted)) {
            revert Error.TaskNotAvailable();
        }

        if (bytes(proof).length == 0) {
            revert Error.ProofCannotBeEmpty();
        }

        task.proofSubmission = proof;
        emit Event.ProofSubmitted(taskId, proof);
    }

    function approveTask(uint256 taskId) external onlyLeader whenNotPaused {
        Task storage task = tasks[taskId];

        if (!(task.isActive && !task.isCompleted)) {
            revert Error.TaskNotAvailable();
        }

        if (bytes(task.proofSubmission).length == 0) {
            revert Error.NoProofSubmitted();
        }

        if (taskApprovals[taskId][msg.sender]) {
            revert Error.AlreadyApprovedByLeader();
        }

        taskApprovals[taskId][msg.sender] = true;
        task.approvalCount++;

        emit Event.TaskApproved(taskId, msg.sender);

        if (task.approvalCount >= QUORUM_SIZE && !task.fundsReleased) {
            task.isCompleted = true;
            task.fundsReleased = true;
            claimableRewards[task.assignee] += task.reward;
            taskReservedFunds[taskId] = 0;

            emit Event.TaskCompleted(taskId, task.reward);
        }
    }

    function claimReward() external onlyMember nonReentrant whenNotPaused {
        uint256 amount = claimableRewards[msg.sender];
        if (amount == 0) revert Error.NoRewardsToClaim();

        claimableRewards[msg.sender] = 0;

        token.safeTransfer(msg.sender, amount);

        emit Event.RewardClaimed(msg.sender, amount);
    }

    function getClaimableReward() external view returns (uint256) {
        return claimableRewards[msg.sender];
    }

    function addLeader(address newLeader) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!hasRole(MEMBER_ROLE, newLeader)) {
            revert Error.MustBeAMemberFirst();
        }
        _grantRole(LEADER_ROLE, newLeader);
    }

    function removeLeader(address leader) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(LEADER_ROLE, leader);
    }

    function fundCommunity(uint256 amount) external {
        if (amount == 0) revert Error.AmountMustBeGreaterThanZero();

        token.safeTransferFrom(msg.sender, address(this), amount);
        communityBalance += amount;

        emit Event.CommunityFunded(msg.sender, amount);
    }

    function isMember(address user) external view returns (bool) {
        return hasRole(MEMBER_ROLE, user);
    }

    function isLeader(address user) external view returns (bool) {
        return hasRole(LEADER_ROLE, user);
    }

    function getMembershipNFT() external view returns (address) {
        return address(membershipNFT);
    }

    function getTokenAddress() external view returns (address) {
        return address(token);
    }

    function getTaskDetails(uint256 taskId)
        external
        view
        returns (
            string memory taskDescription,
            uint256 reward,
            address creator,
            bool isActive,
            bool isCompleted,
            address assignee,
            string memory proof,
            uint256 approvals
        )
    {
        Task storage task = tasks[taskId];
        return (
            task.description,
            task.reward,
            task.creator,
            task.isActive,
            task.isCompleted,
            task.assignee,
            task.proofSubmission,
            task.approvalCount
        );
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = token.balanceOf(address(this));
        if (balance > 0) {
            token.safeTransfer(msg.sender, balance);
        }
    }

    function getCommunityBalance() external view returns (uint256) {
        return communityBalance;
    }
}
