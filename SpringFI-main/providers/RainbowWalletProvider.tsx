"use client"
import React, { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  Chain
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  // polygonMumbai
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
const polygonMumbai = {
  id: 80001,
  name: 'Mumbai Testnet',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  iconBackground: '#ffffff00',
  nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://polygon-testnet.public.blastapi.io'] },
  },
  blockExplorers: {
    default: { name: 'MumbaiScan', url: 'https://mumbai.polygonscan.com' },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain;
export const config = getDefaultConfig({
  appName: 'PurpleSale',
  projectId: 'c081cba5403b9fd597db9c7da7bc3edd',
  chains: [mainnet, polygon, optimism, arbitrum, sepolia,polygonMumbai],
  ssr: true, // If your dApp uses server side rendering (SSR)

});
const queryClient = new QueryClient();

const RainbowWalletProvider = ({children}:{children:ReactNode}) => {
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  )
}

export default RainbowWalletProvider