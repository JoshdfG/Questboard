import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import AppContext from "~~/contexts/app-context";

export const metadata: Metadata = {
  title: "QuestBoard - Community Empowerment Platform",
  description: "Empowering African communities through blockchain technology and ENS integration",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-orange-100">
        <AppContext>{children}</AppContext>
      </body>
    </html>
  );
}
