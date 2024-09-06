export {}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string
      NEXT_PUBLIC_ALCHEMY_ID: string
    }
  }
  interface Window {
    phantom: any // Replace 'any' with the actual type if possible
  }
}
