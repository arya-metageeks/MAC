import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/main.css";
import RainbowWalletProvider from "@/providers/RainbowWalletProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardSidebar from "@/components/DashboardSidebar";
import React, { ReactNode } from "react";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import FormProvider from "@/context/FormProvider";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PurpleSale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="text-white bg-[#0D0D0D] overflow-x-hidden">
          <RainbowWalletProvider>
            <div className="flex w-full relative">
              <FormProvider>
                <DashboardSidebar />
                <div className="flex-1">
                  <div className="mt-10 mr-10 flex justify-end relative z-[10]">
                    <ConnectWalletButton />
                  </div>
                  <div className="w-full pb-8">{children}</div>
                </div>
              </FormProvider>
            </div>
          </RainbowWalletProvider>
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
