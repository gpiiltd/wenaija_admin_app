import React, { useEffect, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import Icon from '../../../../Assets/svgImages/Svg_icons_and_images'
import {
  resetReviewSubmittedTask,
  resetViewSubmittedTask,
} from '../../../../features/reports/communityTaskManagement/communityTaskSlice'
import {
  triggerReviewSubmittedTask,
  triggerViewSubmittedTask,
} from '../../../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../../../state'
import Button from '../../../Button'
import showCustomToast from '../../../CustomToast'
import GoBack from '../../../GoBack'
import CustomModal from '../../../Modal'
import { TypographyVariant } from '../../../types'
import Typography from '../../../Typography'

const PendingResponse = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [isRateResponseModalOpen, setIsRateResponseModalOpen] = useState(false)
  const { userId } = useParams<{ userId: string }>()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const { viewSubmittedTask, reviewSubmittedTask } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )
  const interpolateColor = (start: string, end: string, factor: number) => {
    const hexToRgb = (hex: string) =>
      hex.match(/\w\w/g)!.map(x => parseInt(x, 16))
    const rgbToHex = (r: number, g: number, b: number) =>
      '#' +
      [r, g, b]
        .map(x => {
          const hex = x.toString(16)
          return hex.length === 1 ? '0' + hex : hex
        })
        .join('')

    const [r1, g1, b1] = hexToRgb(start)
    const [r2, g2, b2] = hexToRgb(end)

    const r = Math.round(r1 + factor * (r2 - r1))
    const g = Math.round(g1 + factor * (g2 - g1))
    const b = Math.round(b1 + factor * (b2 - b1))
    return rgbToHex(r, g, b)
  }
  const startColor = '#FF0000'
  const endColor = '#007A61'
  const progressColor = interpolateColor(startColor, endColor, rating / 100)

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

  const reviewResponse = () => {
    if (!viewSubmittedTask.data.results?.identifier) {
      return
    }
    const payload = {
      id: viewSubmittedTask.data.results?.identifier,
      percentage: rating,
      feedback: feedback,
    }
    dispatch(triggerReviewSubmittedTask(payload))
  }
  useEffect(() => {
    if (reviewSubmittedTask.data && reviewSubmittedTask.statusCode === 201) {
      showCustomToast(
        reviewSubmittedTask.message,
        `${viewSubmittedTask.data.results?.max_point} star points allocated`
      )
      setTimeout(() => {
        setIsRateResponseModalOpen(false)
        navigate(-1)
      }, 3000)
    }
    if (reviewSubmittedTask.error && reviewSubmittedTask.message) {
      toast.error(reviewSubmittedTask.message)
      setTimeout(() => {
        setIsRateResponseModalOpen(false)
      }, 2000)
    }
    dispatch(resetReviewSubmittedTask())
  }, [reviewSubmittedTask.data, reviewSubmittedTask.error])
  return (
    <div className="w-full mb-20">
      <GoBack label={'Pending Response'} />
      <ToastContainer />
      {/* Top section */}
      <div className="mb-6">
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
              N/A
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
        {/* Floating Button */}
        <div className="mt-7">
          <Button
            text="Rate response "
            active={true}
            bg_color="#007A61"
            text_color="white"
            loading={false}
            onClick={() => setIsRateResponseModalOpen(true)}
          />
        </div>
      </div>
      <CustomModal
        width="100"
        height="fit"
        isOpen={isRateResponseModalOpen}
        onClose={() => setIsRateResponseModalOpen(false)}
      >
        <div className="flex flex-col justify-center px-12 pb-8 pt-4 relative">
          <form className="flex flex-col gap-4">
            {/* Slider */}
            <div className="mb-4 relative">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="flex items-center justify-center font-semibold text-lg"
              >
                Rate response
              </Typography>

              <Typography
                variant={TypographyVariant.NORMAL}
                className="flex items-center justify-center font-light text-sm text-[#5E5959]"
              >
                Kindly rate this reviewed response
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="block font-semibold text-black my-7"
              >
                How will you rate this response?
              </Typography>

              <div className="relative w-full">
                {/* Slider Track */}
                <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                  <div
                    className="absolute top-0 left-0 h-2 rounded-lg transition-all"
                    style={{
                      width: `${rating}%`,
                      backgroundColor: progressColor,
                    }}
                  ></div>
                </div>

                {/* Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rating}
                  onChange={e => setRating(Number(e.target.value))}
                  className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                />

                {/* Tooltip Display */}
                <div
                  className="absolute top-[-30px] left-0 px-2 py-1 text-sm font-semibold rounded-md shadow-md transition-all"
                  style={{
                    left: `calc(${rating}% - 20px)`,
                    backgroundColor: '#FFFFFF', // Tooltip background
                    color: '#5E5959', // Tooltip text
                  }}
                >
                  {rating}%
                </div>
              </div>
            </div>

            {/* Feedback Box */}
            <div className="mb-4">
              <label className="block font-semibold text-[#5E5959] mb-2">
                Reason for your score
              </label>
              <textarea
                className="w-full p-3 border rounded-lg resize-none"
                rows={3}
                placeholder="Write here..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-2">
              <div className="w-36">
                <Button
                  text="Cancel"
                  active={true}
                  bg_color="#FFFFFF"
                  border_color="#D0D5DD"
                  text_color="#344054"
                  loading={false}
                  onClick={() => setIsRateResponseModalOpen(false)}
                />
              </div>
              <div className="w-36">
                <Button
                  text="Submit"
                  active={true}
                  bg_color="#007A61"
                  text_color="white"
                  loading={reviewSubmittedTask.loading}
                  onClick={reviewResponse}
                />
              </div>
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  )
}

export default PendingResponse
