import apiRoutes from '../../config'
import { get } from '../../network/https'

export interface LeaderboardUser {
  rank: number
  full_name: string
  total_sp: number
  badge: string
}

export interface Badge {
  id: number
  name: string
  minimum_sp: number
  maximum_sp: number | null
  logo: string
}

export interface LeaderboardResponse {
  status_code: number
  status: string
  message: string
  timestamp: string
  results: {
    count: number
    next: string | null
    previous: string | null
    results: LeaderboardUser[]
    total_enabled_users: number
    total_starpoints: number
    badges: Badge[]
  }
}

export class GetLeaderboardData {
  static async get_leaderboard_data(
    params: Record<string, string | number>
  ): Promise<LeaderboardResponse> {
    const response = await get({
      url: apiRoutes.leaderboardData,
      data: params,
    })

    if (response.status === 'error') {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }

    if (response.status === 'success') {
      return response as LeaderboardResponse
    }

    return Promise.reject({
      message: 'Unknown error occurred',
      status_code: 500,
    })
  }

  static async get_leaderboard_by_url(
    url: string
  ): Promise<LeaderboardResponse> {
    const response = await get({ url }) // Use raw URL directly
    if (response.status === 'error') {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response.status === 'success') {
      return response as LeaderboardResponse
    }

    return Promise.reject({
      message: 'Unknown error occurred',
      status_code: 500,
    })
  }
}
