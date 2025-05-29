import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { CiCalendar } from 'react-icons/ci'

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import {
  triggerGetDashboardGraphData,
  triggerGetDashboardUsersGraphData,
} from '../features/dashboard/dashboardThunk'
import { AppDispatch, RootState } from '../state'
import { TypographyVariant } from './types'
import Typography from './Typography'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

interface Tab {
  key: string
  label: string
  icon: React.ReactNode
}

interface FloatingBarChartProps {
  tabs: Tab[]
  onUsersTabClick?: () => void
}

const FloatingBarChart: React.FC<FloatingBarChartProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '')
  const dispatch: AppDispatch = useDispatch()
  const { dashboardGraphData, dashboardUsersGraphData } = useSelector(
    (state: RootState) => state.dashboard
  )

  const [reportsData, setReportsData] = useState<number[]>([])
  const [labels, setLabels] = useState<string[]>([])

  useEffect(() => {
    dispatch(triggerGetDashboardGraphData({}))
  }, [dispatch])

  useEffect(() => {
    if (!dashboardGraphData.error && dashboardGraphData.statusCode === 200) {
      const reports = dashboardGraphData.data?.results?.reports || []
      const counts = reports.map(
        (item: { period: string; count: number }) => item.count
      )
      const monthLabels = reports.map((item: { period: string }) => {
        const [year, month] = item.period.split('-')
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleString(
          'default',
          {
            month: 'short',
          }
        )
      })
      setReportsData(counts)
      setLabels(monthLabels)
    }
  }, [
    dashboardGraphData.data,
    dashboardGraphData.error,
    dashboardGraphData.statusCode,
  ])

  //Users graph
  const getUsersGraph = async () => {
    setActiveTab('users')
    await dispatch(triggerGetDashboardUsersGraphData({ type: 'users' }))
  }

  useEffect(() => {
    if (
      activeTab === 'users' &&
      !dashboardUsersGraphData.error &&
      dashboardUsersGraphData.statusCode === 200
    ) {
      console.log(
        'users graph',
        JSON.stringify(dashboardUsersGraphData.data, null, 2)
      )
      const reports =
        dashboardUsersGraphData.data?.results?.user_registrations || []
      const counts = reports.map(
        (item: { period: string; count: number }) => item.count
      )
      const monthLabels = reports.map((item: { period: string }) => {
        const [year, month] = item.period.split('-')
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleString(
          'default',
          {
            month: 'short',
          }
        )
      })
      setReportsData(counts)
      setLabels(monthLabels)
    }
  }, [activeTab, dashboardUsersGraphData])

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: activeTab === 'users' ? 'Users' : 'Reports',
        data: reportsData,
        borderColor: '#007A61',
        backgroundColor: 'rgba(0, 122, 97, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 0,
      },
    ],
  }
  const maxCount = Math.max(...reportsData, 10)

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { autoSkip: false },
      },
      y: {
        grid: { drawBorder: false },
        beginAtZero: true,
        suggestedMax: maxCount + 5,
        ticks: {
          stepSize: Math.ceil((maxCount + 5) / 5),
        },
      },
    },
  }

  return (
    <div className="w-full h-auto">
      <div className="flex justify-between items-center mb-6">
        <section className="flex gap-6">
          {tabs.map(tab => (
            <div
              key={tab.key}
              className={`flex items-center gap-2 py-2 cursor-pointer ${
                activeTab === tab.key
                  ? 'text-black border-b-2 border-b-black'
                  : 'text-gray border-b-2 border-b-gray'
              }`}
              onClick={() => {
                setActiveTab(tab.key)
                if (tab.key === 'users') {
                  getUsersGraph()
                } else if (tab.key === 'reports') {
                  dispatch(triggerGetDashboardGraphData({}))
                }
              }}
            >
              {tab.icon}
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className={`font-semibold ${activeTab === tab.key ? 'text-black' : 'text-gray'}`}
              >
                {tab.label}
              </Typography>
            </div>
          ))}
        </section>

        <section className="border p-2 rounded cursor-pointer">
          <div className="flex items-center gap-2">
            <CiCalendar />
            <Typography
              variant={TypographyVariant.BODY_SMALL_MEDIUM}
              className="text-l_gray"
            >
              Select dates
            </Typography>
          </div>
        </section>
      </div>
      {dashboardGraphData.loading || dashboardUsersGraphData.loading ? (
        <div className="flex justify-center items-center pt-24">
          {' '}
          <ClipLoader color="#D0D5DD" />
        </div>
      ) : (
        <div className="flex w-full">
          <h6
            className="text-l_gray text-[11px] font-semibold leading-[22px] text-d_gray font-title pt-24"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            Counts
          </h6>
          <div className="flex flex-col items-center w-full">
            <div className="w-full h-[200px] flex-1">
              <Line data={chartData} options={options} />
            </div>

            <Typography
              variant={TypographyVariant.BODY_SMALL_MEDIUM}
              className="text-l_gray text-center pt-3"
            >
              Months
            </Typography>
          </div>
        </div>
      )}
    </div>
  )
}

export default FloatingBarChart
