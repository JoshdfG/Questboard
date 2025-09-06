import { Address } from "viem";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import COMMUNITY_ABI from "~~/constants/CommunityAbi.json";

// Hook uration

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

export function useLeaderRole(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "LEADER_ROLE",
    chainId: 84532,
  });
}

export function useMemberRole(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "MEMBER_ROLE",
    chainId: 84532,
  });
}

export function useQuorumSize(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "QUORUM_SIZE",
    chainId: 84532,
  });
}

// Community Info
export function useCommunityName(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "name",
    chainId: 84532,
  });
}

export function useCommunityDescription(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "description",
    chainId: 84532,
  });
}

export function useCommunityImage(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "communityImage",
    chainId: 84532,
  });
}

export function useCommunityBalance(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "communityBalance",
    chainId: 84532,
  });
}

export function useGetCommunityBalance(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getCommunityBalance",
    chainId: 84532,
  });
}

export function usePaused(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "paused",
    chainId: 84532,
  });
}

// Token Info
export function useToken(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "token",
    chainId: 84532,
  });
}

export function useGetTokenAddress(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getTokenAddress",
    chainId: 84532,
  });
}

// Membership
export function useMembershipNFT(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "membershipNFT",
    chainId: 84532,
  });
}

export function useGetMembershipNFT(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getMembershipNFT",
    chainId: 84532,
  });
}

export function useIsMember(contractAddress: Address, userAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "isMember",
    args: [userAddress],
    chainId: 84532,
  });
}

export function useIsLeader(contractAddress: Address, userAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "isLeader",
    args: [userAddress],
    chainId: 84532,
  });
}

// Admins
export function useGetAdmins(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getAdmins",
    chainId: 84532,
  });
}

export function useAdmins(contractAddress: Address, index: bigint) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "admins",
    args: [index],
    chainId: 84532,
  });
}

// Role Management
export function useHasRole(contractAddress: Address, role: `0x${string}`, account: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "hasRole",
    args: [role, account],
    chainId: 84532,
  });
}

export function useGetRoleAdmin(contractAddress: Address, role: `0x${string}`) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getRoleAdmin",
    args: [role],
    chainId: 84532,
  });
}

// Tasks
export function useGetAllTasks(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getAllTasks",
    chainId: 84532,
  });
}

export function useGetTaskLength(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getTaskLength",
    chainId: 84532,
  });
}

export function useTasks(contractAddress: Address, taskId: bigint) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "tasks",
    args: [taskId],
    chainId: 84532,
  });
}

export function useGetTaskDetails(contractAddress: Address, taskId: bigint) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getTaskDetails",
    args: [taskId],
    chainId: 84532,
  });
}

export function useTaskReservedFunds(contractAddress: Address, taskId: bigint) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "taskReservedFunds",
    args: [taskId],
    chainId: 84532,
  });
}

export function useTaskApprovals(contractAddress: Address, taskId: bigint, approver: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "taskApprovals",
    args: [taskId, approver],
    chainId: 84532,
  });
}

// Rewards
export function useClaimableRewards(contractAddress: Address, userAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "claimableRewards",
    args: [userAddress],
    chainId: 84532,
  });
}

export function useGetClaimableReward(contractAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "getClaimableReward",
    chainId: 84532,
  });
}

// Join Requests
export function useJoinRequests(contractAddress: Address, requestId: bigint) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "joinRequests",
    args: [requestId],
    chainId: 84532,
  });
}

export function useJoinRequestApprovals(contractAddress: Address, requestId: bigint, approver: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "joinRequestApprovals",
    args: [requestId, approver],
    chainId: 84532,
  });
}

export function useMemberJoinRequestId(contractAddress: Address, memberAddress: Address) {
  return useReadContract({
    address: contractAddress,
    abi: COMMUNITY_ABI,
    functionName: "memberJoinRequestId",
    args: [memberAddress],
    chainId: 84532,
  });
}

// Interface Support
export function useSupportsInterface(contractAddress: Address, interfaceId: `0x${string}`) {
  return useReadContract({
    address: contractAddress,
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
export function useAddAdmin(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const addAdmin = (newAdmin: Address) => {
    writeContract({
      address: contractAddress,
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

export function useRemoveAdmin(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const removeAdmin = (admin: Address) => {
    writeContract({
      address: contractAddress,
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
export function useAddLeader(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const addLeader = (newLeader: Address) => {
    writeContract({
      address: contractAddress,
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

export function useRemoveLeader(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const removeLeader = (leader: Address) => {
    writeContract({
      address: contractAddress,
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
export function useGrantRole(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const grantRole = (role: `0x${string}`, account: Address) => {
    writeContract({
      address: contractAddress,
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

export function useRevokeRole(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const revokeRole = (role: `0x${string}`, account: Address) => {
    writeContract({
      address: contractAddress,
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

export function useRenounceRole(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const renounceRole = (role: `0x${string}`, callerConfirmation: Address) => {
    writeContract({
      address: contractAddress,
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
export function useRequestToJoin(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const requestToJoin = () => {
    writeContract({
      address: contractAddress,
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

export function useApproveJoinRequest(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const approveJoinRequest = (requestId: bigint) => {
    writeContract({
      address: contractAddress,
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
export function useCreateTask(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const createTask = (description: string, reward: bigint) => {
    writeContract({
      address: contractAddress,
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

export function useAssignTask(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const assignTask = (taskId: bigint, assignee: Address) => {
    writeContract({
      address: contractAddress,
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

export function useCancelTask(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const cancelTask = (taskId: bigint) => {
    writeContract({
      address: contractAddress,
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

export function useSubmitProof(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const submitProof = (taskId: bigint, proof: string) => {
    writeContract({
      address: contractAddress,
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

export function useApproveTask(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const approveTask = (taskId: bigint) => {
    writeContract({
      address: contractAddress,
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
export function useFundCommunity(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const fundCommunity = (amount: bigint) => {
    writeContract({
      address: contractAddress,
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

export function useClaimReward(contractAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const claimReward = () => {
    writeContract({
      address: contractAddress,
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
export function useUserRoles(contractAddress: Address, userAddress: Address) {
  const { data: isMember, ...memberQuery } = useIsMember(contractAddress, userAddress);
  const { data: isLeader, ...leaderQuery } = useIsLeader(contractAddress, userAddress);

  // Get role constants
  const { data: memberRole } = useMemberRole(contractAddress);
  const { data: leaderRole } = useLeaderRole(contractAddress);
  // const { data: adminRole } = useDefaultAdminRole();

  // Check specific roles
  const { data: hasMemberRole } = useHasRole(contractAddress, memberRole as `0x${string}`, userAddress);
  const { data: hasLeaderRole } = useHasRole(contractAddress, leaderRole as `0x${string}`, userAddress);
  // const { data: hasAdminRole } = useHasRole(adminRole as `0x${string}`, userAddress);

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
export function useTaskComplete(contractAddress: Address, taskId: bigint) {
  const { data: task, ...taskQuery } = useTasks(contractAddress, taskId);
  const { data: taskDetails, ...detailsQuery } = useGetTaskDetails(contractAddress, taskId);
  const { data: reservedFunds, ...fundsQuery } = useTaskReservedFunds(contractAddress, taskId);

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
export function useUserRewards(contractAddress: Address, userAddress: Address) {
  const { data: claimableRewards, ...claimableQuery } = useClaimableRewards(contractAddress, userAddress);
  const { data: totalClaimable, ...totalQuery } = useGetClaimableReward(contractAddress);

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
export function useCommunityOverview(contractAddress: Address) {
  const { data: name, ...nameQuery } = useCommunityName(contractAddress);
  const { data: description, ...descQuery } = useCommunityDescription(contractAddress);
  const { data: image, ...imageQuery } = useCommunityImage(contractAddress);
  const { data: balance, ...balanceQuery } = useCommunityBalance(contractAddress);
  const { data: admins, ...adminsQuery } = useGetAdmins(contractAddress);
  const { data: tasks, ...tasksQuery } = useGetAllTasks(contractAddress);
  const { data: isPaused, ...pausedQuery } = usePaused(contractAddress);

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

// export function useMultipleCommunityOverviews(addresses: Address[]) {
//   const [, setResults] = useState<Array<{
//     address: Address;
//     name?: string;
//     description?: string;
//     image?: string;
//     balance?: any;
//     admins?: any;
//     tasks?: any;
//     isPaused?: boolean;
//     isLoading: boolean;
//     error?: any;
//   }>>([]);

//   useEffect(() => {
//     const initialResults = addresses.map(address => ({
//       address,
//       isLoading: true,
//       error: undefined
//     }));
//     setResults(initialResults);
//   }, [addresses]);

//   // Map over addresses and collect all the data
//   const communityData = addresses.map(address => {
//     const overview = useCommunityOverview(address);
//     return {
//       address,
//       ...overview
//     };
//   });

//   return {
//     data: communityData,
//     isLoading: communityData.some(item => item.isLoading),
//     error: communityData.find(item => item.error)?.error,
//     allLoaded: communityData.every(item => !item.isLoading && !item.error)
//   };
// }
