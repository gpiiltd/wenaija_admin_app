import axios from 'axios'
import { OTPService } from './auth/authService'

const URL = process.env.REACT_APP_BACKEND_URL

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = OTPService._getRefreshToken()
  console.log('refresh token', refreshToken)
  if (!refreshToken) throw new Error('No refresh token available')
  try {
    const response = await axios.post(
      `${URL}/api/v1/admin/request/refresh-token`,
      {
        refresh_token: refreshToken,
      }
    )
    const newAccessToken = response.data?.data?.access_token
    const newRefreshToken = response.data?.data?.refresh_token
    if (newAccessToken) {
      OTPService._saveToken(newAccessToken)
    }
    if (newRefreshToken) {
      OTPService._saveRefreshToken(newRefreshToken)
    }

    return newAccessToken
  } catch (err) {
    console.error('Refresh token failed:', err)
    throw err
  }
}
