"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const OnboardingWalletContext = createContext({});

export const useOnboardingWallet = () => {
  const context = useContext(OnboardingWalletContext);
  if (!context) {
    throw new Error("useOnboardingWallet must be used within an OnboardingWalletProvider");
  }
  return context;
};

export const OnboardingWalletProvider = ({ children }: any) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state from localStorage on mount
  useEffect(() => {
    const initializeState = () => {
      try {
        const onboardingComplete = localStorage.getItem("QuestBoard_onboarding_complete");
        setHasCompletedOnboarding(!!onboardingComplete);
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeState();
  }, []);

  // Handle routing logic after state is initialized
  useEffect(() => {
    if (isLoading) return;

    // If onboarding is not complete and not on onboarding page, redirect
    if (!hasCompletedOnboarding && pathname !== "/onboarding") {
      router.push("/onboarding");
      return;
    }

    // If onboarding is complete but on onboarding page, redirect to home
    if (hasCompletedOnboarding && pathname === "/onboarding") {
      router.push("/");
      return;
    }
  }, [hasCompletedOnboarding, isLoading, pathname, router]);

  const handleOnboardingComplete = () => {
    try {
      setHasCompletedOnboarding(true);
      localStorage.setItem("QuestBoard_onboarding_complete", "true");
      router.push("/");
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  const handleWalletDisconnect = () => {
    try {
      setIsWalletConnected(false);
      localStorage.removeItem("QuestBoard_wallet_connected");
    } catch (error) {
      console.error("Error removing wallet connection status:", error);
    }
  };

  const resetOnboarding = () => {
    try {
      setHasCompletedOnboarding(false);
      setIsWalletConnected(false);
      localStorage.removeItem("QuestBoard_onboarding_complete");
      localStorage.removeItem("QuestBoard_wallet_connected");
      router.push("/onboarding");
    } catch (error) {
      console.error("Error resetting onboarding state:", error);
    }
  };

  const shouldShowOnboarding = !hasCompletedOnboarding;
  const isFullySetup = hasCompletedOnboarding && isWalletConnected;

  const value = {
    hasCompletedOnboarding,
    isWalletConnected,
    isLoading,
    shouldShowOnboarding,
    isFullySetup,
    handleOnboardingComplete,
    handleWalletDisconnect,
    resetOnboarding,
  };

  return <OnboardingWalletContext.Provider value={value}>{children}</OnboardingWalletContext.Provider>;
};

export default OnboardingWalletProvider;
