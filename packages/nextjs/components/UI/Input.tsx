"use client";

import type React from "react";
import type { ReactNode } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyPress,
  icon,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
            transition-all duration-200
            ${icon ? "pl-10" : ""}
            ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
            placeholder-gray-400 text-gray-800
          `}
        />
      </div>
    </div>
  );
};

export default Input;
