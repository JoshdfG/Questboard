"use client";

import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import { ProfileCard } from "ethereum-identity-kit";
import "ethereum-identity-kit/css";
import { useAccount, useDisconnect } from "wagmi";

export default function ProfilePage() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your QuestBoard identity</p>
      </div>
      <ProfileCard
        showFollowButton={true}
        addressOrName={address!}
        className="w-full bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 mb-6"
      />
      {/* Profile Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">0</p>
          <p className="text-xs text-gray-600">Total Supporters</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-teal-600">0</p>
          <p className="text-xs text-gray-600">Creators Supported</p>
        </Card>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button variant="danger" onClick={disconnect} className="w-full">
          Disconnect Wallet
        </Button>
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full opacity-60"></div>
      </div>
      <h3 className="text-center">Built on base</h3>
    </div>
  );
}
