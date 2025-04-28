import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { resetState } from '../../features/reports/communityTaskManagement/communityTaskSlice'
import { triggerGetCommunityTasksMetrics } from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../state'
import GoBack from '../GoBack'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import PendingTasks from './SurveyIndicator/SurveryComponent/PendingTasks'
import ReviewedTasks from './SurveyIndicator/SurveryComponent/ReviewedTasks'

const ViewAllPendingTasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed'>('pending')
  const dispatch: AppDispatch = useDispatch()
  const { error, message, resData, statusCode } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )

  useEffect(() => {
    dispatch(triggerGetCommunityTasksMetrics({}))
  }, [dispatch])

  useEffect(() => {
    if (statusCode === 200 || resData) {
    }
    if (error && message !== '') {
      toast.error(message)
    }
    dispatch(resetState())
  }, [dispatch, error, message, resData, statusCode])
  return (
    <div className="w-full mx-auto p-6">
      <GoBack label="Responses" />
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-4">
          Reports &gt; Community Task &gt;{' '}
          <span className="text-[#007A61]">Responses</span>
        </div>
      </div>

      <div className="mt-4 flex gap-4 bg-[#F2F4F7] w-[22rem] p-3">
        <div className="basis-1/2 w-full">
          <button
            onClick={() => {
              setActiveTab('pending')
            }}
            className={`text-black px-4 py-2 rounded-lg w-full ${
              activeTab === 'pending' ? 'bg-white shadow-md' : 'bg-[#F2F4F7]'
            }`}
          >
            Pending{' '}
            <span className="bg-[#F2F4F7] rounded-lg text-sm p-1">
              {' '}
              {resData?.results?.responses?.pending ? (
                resData?.results?.responses?.pending
              ) : (
                <span className="sr-only">Loading...</span>
              )}{' '}
            </span>
          </button>
        </div>
        <div className="basis-1/2 w-full">
          <button
            onClick={() => {
              setActiveTab('reviewed')
            }}
            className={`text-black px-4 py-2 rounded-lg w-full ${
              activeTab === 'reviewed' ? 'bg-white shadow-md' : 'bg-[#F2F4F7]'
            }`}
          >
            Reviewed{' '}
            <span className="bg-[#F2F4F7] rounded-lg text-sm p-1">
              {' '}
              {resData?.results?.responses?.reviewed ? (
                resData?.results?.responses?.reviewed
              ) : (
                <span className="sr-only">Loading...</span>
              )}{' '}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'pending' ? (
          <>
            <Typography
              variant={TypographyVariant.TITLE}
              className="font-semibold text-lg flex flex-row items-center"
            >
              Pending community task
            </Typography>

            <Typography
              variant={TypographyVariant.NORMAL}
              className="font-light mb-2 flex flex-row items-center text-[#5E5959]"
            >
              Kindly review and score responses from users
            </Typography>

            <PendingTasks />
          </>
        ) : (
          <div className="text-[#5E5959] font-medium text-base">
            <ReviewedTasks />
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewAllPendingTasks
