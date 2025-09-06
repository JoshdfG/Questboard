import { Address } from "viem";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import COMMUNITY_FACTORY_ABI from "~~/constants/communityFactoryAbi.json";

interface CreateCommunityArgs {
  name: string;
  description: string;
  communityImage: string;
  admins: Address[];
  tokenAddress: Address;
}

/**
 * Hook to read a community address by index
 */
export function useCommunities(index: bigint) {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
    abi: COMMUNITY_FACTORY_ABI,
    functionName: "communities",
    args: [index],
    chainId: 84532,
  });
}

/**
 * Hook to get a community address by community ID
 */
export function useGetCommunity(communityId: bigint) {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
    abi: COMMUNITY_FACTORY_ABI,
    functionName: "getCommunity",
    args: [communityId],
    chainId: 84532,
  });
}

/**
 * Hook to get the total number of communities
 */
export function useGetTotalCommunities() {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
    abi: COMMUNITY_FACTORY_ABI,
    functionName: "getTotalCommunities",
    chainId: 84532,
  });
}

/**
 * Hook to get all community IDs for a user
 */
export function useGetUserCommunities(userAddress: Address) {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
    abi: COMMUNITY_FACTORY_ABI,
    functionName: "getUserCommunities",
    args: [userAddress],
    chainId: 84532,
  });
}

/**
 * Hook to get a specific community ID for a user by index
 */
export function useUserCommunities(userAddress: Address, index: bigint) {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
    abi: COMMUNITY_FACTORY_ABI,
    functionName: "userCommunities",
    args: [userAddress, index],
    chainId: 84532,
  });
}

/**
 * Hook to check if an address is a valid community
 */
export function useIsValidCommunity(communityAddress: Address) {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
    abi: COMMUNITY_FACTORY_ABI,
    functionName: "isValidCommunity",
    args: [communityAddress],
    chainId: 84532,
  });
}

/**
 * Hook to check if an address is a community contract
 */
export function useIsCommunityContract(contractAddress: Address) {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
    abi: COMMUNITY_FACTORY_ABI,
    functionName: "isCommunityContract",
    args: [contractAddress],
    chainId: 84532,
  });
}

// WRITE HOOKS

/**
 * Hook to create a new community
 */
export function useCreateCommunity() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const createCommunity = (args: CreateCommunityArgs) => {
    writeContract({
      address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
      abi: COMMUNITY_FACTORY_ABI,
      functionName: "createCommunity",
      args: [
        args.name,
        args.description,
        args.communityImage,
        args.admins,
        "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      ],
      chainId: 84532,
    });
  };

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    createCommunity,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

/**
 * Combined hook to get community details with address resolution
 */
export function useCommunityWithAddress(communityId: bigint) {
  const { data: communityAddress, ...communityQuery } = useGetCommunity(communityId);
  const { data: isValid, ...validityQuery } = useIsValidCommunity(communityAddress as Address);

  return {
    communityAddress,
    isValid,
    isLoading: communityQuery.isLoading || validityQuery.isLoading,
    error: communityQuery.error || validityQuery.error,
  };
}

/**
 * Hook to get all communities with their addresses
 */
// export function useAllCommunities() {
//   const { data: totalCommunities, ...totalQuery } = useGetTotalCommunities();

//   const communityQueries = Array.from(
//     { length: Number(totalCommunities || 0) },
//     (_, index) => useCommunities( BigInt(index))
//   );

//   const communities = communityQueries.map(query => query.data).filter(Boolean);
//   const isLoading = totalQuery.isLoading || communityQueries.some(query => query.isLoading);
//   const error = totalQuery.error || communityQueries.find(query => query.error)?.error;

//   return {
//     communities,
//     totalCommunities,
//     isLoading,
//     error,
//   };
// }

export function useGetAllCreatedCommunity() {
  return useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_COMMUNITY as Address,
    abi: COMMUNITY_FACTORY_ABI,
    functionName: "getAllCreatedCommunity",
    chainId: 84532,
  });
}
