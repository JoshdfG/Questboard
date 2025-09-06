"use client";

import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionProvider } from "ethereum-identity-kit";
import { WagmiProvider } from "wagmi";
import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { AppContent } from "~~/components/AppContent";
import LoadingScreen from "~~/components/LoadingScreen";
import { OnboardingWalletProvider } from "~~/contexts/onboarding-wallet-context";
import { WalletProvider } from "~~/contexts/wallet-context";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function AppContext({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <TransactionProvider>
          <Suspense fallback={<LoadingScreen />}>
            <OnboardingWalletProvider>
              <WalletProvider>
                <AppContent>{children}</AppContent>
              </WalletProvider>
            </OnboardingWalletProvider>
          </Suspense>
        </TransactionProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
