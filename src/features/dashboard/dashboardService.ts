import apiRoutes from '../../config'
import { get } from '../../network/https'

export interface DashboardMetrics {
  new_users: number
  new_reports: number
  total_reports_submitted: number
  total_registered_users: number
  total_listed_institutions: number
}

export interface TopContributor {
  id: string
  name: string
  total_sp: number
  rank: number
  badge_level: string
}

export interface TopContributors {
  top_contributors: TopContributor[]
}

export interface RankedInstitute {
  name: string
  location: string
  score: number
}

export interface RecentlyAddedInstitute {
  name: string
  location: string
  lga: string
}

export interface TopRankingInstitutes {
  [key: string]: RankedInstitute[]
}

export interface DashboardResponse {
  status_code: number
  status: string
  message: string
  timeStamp: string
  results: {
    metrics: DashboardMetrics
    top_contributors: TopContributors
    top_ranking_institutes: TopRankingInstitutes
    recently_added_institutes: RecentlyAddedInstitute[]
    institutes_location_distribution: Record<string, number>
  }
}

export class GetDashboardData {
  static async get_dashboard_data(
    data: Record<string, string | number>
  ): Promise<DashboardResponse> {
    const response = await get({
      url: apiRoutes.dashboardData,
      data,
    })
    
    if (response.status === 'error') {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }

    if (response.status === 'success') {
      return response as DashboardResponse
    }

    return Promise.reject({
      message: 'Unknown error occurred',
      status_code: 500,
    })
  }
}
