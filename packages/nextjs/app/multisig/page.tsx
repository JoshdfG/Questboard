"use client";

import { useState } from "react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { Check, Clock, MapPin, Plus, Shield, Users, X } from "lucide-react";

export default function MultiSigPage() {
  const [activeTab, setActiveTab] = useState<"manage" | "pending">("pending");

  const familyMembers = [
    { ensName: "papa.familyfund.eth", role: "Father", location: "Accra, Ghana" },
    { ensName: "mama.familyfund.eth", role: "Mother", location: "Toronto, Canada" },
    { ensName: "kwame.familyfund.eth", role: "Son", location: "London, UK" },
  ];

  const pendingTransactions = [
    {
      id: 1,
      recipient: "mama.familyfund.eth",
      amount: "$500",
      purpose: "Monthly family support",
      approvals: ["papa.familyfund.eth"],
      needsApproval: ["kwame.familyfund.eth"],
      timeLeft: "2 days",
    },
    {
      id: 2,
      recipient: "school.ghana.eth",
      amount: "$200",
      purpose: "School fees for nephew",
      approvals: ["mama.familyfund.eth", "papa.familyfund.eth"],
      needsApproval: [],
      timeLeft: "Ready to execute",
    },
  ];

  const handleApprove = (txId: number) => {
    console.log("Approving transaction:", txId);
  };

  const handleReject = (txId: number) => {
    console.log("Rejecting transaction:", txId);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Family Fund</h1>
        <p className="text-gray-600">Secure multi-signature wallet for family finances</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "pending" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Pending ({pendingTransactions.length})
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "manage" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Manage Fund
        </button>
      </div>

      {activeTab === "pending" ? (
        /* Pending Transactions */
        <div className="space-y-4">
          {pendingTransactions.map(tx => (
            <Card key={tx.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{tx.purpose}</p>
                  <p className="text-sm text-gray-600 mb-1">To: {tx.recipient}</p>
                  <p className="text-lg font-bold text-teal-600">{tx.amount}</p>
                </div>
                <div className="text-right">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.needsApproval.length === 0 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tx.timeLeft}
                  </div>
                </div>
              </div>

              {/* Approval Status */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Approvals ({tx.approvals.length}/2 required)</p>
                <div className="space-y-2">
                  {familyMembers.map(member => (
                    <div key={member.ensName} className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          tx.approvals.includes(member.ensName)
                            ? "bg-green-100"
                            : tx.needsApproval.includes(member.ensName)
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        {tx.approvals.includes(member.ensName) ? (
                          <Check size={10} className="text-green-600" />
                        ) : tx.needsApproval.includes(member.ensName) ? (
                          <Clock size={10} className="text-yellow-600" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{member.ensName.split(".")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {tx.needsApproval.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="success" size="small" onClick={() => handleApprove(tx.id)} className="w-full">
                    <Check size={16} className="mr-1" />
                    Approve
                  </Button>
                  <Button variant="danger" size="small" onClick={() => handleReject(tx.id)} className="w-full">
                    <X size={16} className="mr-1" />
                    Reject
                  </Button>
                </div>
              )}

              {tx.needsApproval.length === 0 && (
                <Button variant="primary" size="small" className="w-full">
                  Execute Transaction
                </Button>
              )}
            </Card>
          ))}
        </div>
      ) : (
        /* Manage Fund */
        <div className="space-y-6">
          {/* Fund Overview */}
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-blue-50">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">familyfund.eth</h3>
              <p className="text-2xl font-bold text-teal-600">$2,450.00</p>
              <p className="text-sm text-gray-600">Total Family Fund Balance</p>
            </div>
          </Card>

          {/* Family Members */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Family Members</h3>
              <Button variant="outline" size="small">
                <Plus size={16} className="mr-1" />
                Add Member
              </Button>
            </div>
            <div className="space-y-3">
              {familyMembers.map((member, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{member.ensName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{member.ensName}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin size={10} className="mr-1" />
                        {member.location}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* New Transaction */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Send Family Fund</h3>
            <div className="space-y-4">
              <Input type="text" placeholder="Recipient ENS or address" icon={<Users size={16} />} />
              <Input type="number" placeholder="Amount (USD)" />
              <Input type="text" placeholder="Purpose (e.g., school fees, medical)" />
              <Button variant="primary" className="w-full">
                Create Transaction
              </Button>
            </div>
          </Card>
        </div>
      )}
      <div className="flex justify-center mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full opacity-60"></div>
      </div>
      <h3 className="text-center">Built on base</h3>
    </div>
  );
}
