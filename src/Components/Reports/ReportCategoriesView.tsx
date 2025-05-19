import React, { useEffect, useState } from 'react'
import { FiArrowUpRight, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { triggerGetCommunityTasksMetrics } from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../state'
import Card from '../Card'
import GoBack from '../GoBack'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import CreateCommunityTaskCategory from './SurveyIndicator/AddCommunityTaskCategory'
import CreateCommunityTaskIndicator from './SurveyIndicator/AddCommunityTaskIndicator'

const ReportCategoryView = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const handleAddTask = () => {
    navigate('/app/reports/add-task')
  }

  const handleNavigateAllCategories = () => {
    navigate('/app/reports/categories')
  }

  const handleNavigateIndicators = () => {
    navigate('/app/reports/indicators')
  }

  const handleNavigateTask = () => {
    navigate('/app/reports/task-poser')
  }

  const dispatch: AppDispatch = useDispatch()
  const { resData, pendingTasks } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )

  useEffect(() => {
    if (location.state?.taskName) {
      console.log('Setting toast with:', location.state.taskName)
      setTaskName(location.state.taskName)
      setTimeout(() => {
        console.log('Hiding toast')
      }, 3000)
    }
  }, [location.state])

  useEffect(() => {
    dispatch(triggerGetCommunityTasksMetrics({}))
  }, [dispatch])

  return (
    <div className="">
      <div className="flex items-center justify-start gap-6 mb-4">
        <GoBack label={'Community task'} />
      </div>
      <div className="text-sm text-gray-500 mb-8">
        Reports &gt; <span className="text-[#007A61]">Community task </span>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button
          className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50"
          onClick={() => setIsCategoryModalOpen(true)}
        >
          <FiPlus />
          Create category
        </button>
        <button
          className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50"
          onClick={() => setIsIndicatorModalOpen(true)}
        >
          <FiPlus />
          Add indicator
        </button>
        <button
          className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
          onClick={handleAddTask}
        >
          <FiPlus />
          Add task
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1 */}
        <Card titleLeft={undefined} titleRight={undefined} className="p-4 ">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray"
              >
                PENDING ITEMS
              </Typography>
              <Icon
                type="reportsStickRed"
                className="outline-blue-500 fill-current"
              />
            </div>

            <section className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-l_gray font-semibold"
                  >
                    Pending
                  </Typography>
                </div>
                <div className="flex items-center justify-between space-x-6">
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    {resData?.results?.responses?.pending ? (
                      resData?.results?.responses?.pending
                    ) : (
                      <span className="sr-only">Loading...</span>
                    )}{' '}
                  </Typography>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/app/reports/view-pending-task')}
                  >
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-primary_green font-semibold"
                    >
                      View
                    </Typography>
                    <FiArrowUpRight color="#007A61" />
                  </div>
                </div>
              </div>

              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <div className="flex items-center gap-2">
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-l_gray font-semibold"
                  >
                    Reviewed
                  </Typography>
                </div>
                <div className="flex items-center justify-between space-x-6">
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    {resData?.results?.responses?.reviewed
                      ? resData?.results?.responses?.reviewed
                      : 0}
                  </Typography>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/app/reports/view-pending-task')}
                  >
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-primary_green font-semibold"
                    >
                      View
                    </Typography>
                    <FiArrowUpRight color="#007A61" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Card>
        {/* Card 2 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateAllCategories}
        >
          <div className="flex flex-col gap-y-10 cursor-pointer">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Categories
              </Typography>
              <Icon type="task" className="outline-blue-500 fill-current" />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {resData?.results?.categories ? (
                  resData?.results?.categories
                ) : (
                  <span className="sr-only">Loading...</span>
                )}
              </Typography>
            </section>
          </div>
        </Card>
        {/* Card 3 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateIndicators}
        >
          <div className="flex flex-col gap-y-10 cursor-pointer">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Indicators
              </Typography>
              <Icon
                type="taskSquare"
                className="outline-blue-500 fill-current"
              />
            </section>
            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {resData?.results?.indicators ? (
                  resData?.results?.indicators
                ) : (
                  <span className="sr-only">Loading...</span>
                )}{' '}
              </Typography>
            </section>
          </div>
        </Card>
        {/* Card 4 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateTask}
        >
          <div className="flex flex-col gap-y-10 cursor-pointer">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Posers/Tasks
              </Typography>
              <Icon type="messageText" className="text-green fill-current" />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-[#2D3648] font-semibold"
              >
                {typeof resData?.results?.tasks === 'number'
                  ? `${resData.results.tasks} `
                  : 'Loading...'}
              </Typography>
            </section>
          </div>
        </Card>
      </section>

      {/* below section  */}
      <div className="mb-6 mt-12">
        <h1 className="text-2xl font-bold mb-2">Pending community task</h1>
        <p className="text-gray-600">
          Kindly review and score reponses from users
        </p>
      </div>
      <div className="space-y-4">
        {/* <PendingTasks /> */}
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
        className="flex items-center mx-auto mt-5 mb-10 gap-2 px-[10rem] py-4 border border-[#000000] rounded-lg hover:bg-gray-50"
        onClick={() => navigate('/app/reports/view-pending-task')}
      >
        View all
      </button>
      <CreateCommunityTaskCategory
        isOpen={isCategoryModalOpen}
        setIsOpen={setIsCategoryModalOpen}
      />

      <CreateCommunityTaskIndicator
        isOpen={isIndicatorModalOpen}
        setIsOpen={setIsIndicatorModalOpen}
      />
    </div>
  )
}

export default ReportCategoryView
