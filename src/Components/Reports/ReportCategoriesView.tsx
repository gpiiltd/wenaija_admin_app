import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiArrowUpRight, FiPlus } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import Card from '../Card'
// import Toast from '../Toast'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { resetState } from '../../features/reports/communityTaskManagement/communityTaskSlice'
import { triggerGetCommunityTasksMetrics } from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../state'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import { submissions } from './communityTaskReport'
import SubmissionCard from './SubmissionCard'
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
  const { error, message, resData, statusCode } = useSelector(
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

  useEffect(() => {
    if (statusCode === 200 || resData) {
      console.log('CTMetrics', resData.results)
    }
    if (error && message !== '') {
      toast.error(message)
      console.log('Error fetching ALL INSTITUTIONS')
    }
    dispatch(resetState())
  }, [dispatch, error, message, resData, statusCode])
  return (
    <div className="">
      <ToastContainer />
      <div className="flex items-center justify-start gap-6 mb-4">
        <Link to="/app/reports">
          <FiArrowLeft />
        </Link>
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-2xl font-bold"
        >
          Community task
        </Typography>
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
                  <div className="flex items-center">
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
                  <div className="flex items-center">
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
          <div className="flex flex-col gap-y-10">
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
          <div className="flex flex-col gap-y-10">
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
          <div className="flex flex-col gap-y-10">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Posers/Task
              </Typography>
              <Icon type="messageText" className="text-green fill-current" />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {resData?.results?.tasks ? (
                  resData?.results?.tasks
                ) : (
                  <span className="sr-only">Loading...</span>
                )}{' '}
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
        {submissions.map(submission => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
      <button className="flex items-center mx-auto mt-5 mb-10 gap-2 px-[10rem] py-4 border border-[#000000] rounded-lg hover:bg-gray-50 ">
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
