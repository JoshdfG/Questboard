"use client";

import type React from "react";
import { useState } from "react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import { Award, Camera, Check, Clock, Star } from "lucide-react";
import { useWallet } from "~~/contexts/wallet-context";

export default function NFTPassPage() {
  const { user, updateUser } = useWallet();
  const [activeTab, setActiveTab] = useState<"status" | "verify">("status");
  const [uploadedProof, setUploadedProof] = useState<File | null>(null);

  const verificationTasks = [
    {
      id: 1,
      title: "Profile Verification",
      description: "Complete your ENS profile with role and location",
      status: "completed",
      points: 25,
    },
    {
      id: 2,
      title: "Community Engagement",
      description: "Receive 3 tips from community members",
      status: "in-progress",
      points: 50,
      progress: "2/3",
    },
    {
      id: 3,
      title: "Creator Proof",
      description: "Upload proof of your creative work or farming activity",
      status: "pending",
      points: 75,
    },
  ];

  const totalPoints = verificationTasks
    .filter(task => task.status === "completed")
    .reduce((sum, task) => sum + task.points, 0);

  const requiredPoints = 150;
  const progressPercentage = (totalPoints / requiredPoints) * 100;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedProof(file);
    }
  };

  const handleSubmitVerification = () => {
    if (uploadedProof) {
      updateUser({ hasQuestBoard: true });
      alert("Verification submitted! Your QuestBoard will be minted soon.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">QuestBoard NFT</h1>
        <p className="text-gray-600">Your creator community membership pass</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab("status")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "status" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          My Pass
        </button>
        <button
          onClick={() => setActiveTab("verify")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "verify" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Verification
        </button>
      </div>

      {activeTab === "status" ? (
        /* NFT Pass Status */
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {user?.hasQuestBoard ? "QuestBoard Holder" : "Earning Your QuestBoard"}
              </h3>
              <p className="text-sm text-gray-600">
                {user?.hasQuestBoard
                  ? "Welcome to the creator community!"
                  : `${totalPoints}/${requiredPoints} points earned`}
              </p>
            </div>

            {!user?.hasQuestBoard && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Benefits */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">QuestBoard Benefits</h3>
            <div className="space-y-3">
              {[
                "Receive higher tip amounts from verified supporters",
                "Access to exclusive creator workshops and mentorship",
                "Priority listing in creator discovery",
                "Voting rights in community governance",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Star size={16} className="text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        /* Verification Tasks */
        <div className="space-y-4">
          {verificationTasks.map(task => (
            <Card key={task.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        task.status === "completed"
                          ? "bg-green-100"
                          : task.status === "in-progress"
                            ? "bg-yellow-100"
                            : "bg-gray-100"
                      }`}
                    >
                      {task.status === "completed" ? (
                        <Check size={12} className="text-green-600" />
                      ) : task.status === "in-progress" ? (
                        <Clock size={12} className="text-yellow-600" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  {task.progress && <p className="text-xs text-yellow-600 font-medium">Progress: {task.progress}</p>}
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-orange-600">+{task.points} pts</span>
                </div>
              </div>

              {task.id === 3 && task.status === "pending" && (
                <div className="mt-4 space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,video/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="proof-upload"
                    />
                    <label htmlFor="proof-upload" className="cursor-pointer">
                      <Camera size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {uploadedProof ? uploadedProof.name : "Upload proof of work"}
                      </p>
                    </label>
                  </div>
                  {uploadedProof && (
                    <Button variant="primary" size="small" onClick={handleSubmitVerification} className="w-full">
                      Submit Verification
                    </Button>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full opacity-60"></div>
      </div>
      <h3 className="text-center">Built on base</h3>
    </div>
  );
}
