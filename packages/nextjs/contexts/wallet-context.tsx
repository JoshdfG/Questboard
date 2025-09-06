"use client";

import type React from "react";
import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

interface User {
  ensName: string;
  address: string;
  avatar?: string;
  role?: string;
  location?: string;
  hasQuestBoard?: boolean;
}

interface WalletContextType {
  isConnected: boolean;
  user: User | null;
  balance: string;
  connectWallet: () => void;
  disconnect: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    const walletConnected = localStorage.getItem("QuestBoard_wallet_connected");
    const userData = localStorage.getItem("QuestBoard_user_data");

    if (walletConnected && userData) {
      setIsConnected(true);
      setUser(JSON.parse(userData));
      setBalance("0.125"); // Could also be stored in localStorage
    }
  }, []);

  const connectWallet = () => {
    // Simulate wallet connection
    const newUser = {
      ensName: "kofi.eth",
      address: "0x1234...5678",
      avatar: "/api/placeholder/64/64",
      role: "Community Member",
      location: "Accra, Ghana",
      hasQuestBoard: false,
    };

    setIsConnected(true);
    setUser(newUser);
    setBalance("0.125");

    localStorage.setItem("QuestBoard_wallet_connected", "true");
    localStorage.setItem("QuestBoard_user_data", JSON.stringify(newUser));
  };

  const disconnect = () => {
    setIsConnected(false);
    setUser(null);
    setBalance("0.00");

    localStorage.removeItem("QuestBoard_wallet_connected");
    localStorage.removeItem("QuestBoard_user_data");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("QuestBoard_user_data", JSON.stringify(updatedUser));
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        user,
        balance,
        connectWallet,
        disconnect,
        updateUser,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
