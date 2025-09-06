"use client";

import React from "react";
import Card from "../UI/Card";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useWallet } from "~~/contexts/wallet-context";

const BalanceCard: React.FC = () => {
  const { balance } = useWallet();
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Balance</h2>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold mb-1">
          {showBalance ? `$${(Number.parseFloat(balance) * 3200).toFixed(2)}` : "••••••"}
        </p>
        <p className="text-sm opacity-90">{showBalance ? `${balance} ETH` : "••••••••"}</p>
      </div>

      <div className="flex items-center text-sm opacity-90">
        <TrendingUp size={16} className="mr-1" />
        <span>+0% this week</span>
      </div>
    </Card>
  );
};

export default BalanceCard;
