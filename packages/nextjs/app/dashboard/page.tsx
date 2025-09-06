"use client";

import { useState } from "react";
import Card from "../../components/UI/Card";
import { Award, Calendar, Heart, TrendingUp, Users } from "lucide-react";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    { label: "Tips Received", value: "$127.50", change: "+12%", icon: Heart, color: "pink" },
    { label: "Tips Sent", value: "$45.20", change: "+8%", icon: TrendingUp, color: "green" },
    { label: "Family Transfers", value: "$320.00", change: "+5%", icon: Users, color: "blue" },
    { label: "Community Rank", value: "#156", change: "↑12", icon: Award, color: "yellow" },
  ];

  const recentTransactions = [
    {
      type: "tip_received",
      from: "supporter.eth",
      amount: "$5.00",
      message: "Love your latest artwork! 🎨",
      timestamp: "2 hours ago",
    },
    {
      type: "tip_sent",
      to: "amafarmer.eth",
      amount: "$2.50",
      message: "Great harvest update!",
      timestamp: "1 day ago",
    },
  ];

  const StatsCard = ({ label, value, change, icon: Icon, color }: any) => (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon size={20} className={`text-${color}-500`} />
        <span className="text-xs text-green-600 font-medium">{change}</span>
      </div>
      <p className="text-lg font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </Card>
  );

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Dashboard</h1>
        <p className="text-gray-600">Track your impact and earnings</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        {["7d", "30d", "90d"].map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              timeRange === range ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {range === "7d" ? "Last 7 days" : range === "30d" ? "Last month" : "Last 3 months"}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar size={20} className="mr-2 text-teal-500" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentTransactions.map((tx, index) => (
            <div key={index} className="flex items-start space-x-3 py-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  tx.type === "tip_received" ? "bg-green-100" : "bg-pink-100"
                }`}
              >
                {tx.type === "tip_received" ? (
                  <TrendingUp size={14} className="text-green-600" />
                ) : (
                  <Heart size={14} className="text-pink-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {tx.type === "tip_received" ? `Tip from ${tx.from}` : `Tip to ${tx.to}`}
                </p>
                <p className="text-xs text-gray-600">{tx.message}</p>
                <p className="text-xs text-gray-500 mt-1">{tx.timestamp}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-800">{tx.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex justify-center mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full opacity-60"></div>
      </div>
      <h3 className="text-center">Built on base</h3>
    </div>
  );
}
