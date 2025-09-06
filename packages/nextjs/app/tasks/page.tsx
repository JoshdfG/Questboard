"use client";

import { useState } from "react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { Coins, Plus, Upload, X } from "lucide-react";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<"available" | "submitted" | "create">("available");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [submissionText, setSubmissionText] = useState("");

  const availableTasks = [
    {
      id: 1,
      title: "Cocoa Harvest Documentation",
      description: "Submit proof of your latest cocoa harvest with photos and weight records",
      reward: "0.025 ETH",
      rewardUSD: "$25.00",
      community: "accracreators.eth",
      deadline: "3 days left",
      submissions: 12,
      maxSubmissions: 50,
      status: "available",
    },
    {
      id: 2,
      title: "Digital Art Creation",
      description: "Create and submit an original digital artwork celebrating African culture",
      reward: "0.02 ETH",
      rewardUSD: "$20.00",
      community: "lagosartists.eth",
      deadline: "1 week left",
      submissions: 8,
      maxSubmissions: 25,
      status: "available",
    },
  ];

  const submittedTasks = [
    {
      id: 4,
      title: "Sustainable Farming Practice",
      description: "Document implementation of sustainable farming practices",
      reward: "0.03 ETH",
      rewardUSD: "$30.00",
      community: "accracreators.eth",
      submittedAt: "2 days ago",
      status: "pending_approval",
      submission: "Implemented drip irrigation system and organic composting. Photos uploaded to IPFS.",
    },
  ];

  const handleSubmitTask = (taskId: number) => {
    if (!submissionText.trim()) return;

    console.log("Submitting task:", taskId, "with:", submissionText);
    setSelectedTask(null);
    setSubmissionText("");
  };

  const TaskCard = ({ task, showSubmitButton = false }: { task: any; showSubmitButton?: boolean }) => (
    <Card className="p-4 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
          <p className="text-sm text-orange-600 font-medium mb-2">{task.community}</p>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{task.description}</p>

          {task.status === "available" && (
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
              <span>
                {task.submissions}/{task.maxSubmissions} submissions
              </span>
              <span>{task.deadline}</span>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-green-600">{task.rewardUSD}</p>
          <p className="text-xs text-gray-500">{task.reward}</p>
        </div>
      </div>

      {showSubmitButton && task.status === "available" && (
        <Button variant="primary" size="small" onClick={() => setSelectedTask(task)} className="w-full">
          <Upload size={16} className="mr-2" />
          Submit Task
        </Button>
      )}
    </Card>
  );

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Task Management</h1>
        <p className="text-gray-600">Complete tasks and earn rewards from community purses</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab("available")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "available" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Available ({availableTasks.length})
        </button>
        <button
          onClick={() => setActiveTab("submitted")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "submitted" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          My Tasks ({submittedTasks.length})
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "create" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Create
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "available" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Available Tasks</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Coins size={16} className="mr-1 text-yellow-500" />
              <span>Total rewards: $45</span>
            </div>
          </div>

          {availableTasks.map(task => (
            <TaskCard key={task.id} task={task} showSubmitButton={true} />
          ))}
        </div>
      )}

      {activeTab === "submitted" && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Submitted Tasks</h2>
          {submittedTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {activeTab === "create" && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Task</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <Input type="text" label="Task Title" placeholder="e.g., Cocoa Harvest Documentation" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe what creators need to do to complete this task..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  rows={3}
                />
              </div>

              <Button variant="primary" className="w-full">
                <Plus size={16} className="mr-2" />
                Create Task & Deposit Reward
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Task Submission Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Submit Task</h3>
              <button onClick={() => setSelectedTask(null)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-1">{selectedTask.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{selectedTask.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Submission Details</label>
                <textarea
                  value={submissionText}
                  onChange={e => setSubmissionText(e.target.value)}
                  placeholder="Describe your work, provide links to photos/videos..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setSelectedTask(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleSubmitTask(selectedTask.id)}
                  disabled={!submissionText.trim()}
                >
                  Submit
                </Button>
              </div>
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
