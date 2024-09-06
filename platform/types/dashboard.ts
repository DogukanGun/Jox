import { PublicKey } from "@solana/web3.js"

export interface Listing {
  id: string
  user_id: string
  seller_username: string
  seller_wallet:string
  payment_method:string
  iban:string
  amount: number
  price: number
  currency: string
  is_deleted: boolean
  is_active: boolean
}

export interface Job {
  contract_address: string
  my:boolean
  name: string
  description: string
  cid:string
}

export interface Application {
  wallet: PublicKey
  cid:string
}


export interface Offer {
  id: string,
  user_id: string
  status: string
  listing_id: string
  seller_username: string
  buyer_username: string
  amount: number
  total_price: number
  coming_from: string
  updates: any[]
  is_deleted: boolean
  is_active: boolean
  is_approved: boolean
}
