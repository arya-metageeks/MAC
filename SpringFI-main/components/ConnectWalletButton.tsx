"use client";
import React, { ReactNode } from "react";
import GlowingButton from "./GlowingButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const ConnectWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
          // {...(!ready && {
          //   'aria-hidden': true,
          //   'style': {
          //     opacity: 0,
          //     pointerEvents: 'none',
          //     userSelect: 'none',
          //   },
          // })}
          className="font-medium text-sm"
          >
            {(() => {
              if (!connected) {
                return (
                  <GlowingButton>
                    <button onClick={openConnectModal} type="button">
                      Connect Wallet
                    </button>
                  </GlowingButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <GlowingButton>
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  </GlowingButton>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <ButtonWrapper>
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 20, height: 20 }}
                            />
                          )}
                        </div>
                      )}
                      <span className="font-medium">{chain.name}</span>
                    </button>
                  </ButtonWrapper>

                  <GlowingButton isConnectBtn={true}>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                  </GlowingButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
const ButtonWrapper = ({ children , isConnectBtn }: { children: ReactNode, isConnectBtn?:boolean }) => {
  return (
    <div
      className="rounded-lg"
      style={{
        padding: "1px",
        background:
          isConnectBtn ?"linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%)" :"linear-gradient(90deg, #5C34FF 0%, #6251A8 56.75%, #666666 100%)",
      }}
    >
      <div className="bg-black  rounded-lg px-3 py-2">{children}</div>
    </div>
  );
};
export default ConnectWalletButton;
