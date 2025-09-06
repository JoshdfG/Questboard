"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, Home, Plus, User, Users } from "lucide-react";

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/communities", icon: Users, label: "Discover" },
    { path: "/create-community", icon: Plus, label: "Create" },
    { path: "/tasks", icon: CheckSquare, label: "Tasks" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="grid grid-cols-5 py-2">
          {navItems.map(item => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-200 ${
                  isActive ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-orange-500 hover:bg-orange-25"
                }`}
              >
                <Icon size={20} className={`mb-1 ${isActive ? "text-orange-600" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
