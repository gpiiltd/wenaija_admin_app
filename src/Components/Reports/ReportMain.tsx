import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { LuUsers } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import {
  triggerGetPendingTasks,
  triggerGetReportGraph,
} from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../state'
import Card from '../Card'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

type SubmissionDataItem = {
  count: number
  date: string
  display: string
}

type ChartData = {
  name: string
  communityTask: number
  survey: number
}
const ReportMain = () => {
  const navigate = useNavigate()
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [totalReports, setTotalReports] = useState<number>(0)
  const { pendingTasks, reportGraph } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )
  const dispatch: AppDispatch = useDispatch()

  const handleNavigateViewAllPendingTasks = () => {
    navigate('/app/reports/view-pending-task')
  }

  const handleCardClick = () => {
    navigate('/app/reports/community-task')
  }

  const handleCardClickSurvey = () => {
    navigate('/app/reports/institutional-survey')
  }

  //pemding tasks
  useEffect(() => {
    dispatch(triggerGetPendingTasks({}))
  }, [dispatch])
  useEffect(() => {
    if (pendingTasks.statusCode === 200 || pendingTasks.data) {
      console.log(
        'PT',
        JSON.stringify(pendingTasks.data.results?.results, null, 2)
      )
    }
    if (pendingTasks.error && pendingTasks.message !== '') {
      console.log('Error fetching ALL PT')
    }
  }, [
    dispatch,
    pendingTasks.data,
    pendingTasks.error,
    pendingTasks.message,
    pendingTasks.statusCode,
  ])
  //Report graph
  useEffect(() => {
    dispatch(triggerGetReportGraph({}))
  }, [dispatch])

  useEffect(() => {
    if (reportGraph.data) {
      const taskSubmissions =
        reportGraph.data.results?.task_submissions?.data || []
      const surveySubmissions =
        reportGraph.data.results?.survey_submissions?.data || []

      const taskTotal = reportGraph.data.results?.task_submissions?.total || 0
      const surveyTotal =
        reportGraph.data.results?.survey_submissions?.total || 0
      setTotalReports(taskTotal + surveyTotal)

      const surveyMap = new Map<string, number>(
        surveySubmissions.map((item: any) => [item.date, item.count])
      )

      const merged: ChartData[] = taskSubmissions
        ?.slice(-12)
        .map((task: SubmissionDataItem) => ({
          name: task.display.split(' ')[0],
          communityTask: task.count,
          survey: surveyMap.get(task.date) ?? 0,
        }))

      setChartData(merged)
    }
  }, [reportGraph.data])

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Reports</h1>
        <p className="text-gray-600">Manage reports</p>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button
          className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50"
          onClick={handleCardClick}
        >
          <FiPlus />
          Create community task
        </button>
        <button
          className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
          onClick={handleCardClickSurvey}
        >
          <FiPlus className="text-white" />
          Create institution survey
        </button>
      </div>

      <div className="w-full h-[28rem] flex flex-row space-x-4">
        <div className="basis-1/3  h-full">
          <div className="flex flex-col h-full gap-y-2">
            <Card
              titleLeft={undefined}
              titleRight={undefined}
              className="p-3 flex-1"
            >
              <div className="flex flex-col gap-5">
                <section className="flex items-center">
                  <Icon
                    type="sticky_note"
                    className="outline-blue-500 fill-current mr-2"
                  />
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-l_gray w-2/3"
                  >
                    Total Reports Submitted
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    {totalReports}
                  </Typography>
                </section>
              </div>
            </Card>
            <Card
              titleLeft={undefined}
              titleRight={undefined}
              className="p-3 flex-1"
              onClick={handleCardClickSurvey}
            >
              <div className="flex flex-col gap-5">
                <section className="flex items-center">
                  <Icon
                    type="sticky_notePurple"
                    className=" text-purple-600 fill-current mr-2"
                  />
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-l_gray w-2/3"
                  >
                    Institution Survey
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    {reportGraph.data.results?.survey_submissions?.total}
                  </Typography>
                </section>
              </div>
            </Card>
            <Card
              titleLeft={undefined}
              titleRight={undefined}
              className="p-3 flex-1"
              onClick={handleCardClick}
            >
              <div className="flex flex-col gap-5">
                <section className="flex items-center">
                  <Icon
                    type="sticky_noteRedish"
                    className="outline-blue-500 fill-current mr-2"
                  />
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-l_gray w-2/3"
                  >
                    Community Task responses
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    {reportGraph.data.results?.task_submissions?.total}
                  </Typography>
                </section>
              </div>
            </Card>
          </div>
        </div>
        <div className="basis-2/3  bg-white border-2 border-[#EEEEEEEE] rounded shadow-sm mb-0">
          {/* <CustomBarChart /> */}
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
        </div>
      </div>
      <div className="mb-4 mt-10">
        <h1 className="text-2xl font-bold mb-2">Pending community task</h1>
        <p className="text-gray-600">
          Kindly review and score reponses from users
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <div className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
            {pendingTasks.loading ? (
              <div className="flex justify-center items-center h-full">
                <ClipLoader color="#D0D5DD" />
              </div>
            ) : pendingTasks.error ? (
              <div className="text-center mt-10 text-red-600">
                <h4 className="text-lg font-semibold">
                  Error: {pendingTasks.message}
                </h4>
              </div>
            ) : Array.isArray(pendingTasks?.data?.results?.results) &&
              pendingTasks.data.results.results.length > 0 ? (
              <div className="flex flex-col gap-4">
                {pendingTasks.data.results.results.map((submission: any) => (
                  <div
                    key={submission.identifier}
                    className="flex justify-between items-center gap-6 border-b pb-4"
                  >
                    {/* Name & Email */}
                    <div className="flex flex-col  max-w-[250px] flex-grow">
                      <Typography
                        variant={TypographyVariant.NORMAL}
                        className="font-semibold text-lg"
                      >
                        {submission.agent_name}
                      </Typography>
                      <span className="text-gray-500 font-light">
                        {submission.agent_email}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col min-w-[150px] max-w-[200px] flex-grow">
                      <span className="text-sm text-[#717D96] font-medium">
                        Category
                      </span>
                      <span
                        className="text-gray-700 font-light truncate"
                        title={submission.indicator?.category_name}
                      >
                        {submission.indicator?.category_name ?? 'N/A'}
                      </span>
                    </div>

                    {/* Indicator */}
                    <div className="flex flex-col min-w-[150px] max-w-[200px] flex-grow">
                      <span className="text-sm text-[#717D96] font-medium">
                        Indicator
                      </span>
                      <span
                        className="text-gray-700 font-light truncate"
                        title={submission.indicator?.name}
                      >
                        {submission.indicator?.name ?? 'N/A'}
                      </span>
                    </div>

                    {/* Date Submitted */}
                    <div className="flex flex-col min-w-[150px] max-w-[200px] flex-grow">
                      <span className="text-sm text-[#717D96] font-medium">
                        Date submitted
                      </span>
                      <span className="text-[#FF725E] font-light">
                        {new Date(submission.created_at).toLocaleString()}
                      </span>
                    </div>

                    {/* Review Button */}
                    <div className="min-w-[130px] flex justify-end">
                      <button
                        className="flex items-center gap-2 px-6 py-3 bg-[#007A61] text-white rounded-lg"
                        onClick={() =>
                          navigate(
                            `/app/reports/view-pending-response/${submission.identifier}`
                          )
                        }
                      >
                        Review
                        <span>
                          <Icon type="searchZoom" className="w-6 h-6" />
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center mt-10 text-gray-600">
                <h4 className="text-lg font-semibold">
                  No pending tasks available.
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleNavigateViewAllPendingTasks}
        className="flex items-center mx-auto mt-5 mb-10 gap-2 px-[10rem] py-4 border border-[#000000] rounded-lg hover:bg-gray-50 "
      >
        View all
      </button>
    </div>
  )
}

export default ReportMain
