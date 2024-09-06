// import { getDefaultConfig } from 'connectkit'
// import { configureChains, createConfig } from 'wagmi'
// import { goerli, mainnet } from 'wagmi/chains'
// import { publicProvider } from 'wagmi/providers/public'

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, ...(process.env.NODE_ENV === 'development' ? [goerli] : [])],
//   [publicProvider()]
// )

// export const config = createConfig(
//   getDefaultConfig({
//     // Required API Keys
//     alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID, // or infuraId
//     walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

//     // Required
//     appName: 'NexBridge',

//     // Optional
//     appDescription: 'NexGen Bridge',
//     appUrl: 'https://www.nexarb.com', // your app's url
//     appIcon: 'https://www.nexarb.com./img/nexbridge.png' // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   })
// )
