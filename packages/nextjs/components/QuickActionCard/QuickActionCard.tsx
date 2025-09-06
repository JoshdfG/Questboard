"use client";

import type React from "react";
import Link from "next/link";
import Card from "../UI/Card";
import type { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon: Icon, link, color }) => {
  return (
    <Link href={link}>
      <Card className="p-4 h-full hover:shadow-lg transition-all duration-200 group">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
        >
          <Icon size={20} className="text-white" />
        </div>
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
      </Card>
    </Link>
  );
};

export default QuickActionCard;
