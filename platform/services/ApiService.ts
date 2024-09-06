import { env } from '@/env.mjs'
import { PublicKey } from '@solana/web3.js'
import { getCookie } from 'cookies-next'

const token = getCookie('authToken')

const baseURL = env.NEXT_PUBLIC_BASE_URL

export const loginUser = async (data: { email: string; password: string }) => {
  const formData = new URLSearchParams()
  formData.append('username', data.email)
  formData.append('password', data.password)

  try {
    const response = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    })
    return response
  } catch (e) {
    console.error('loginUser error', e)
  }
}

export const registerUser = async (data: {
  username: string
  password: string
}) => {
  const formData = new URLSearchParams()
  formData.append('username', data.username)
  formData.append('password', data.password)

  const response = await fetch(`${baseURL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData
  })
  return await response.json()
}

export const setOtpChoice = async (otpIdentifier: string) => {
  const response = await fetch(`${baseURL}/profile/otp/set/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ otp_type: 'Email', otp_identifier: otpIdentifier })
  })
  return await response.json()
}

export const getOtp = async (otpIdentifier: string) => {
  const response = await fetch(`${baseURL}/auth/otp/${otpIdentifier}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export const sendPasswordResetRequest = async () => {
  try {
    const response = await fetch(`${baseURL}/auth/password-reset/request`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    console.error('Error sending password reset request:', error)
  }
}

export const verifyOtpAndUpdatePassword = async (
  otpCode: string,
  newPassword: string
) => {
  try {
    const response = await fetch(
      `${baseURL}/auth/password-reset/verify?otp_code=${otpCode}&new_password=${newPassword}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return await response.json()
  } catch (error) {
    console.error('Error verifying OTP and updating password:', error)
  }
}

export const createOffer = async (data: { listing_id: string, seller_username: string, amount: number }) => {
  try {
    console.log(data);
    const response = await fetch(`${baseURL}/offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    return response;
  }
  catch (err) {
    throw err;
  }
}

export const getMyOffers = async (pastOffers: boolean) => {
  try {
    const response = await fetch(
      `${baseURL}/offer/my?pastOffers=${pastOffers}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.json()
  } catch (error) {
    console.error('Error getting my offers:', error)
  }
}

export const getJobs = async (wallet:string) => {
  try {
    const response = await fetch(
      `${baseURL}/jox/${wallet}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.json()
  } catch (error) {
    console.error('Error getting my offers:', error)
  }
}
export const getMyJobs = async (wallet:string) => {
  try {
    const response = await fetch(
      `${baseURL}/jox/my/${wallet}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.json()
  } catch (error) {
    console.error('Error getting my offers:', error)
  }
}
export const createJob = async (data: { contract_address:string, cid:string, name:string, description: string, owner:string }) => {
  const response = await fetch(`${baseURL}/jox/save`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ contract_address: data.contract_address, cid: data.cid, name: data.name, description: data.description, owner:data.owner }),
  });
  return response.status;
}

export const createListing = async (data: { amount: number, payment_method: string, value: number, currency: string, iban: string, wallet: string }) => {
  const response = await fetch(`${baseURL}/listing`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ amount: data.amount, currency: data.currency, payment_method: data.payment_method, value: data.value, iban: data.iban, seller_wallet: data.wallet }),
  });
  return response.status;
}

export const getListings = async () => {
  try {
    const response = await fetch(`${baseURL}/listing`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    console.error('Error getting listings:', error)
  }
}

export const registerWallet = async (pubKey: PublicKey | null) => {
  const response = await fetch(`${baseURL}/auth/register/wallet`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ wallet_address: pubKey })
  })
  return response.json()
}
