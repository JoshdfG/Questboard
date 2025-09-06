import { Address } from "viem";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import COMMUNITY_ABI from "~~/constants/CommunityAbi.json";

// Hook Configuration
interface HookConfig {
  contractAddress: Address;
  chainId?: number;
}

// =============================================================================
// READ HOOKS
// =============================================================================

// Constants
export function useDefaultAdminRole(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "DEFAULT_ADMIN_ROLE",
    chainId: 84532,
  });
}

export function useLeaderRole(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "LEADER_ROLE",
    chainId: 84532,
  });
}

export function useMemberRole(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "MEMBER_ROLE",
    chainId: 84532,
  });
}

export function useQuorumSize(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "QUORUM_SIZE",
    chainId: 84532,
  });
}

// Community Info
export function useCommunityName(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "name",
    chainId: 84532,
  });
}

export function useCommunityDescription(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "description",
    chainId: 84532,
  });
}

export function useCommunityImage(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "communityImage",
    chainId: 84532,
  });
}

export function useCommunityBalance(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "communityBalance",
    chainId: 84532,
  });
}

export function useGetCommunityBalance(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getCommunityBalance",
    chainId: 84532,
  });
}

export function usePaused(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "paused",
    chainId: 84532,
  });
}

// Token Info
export function useToken(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "token",
    chainId: 84532,
  });
}

export function useGetTokenAddress(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getTokenAddress",
    chainId: 84532,
  });
}

// Membership
export function useMembershipNFT(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "membershipNFT",
    chainId: 84532,
  });
}

export function useGetMembershipNFT(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getMembershipNFT",
    chainId: 84532,
  });
}

export function useIsMember(config: HookConfig, userAddress: Address) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "isMember",
    args: [userAddress],
    chainId: 84532,
  });
}

export function useIsLeader(config: HookConfig, userAddress: Address) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "isLeader",
    args: [userAddress],
    chainId: 84532,
  });
}

// Admins
export function useGetAdmins(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getAdmins",
    chainId: 84532,
  });
}

export function useAdmins(config: HookConfig, index: bigint) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "admins",
    args: [index],
    chainId: 84532,
  });
}

// Role Management
export function useHasRole(config: HookConfig, role: `0x${string}`, account: Address) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "hasRole",
    args: [role, account],
    chainId: 84532,
  });
}

export function useGetRoleAdmin(config: HookConfig, role: `0x${string}`) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getRoleAdmin",
    args: [role],
    chainId: 84532,
  });
}

// Tasks
export function useGetAllTasks(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getAllTasks",
    chainId: 84532,
  });
}

export function useGetTaskLength(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getTaskLength",
    chainId: 84532,
  });
}

export function useTasks(config: HookConfig, taskId: bigint) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "tasks",
    args: [taskId],
    chainId: 84532,
  });
}

export function useGetTaskDetails(config: HookConfig, taskId: bigint) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getTaskDetails",
    args: [taskId],
    chainId: 84532,
  });
}

export function useTaskReservedFunds(config: HookConfig, taskId: bigint) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "taskReservedFunds",
    args: [taskId],
    chainId: 84532,
  });
}

export function useTaskApprovals(config: HookConfig, taskId: bigint, approver: Address) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "taskApprovals",
    args: [taskId, approver],
    chainId: 84532,
  });
}

// Rewards
export function useClaimableRewards(config: HookConfig, userAddress: Address) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "claimableRewards",
    args: [userAddress],
    chainId: 84532,
  });
}

export function useGetClaimableReward(config: HookConfig) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getClaimableReward",
    chainId: 84532,
  });
}

// Join Requests
export function useJoinRequests(config: HookConfig, requestId: bigint) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "joinRequests",
    args: [requestId],
    chainId: 84532,
  });
}

export function useJoinRequestApprovals(config: HookConfig, requestId: bigint, approver: Address) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "joinRequestApprovals",
    args: [requestId, approver],
    chainId: 84532,
  });
}

export function useMemberJoinRequestId(config: HookConfig, memberAddress: Address) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "memberJoinRequestId",
    args: [memberAddress],
    chainId: 84532,
  });
}

// Interface Support
export function useSupportsInterface(config: HookConfig, interfaceId: `0x${string}`) {
  return useReadContract({
    address: config.contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "supportsInterface",
    args: [interfaceId],
    chainId: 84532,
  });
}

// =============================================================================
// WRITE HOOKS
// =============================================================================

