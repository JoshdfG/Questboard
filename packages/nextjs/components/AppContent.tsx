// Client component to handle conditional navigation rendering
"use client";

import LoadingScreen from "./LoadingScreen";
import Navigation from "./Navigation/Navigation";
import { useAccount } from "wagmi";
import { useOnboardingWallet } from "~~/contexts/onboarding-wallet-context";

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

// Client component to handle conditional navigation rendering

export function AppContent({ children }: any) {
  const { isConnected } = useAccount();
  const { isLoading, hasCompletedOnboarding }: any = useOnboardingWallet();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {children}
      {/* Only show navigation if onboarding is complete */}
      {hasCompletedOnboarding && isConnected && <Navigation />}
    </>
  );
}
