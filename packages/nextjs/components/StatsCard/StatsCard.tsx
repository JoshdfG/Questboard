import type React from "react";
import Card from "../UI/Card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: "pink" | "green" | "blue" | "yellow";
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, change, icon: Icon, color }) => {
  const colorClasses = {
    pink: "from-pink-400 to-red-400",
    green: "from-green-400 to-teal-400",
    blue: "from-blue-400 to-indigo-400",
    yellow: "from-yellow-400 to-orange-400",
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon size={16} className="text-white" />
        </div>
        <span
          className={`text-xs font-medium ${
            change.startsWith("+") || change.startsWith("↑") ? "text-green-600" : "text-gray-600"
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-lg font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </Card>
  );
};

export default StatsCard;
