import React, { useEffect, useState } from 'react'
import { LuUsers } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { triggerGetReportGraph } from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../state'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

type SubmissionDataItem = {
  count: number
  date: string // e.g., "2024-05"
  display: string // e.g., "May 2024"
}

type ChartData = {
  name: string // Month label
  communityTask: number
  survey: number
}

const CustomBarChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([])

  const { reportGraph } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(triggerGetReportGraph({}))
  }, [dispatch])

  useEffect(() => {
    if (reportGraph.data) {
      console.log('RG', JSON.stringify(reportGraph.data, null, 2))
      const taskSubmissions =
        reportGraph.data.results?.task_submissions?.data || []
      const surveySubmissions =
        reportGraph.data.results?.survey_submissions?.data || []
      console.log('surveysubmissions')
      const surveyMap = new Map<string, number>(
        surveySubmissions.map((item: any) => [item.date, item.count])
      )

      const merged: ChartData[] = taskSubmissions
        ?.slice(0, 12)
        .map((task: SubmissionDataItem) => ({
          name: task.display.split(' ')[0],
          communityTask: task.count,
          survey: surveyMap.get(task.date) ?? 0,
        }))

      setChartData(merged)
    }
  }, [reportGraph.data])

  return (
    <div
      style={{
        width: '100%',
        height: 400,
        padding: 20,
        background: '#fff',
        borderRadius: 10,
      }}
    >
      {/* Title */}
      <div>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="flex flex-row items-center"
        >
          <LuUsers className="mr-2" />
          Report
        </Typography>
        <hr className="w-20 h-[2px] bg-black border-none" />
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <div></div>
        <div className="mr-10" style={{ display: 'flex', gap: 15 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span
              style={{
                width: 12,
                height: 12,
                background: '#164734',
                borderRadius: 3,
              }}
            />
            Community task
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span
              style={{
                width: 12,
                height: 12,
                background: '#B3F3E5',
                borderRadius: 3,
              }}
            />
            Survey
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full">
        <h6
          className="absolute lr-[2rem] text-l_gray text-[11px] font-semibold leading-[22px] text-d_gray font-title pt-24"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          Counts
        </h6>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="communityTask" stackId="a" fill="#164734" />
            <Bar dataKey="survey" stackId="a" fill="#B3F3E5" />
          </BarChart>
        </ResponsiveContainer>

        <h6 className="flex justify-center mt-4 text-l_gray text-[11px] font-semibold leading-[22px] text-d_gray font-title">
          Months
        </h6>
      </div>
    </div>
  )
}

export default CustomBarChart
