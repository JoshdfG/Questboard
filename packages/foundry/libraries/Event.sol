// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

library Event {
    event TaskCreated(uint256 indexed taskId, string description, uint256 reward);
    event TaskAssigned(uint256 indexed taskId, address indexed assignee);
    event ProofSubmitted(uint256 indexed taskId, string proof);
    event TaskApproved(uint256 indexed taskId, address indexed approver);
    event TaskCompleted(uint256 indexed taskId, uint256 reward);
    event JoinRequested(address indexed requester, uint256 indexed requestId);
    event JoinApproved(address indexed newMember, uint256 indexed requestId);
    event RewardClaimed(address indexed member, uint256 amount);
    event CommunityFunded(address indexed funder, uint256 amount);
    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed removedAdmin);
    event TaskCanceled(uint256 indexed taskId);
    event CommunityCreated(
        uint256 indexed communityId, address indexed community, address indexed creator, string name
    );
}
