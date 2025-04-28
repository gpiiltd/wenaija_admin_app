import React, { useEffect, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { resetViewSubmittedTask } from '../../features/reports/communityTaskManagement/communityTaskSlice'
import { triggerViewSubmittedTask } from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../state'
import GoBack from '../GoBack'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

const ReviewedResponse = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isRateResponseModalOpen, setIsRateResponseModalOpen] = useState(false)
  const { viewSubmittedTask, reviewSubmittedTask } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )
  const navigate = useNavigate()

  const { userId } = useParams<{ userId: string }>()

  useEffect(() => {
    if (userId) {
      dispatch(triggerViewSubmittedTask(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (viewSubmittedTask.statusCode === 200 || viewSubmittedTask.data) {
      console.log(
        'ST seen',
        JSON.stringify(viewSubmittedTask.data.results, null, 2)
      )
    }
    if (viewSubmittedTask.error && viewSubmittedTask.message) {
      console.log('Error fetching ST', viewSubmittedTask.message)
    }
    dispatch(resetViewSubmittedTask())
  }, [
    viewSubmittedTask.statusCode,
    viewSubmittedTask.message,
    viewSubmittedTask.data,
    viewSubmittedTask.error,
  ])

  return (
    <div className="w-full mb-20">
      {/* Top section */}
      <div className="mb-6">
        <GoBack label="Reviewed Responses" />
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          Reports &gt; Community Task &gt; Responses &gt;{' '}
          <span className="text-[#007A61]">Review</span>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg p-6 border border-[#717D96]">
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-lg font-semibold text-gray-800"
        >
          {`COMMUNITY TASK (#${viewSubmittedTask.data.results?.task_id?.slice(0, 4)}...${viewSubmittedTask.data.results?.task_id?.slice(-4)})`}
        </Typography>

        <div className="flex justify-between items-center mt-4">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 text-green-700 font-bold text-2xl flex items-center justify-center rounded-full">
              {/* {"Ekene Dulle"}.charAt(0).toUpperCase() */}
              E.A
            </div>
            <div className="flex flex-col">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-lg font-semibold"
              >
                {viewSubmittedTask.data.results?.name || 'N/A'}
              </Typography>
              {viewSubmittedTask.data.user?.is_active === true ? (
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-['#7A0019] text-sm flex items-center gap-1"
                >
                  Inactive <Icon type="editIconGreen" className="pr-2" />
                </Typography>
              ) : (
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-green-700 text-sm flex items-center gap-1"
                >
                  Active <Icon type="editIconGreen" className="pr-2" />
                </Typography>
              )}
            </div>
          </div>

          <div className="h-16 w-0.5 bg-[#717D96]"></div>

          {/* Category */}
          <div className="flex flex-col items-left">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-500 text-sm mb-1 font-semibold"
            >
              CATEGORY
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium"
            >
              {viewSubmittedTask.data.results?.indicator?.category_name}
            </Typography>
          </div>

          <div className="h-16 w-0.5 bg-[#717D96]"></div>

          {/* Indicator */}
          <div className="flex flex-col items-left justify-center">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-500 text-sm mb-1 font-semibold"
            >
              INDICATOR
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="bg-[#ffc5d1] text-[#7A0019] px-4 py-1 rounded-full text-sm font-medium"
            >
              {viewSubmittedTask.data.results?.indicator?.name}
            </Typography>
          </div>
        </div>
      </div>

      {/* The bottom Part */}
      <div className="mt-4 ml-32 mr-32 m-auto relative  bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div className="flex flex-wrap items-center justify-between text-gray-700 text-sm mr-36 ">
          {/* Date Submitted */}
          <div className="flex flex-col">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-500 font-normal mb-2"
            >
              Date Submitted
            </Typography>
            <span className="text-lg font-semibold">
              {' '}
              {new Date(
                viewSubmittedTask.data.results?.date_submitted
              ).toLocaleString()}
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 border-r border-gray-300"></div>

          {/* Date Reviewed */}
          <div className="flex flex-col text-red-500">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-500 font-normal mb-2"
            >
              Date Reviewed
            </Typography>
            <span className="text-lg text-[#FF725E] font-normal">
              {new Date(
                viewSubmittedTask.data.results?.date_viewed
              ).toLocaleString()}{' '}
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 border-r border-gray-300"></div>

          {/* Allocated Points */}
          <div className="flex flex-col items-center gap-2 text-orange-500">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-500 font-medium"
            >
              Allocated Points
            </Typography>
            <span className=" text-[#ED7D31] font-medium flex flex-row justify-center items-center">
              <Icon type="star" className="pr-2" />{' '}
              {`${viewSubmittedTask.data.results?.max_point} star points`}
            </span>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="my-8  border-t border-gray-200"></div>
        {/* Task Header */}
        <div className="flex justify-between items-center mb-4">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-[#7A0019] font-semibold text-lg"
          >
            Task{' '}
            <span className="text-[#7A0019] border-2 border-[#7A0019] py-1 px-2 rounded-full font-normal text-sm">
              1
            </span>
          </Typography>
          <span className="text-sm text-[#ED7D31] font-medium flex flex-row justify-center items-center">
            <Icon type="star" className="pr-2" />{' '}
            {`${viewSubmittedTask.data.results?.max_point} star points`}
          </span>
        </div>

        {/* Question */}
        <Typography
          variant={TypographyVariant.NORMAL}
          className="font-semibold text-gray-800 text-lg"
        >
          What do you understand by mental health?
        </Typography>
        <p className="text-sm text-gray-500 mt-1 flex flex-row items-center">
          <FiAlertCircle className="mr-1 text-[#007A61]" /> Allowed a maximum of
          250 characters
        </p>

        {/* Divider */}
        <div className="flex flex-row items-center justify-center mb-7 mt-7">
          <div className="border-b basis-1/3"></div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-[#007A61] font-medium text-center basis-1/3"
          >
            Response
          </Typography>
          <div className="border-b basis-1/3"></div>
        </div>

        {/* Response Section */}

        <div className="mt-2 h-fit overflow-y-auto p-3 border border-gray-300 rounded-lg">
          <p className="text-gray-700 text-md text-center">
            {viewSubmittedTask.data.results?.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewedResponse
