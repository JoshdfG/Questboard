// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

library Error {
    error AlreadyAMember();
    error JoinRequestAlreadyExists();
    error InvalidRequest();
    error AlreadyApprovedByLeader();
    error AlreadyApproved();
    error NotACommunityLeader();
    error NotACommunityMember();
    error MustSendSomeToken();
    error MustBeAMemberFirst();
    error NoRewardsToClaim();
    error RewardMustBeGreaterThanZero();
    error InsufficientCommunityBalance();
    error AssigneeMustBeAMember();
    error TaskNotAvailable();
    error TaskAlreadyAssigned();
    error NotAssignedToThisTask();
    error ProofCannotBeEmpty();
    error NoProofSubmitted();
    error AmountMustBeGreaterThanZero();
    error UriOfNonExistentToken();
    error UriQueryForNonExistentToken();
    error MustHaveAtLeastThreeAdmins();
    error NotEnoughAdmins();
    error EmptyName();
    error EmptyCommunityImage();
    error InvalidTokenAddress();
}
