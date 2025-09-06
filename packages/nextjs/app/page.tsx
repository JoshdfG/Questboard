"use client";

import Link from "next/link";
import BalanceCard from "../components/BalanceCard/BalanceCard";
import QuickActionCard from "../components/QuickActionCard/QuickActionCard";
import Card from "../components/UI/Card";
import { createBaseAccountSDK } from "@base-org/account";
import { SignInWithBaseButton } from "@base-org/account-ui/react";
import { Award, CheckSquare, Coins, Loader2, Plus, TrendingUp, Users, Wallet } from "lucide-react";
import { useAccount, useConnect, useEnsName } from "wagmi";

export default function HomePage() {
  // const [ setIsSignedIn] = useState(false);
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { data: name } = useEnsName({ address, chainId: 84532 });
  // const { data: avatar } = useEnsAvatar({ name, chainId: 84532 });

  const quickActions = [
    {
      title: "Discover Communities",
      description: "Find and join ENS-named creator communities",
      icon: Users,
      link: "/communities",
      color: "from-pink-400 to-orange-400",
    },
    {
      title: "Create Community",
      description: "Launch your ENS community with shared purse",
      icon: Plus,
      link: "/create-community",
      color: "from-teal-400 to-blue-400",
    },
    {
      title: "Complete Tasks",
      description: "Submit work and earn from community purses",
      icon: CheckSquare,
      link: "/tasks",
      color: "from-green-400 to-teal-400",
    },
    {
      title: "QuestBoard NFT",
      description: "Manage your community membership passes",
      icon: Award,
      link: "/nft-pass",
      color: "from-yellow-400 to-orange-400",
    },
  ];

  const sdk = createBaseAccountSDK({
    appName: "Base Account Quick-start",
  });

  const handleSignIn = async () => {
    try {
      await sdk.getProvider().request({ method: "wallet_connect" });
      // setIsSignedIn(true);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  const recentActivity = [
    { type: "task_completed", amount: "$25.00", community: "accracreators.eth", time: "2 hours ago" },
    { type: "nft_minted", community: "lagosartists.eth", action: "QuestBoard minted", time: "1 day ago" },
    { type: "reward_earned", amount: "$30.00", task: "Sustainable farming documentation", time: "2 days ago" },
  ];

  return !isConnected ? (
    <>
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-orange-600" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Connect Your Wallet</h3>

          <p className="text-gray-600 text-center mb-6">
            Connect your wallet to access QuestBoard features and start supporting creators in the African community.
          </p>

          <div className="space-y-3">
            {connectors
              .filter(connector => connector.id !== "injected" || (typeof window !== "undefined" && window.ethereum))
              .map(connector => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  disabled={isConnecting || isPending}
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isConnecting || isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect with {connector.name}
                    </>
                  )}
                </button>
              ))}
            <SignInWithBaseButton onClick={handleSignIn} align="center" variant="solid" colorScheme="light" />
          </div>

          {connectors.length === 0 && (
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200 mt-4">
              <p className="text-yellow-800 text-sm">
                No wallet detected. Please install a Web3 wallet like MetaMask to continue.
              </p>
            </div>
          )}
        </div>

        {/* Cultural Accent */}
        <div className="flex justify-center mt-8">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full opacity-60"></div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Hello, Friend! 👋</h1>
            <Link href="/profile">
              <div className="flex items-center gap-2">
                {/* {avatar && <img src={avatar} className="h-8 w-8 rounded-full" alt="Profile" />} */}
                <div className="flex flex-col leading-none">
                  {name && <span className="font-semibold">{name}</span>}
                  <span className="text-gray-500 text-sm">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <p className="text-gray-600">Ready to empower the community today?</p>
        </div>

        {/* Balance Card */}
        <BalanceCard />

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-orange-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                link={action.link}
                color={action.color}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "task_completed"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "nft_minted"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-teal-100 text-teal-600"
                    }`}
                  >
                    {activity.type === "task_completed" ? (
                      <CheckSquare size={16} />
                    ) : activity.type === "nft_minted" ? (
                      <Award size={16} />
                    ) : (
                      <Coins size={16} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {activity.type === "task_completed"
                        ? `Task completed in ${activity.community}`
                        : activity.type === "nft_minted"
                          ? `Joined ${activity.community}`
                          : `Reward from ${activity.task}`}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    activity.type === "task_completed" || activity.type === "reward_earned"
                      ? "text-green-600"
                      : "text-gray-800"
                  }`}
                >
                  {activity.amount || "NFT"}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Cultural Accent */}
        <div className="flex justify-center mt-8">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full opacity-60"></div>
        </div>
        <h3 className="text-center">Built on base</h3>
      </div>
    </>
  );
}
