"use client";

import type React from "react";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  const baseClasses = "bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200";
  const interactiveClasses = onClick ? "hover:shadow-md cursor-pointer active:scale-[0.98]" : "";

  return (
    <div onClick={onClick} className={`${baseClasses} ${interactiveClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