// Admin Management
export function useAddAdmin(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const addAdmin = (newAdmin: Address) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "addAdmin",
      args: [newAdmin],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    addAdmin,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useRemoveAdmin(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const removeAdmin = (admin: Address) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "removeAdmin",
      args: [admin],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    removeAdmin,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

// Leader Management
export function useAddLeader(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const addLeader = (newLeader: Address) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "addLeader",
      args: [newLeader],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    addLeader,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useRemoveLeader(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const removeLeader = (leader: Address) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "removeLeader",
      args: [leader],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    removeLeader,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

// Role Management
export function useGrantRole(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const grantRole = (role: `0x${string}`, account: Address) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "grantRole",
      args: [role, account],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    grantRole,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useRevokeRole(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const revokeRole = (role: `0x${string}`, account: Address) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "revokeRole",
      args: [role, account],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    revokeRole,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useRenounceRole(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const renounceRole = (role: `0x${string}`, callerConfirmation: Address) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "renounceRole",
      args: [role, callerConfirmation],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    renounceRole,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

// Membership
export function useRequestToJoin(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const requestToJoin = () => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "requestToJoin",
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    requestToJoin,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useApproveJoinRequest(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const approveJoinRequest = (requestId: bigint) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "approveJoinRequest",
      args: [requestId],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    approveJoinRequest,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

// Task Management
export function useCreateTask(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const createTask = (description: string, reward: bigint) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "createTask",
      args: [description, reward],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    createTask,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useAssignTask(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const assignTask = (taskId: bigint, assignee: Address) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "assignTask",
      args: [taskId, assignee],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    assignTask,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useCancelTask(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const cancelTask = (taskId: bigint) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "cancelTask",
      args: [taskId],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    cancelTask,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useSubmitProof(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const submitProof = (taskId: bigint, proof: string) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "submitProof",
      args: [taskId, proof],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    submitProof,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useApproveTask(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const approveTask = (taskId: bigint) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "approveTask",
      args: [taskId],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    approveTask,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

// Funding and Rewards
export function useFundCommunity(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const fundCommunity = (amount: bigint) => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "fundCommunity",
      args: [amount],
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    fundCommunity,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function useClaimReward(config: HookConfig) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const claimReward = () => {
    writeContract({
      address: config.contractAddress,
      abi: COMMUNITY_ABI,
      functionName: "claimReward",
      chainId: 84532,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    claimReward,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Combined hook to get user's role information
 */
export function useUserRoles(config: HookConfig, userAddress: Address) {
  const { data: isMember, ...memberQuery } = useIsMember(config, userAddress);
  const { data: isLeader, ...leaderQuery } = useIsLeader(config, userAddress);

  // Get role constants
  const { data: memberRole } = useMemberRole(config);
  const { data: leaderRole } = useLeaderRole(config);
  // const { data: adminRole } = useDefaultAdminRole(config);

  // Check specific roles
  const { data: hasMemberRole } = useHasRole(config, memberRole as `0x${string}`, userAddress);
  const { data: hasLeaderRole } = useHasRole(config, leaderRole as `0x${string}`, userAddress);
  // const { data: hasAdminRole } = useHasRole(config, adminRole as `0x${string}`, userAddress);

  return {
    isMember,
    isLeader,
    hasMemberRole,
    hasLeaderRole,
    // hasAdminRole,
    isLoading: memberQuery.isLoading || leaderQuery.isLoading,
    error: memberQuery.error || leaderQuery.error,
  };
}

/**
 * Combined hook to get complete task information
 */
export function useTaskComplete(config: HookConfig, taskId: bigint) {
  const { data: task, ...taskQuery } = useTasks(config, taskId);
  const { data: taskDetails, ...detailsQuery } = useGetTaskDetails(config, taskId);
  const { data: reservedFunds, ...fundsQuery } = useTaskReservedFunds(config, taskId);

  return {
    task,
    taskDetails,
    reservedFunds,
    isLoading: taskQuery.isLoading || detailsQuery.isLoading || fundsQuery.isLoading,
    error: taskQuery.error || detailsQuery.error || fundsQuery.error,
  };
}

/**
 * Hook to get user's claimable rewards with current balance
 */
export function useUserRewards(config: HookConfig, userAddress: Address) {
  const { data: claimableRewards, ...claimableQuery } = useClaimableRewards(config, userAddress);
  const { data: totalClaimable, ...totalQuery } = useGetClaimableReward(config);

  return {
    claimableRewards,
    totalClaimable,
    isLoading: claimableQuery.isLoading || totalQuery.isLoading,
    error: claimableQuery.error || totalQuery.error,
  };
}

/**
 * Hook to get community overview information
 */
export function useCommunityOverview(config: HookConfig) {
  const { data: name, ...nameQuery } = useCommunityName(config);
  const { data: description, ...descQuery } = useCommunityDescription(config);
  const { data: image, ...imageQuery } = useCommunityImage(config);
  const { data: balance, ...balanceQuery } = useCommunityBalance(config);
  const { data: admins, ...adminsQuery } = useGetAdmins(config);
  const { data: tasks, ...tasksQuery } = useGetAllTasks(config);
  const { data: isPaused, ...pausedQuery } = usePaused(config);

  const isLoading = [nameQuery, descQuery, imageQuery, balanceQuery, adminsQuery, tasksQuery, pausedQuery].some(
    query => query.isLoading,
  );

  const error = [nameQuery, descQuery, imageQuery, balanceQuery, adminsQuery, tasksQuery, pausedQuery].find(
    query => query.error,
  )?.error;

  return {
    name,
    description,
    image,
    balance,
    admins,
    tasks,
    isPaused,
    isLoading,
    error,
  };
}
