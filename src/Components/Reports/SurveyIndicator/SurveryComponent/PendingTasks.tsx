import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Icon from '../../../../Assets/svgImages/Svg_icons_and_images'
import { triggerGetPendingTasks } from '../../../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../../../state'
import { TypographyVariant } from '../../../types'
import Typography from '../../../Typography'

const PendingTasks = () => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate('/app/reports/community-task')
  }
  const dispatch: AppDispatch = useDispatch()
  const { pendingTasks } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )
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
      toast.error(pendingTasks.message)
      console.log('Error fetching ALL PT')
    }
  }, [
    dispatch,
    pendingTasks.data,
    pendingTasks.error,
    pendingTasks.message,
    pendingTasks.statusCode,
  ])

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {pendingTasks.loading ? (
        <div className="flex justify-center items-center h-full">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-600"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
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
          {pendingTasks.data.results.results.map(
            (submission: any, index: number) => (
              <div
                key={submission.identifier}
                className="flex justify-between items-center gap-6 border-b pb-4"
              >
                {/* Name & Email */}
                <div className="flex flex-col min-w-[200px]">
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
                <div className="flex flex-col min-w-[150px] items-start">
                  <span className="text-sm text-[#717D96] font-medium">
                    Category
                  </span>
                  <span className="text-gray-700 font-light">
                    {submission.indicator?.category_name ?? 'N/A'}
                  </span>
                </div>

                {/* Indicator */}
                <div className="flex flex-col min-w-[150px] items-start">
                  <span className="text-sm text-[#717D96] font-medium">
                    Indicator
                  </span>
                  <span className="text-gray-700 font-light">
                    {submission.indicator?.name ?? 'N/A'}
                  </span>
                </div>

                {/* Date Submitted */}
                <div className="flex flex-col min-w-[150px] items-start">
                  <span className="text-sm text-[#717D96] font-medium">
                    Date submitted
                  </span>
                  <span className="text-[#FF725E] font-light">
                    {new Date(submission.created_at).toLocaleString()}
                  </span>
                </div>

                {/* Review Button */}
                <div>
                  <button
                    className="flex items-center gap-2 px-6 py-3 bg-[#007A61] text-white rounded-lg"
                    // onClick={onClick ?? handleCardClick}
                  >
                    Review
                    <span>
                      <Icon type="searchZoom" className="w-6 h-6" />
                    </span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-600">
          <h4 className="text-lg font-semibold">No pending tasks available.</h4>
        </div>
      )}
    </div>
  )
}

export default PendingTasks
