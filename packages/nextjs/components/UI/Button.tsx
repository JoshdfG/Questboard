"use client";

import type React from "react";
import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "success" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 flex items-center justify-center";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl focus:ring-orange-200 active:scale-95",
    secondary:
      "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl focus:ring-teal-200 active:scale-95",
    outline:
      "border-2 border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-600 bg-white hover:bg-orange-50 focus:ring-orange-200",
    success:
      "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl focus:ring-green-200 active:scale-95",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-red-200 active:scale-95",
  };

  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-6 py-4 text-lg",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
