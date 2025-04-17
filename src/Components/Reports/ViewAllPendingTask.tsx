import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import { submissions } from './communityTaskReport'
import SubmissionCard from './SubmissionCard'

const ViewAllPendingTasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed'>('pending')

  // Filter submissions based on selected tab
  const filteredSubmissions = submissions.filter(
    submission => submission.status === activeTab
  )

  const navigate = useNavigate()

  const handleNavigateViewPendingResponse = () => {
    navigate('/app/reports/view-pending-response')
  }

  const handleNavigateViewReviewedResponse = () => {
    navigate('/app/reports/view-reviewed-response')
  }

  return (
    <div className="w-full mx-auto p-6">
      <div className="mb-6">
        <Typography
          variant={TypographyVariant.TITLE}
          className="font-bold mb-2 flex flex-row items-center"
        >
          <Link to="/app/reports">
            <FiArrowLeft className="mr-3" />
          </Link>{' '}
          Responses
        </Typography>
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          Reports &gt; Community Task &gt;{' '}
          <span className="text-[#007A61]">Responses</span>
        </div>
      </div>

      <div className={'mt-4 flex gap-4 bg-[#F2F4F7] w-[22rem] p-3'}>
        <div className="basis-1/2 w-ful">
          <button
            onClick={() => {
              setActiveTab('pending')
            }}
            className={` text-black px-4 py-2 rounded-lg w-full basis-1/2 w-ful ${
              activeTab === 'pending' ? 'bg-white shadow-md' : 'bg-[#F2F4F7]'
            }`}
          >
            Pending{' '}
            <span className="bg-[#F2F4F7] rounded-lg text-sm p-1">45</span>
          </button>
        </div>
        <div className="basis-1/2 w-full">
          <button
            onClick={() => {
              setActiveTab('reviewed')
            }}
            className={` text-black px-4 py-2 rounded-lg w-full basis-1/2 w-ful ${
              activeTab === 'reviewed' ? 'bg-white shadow-md' : 'bg-[#F2F4F7]'
            }`}
          >
            Reviewed{' '}
            <span className="bg-[#F2F4F7] rounded-lg text-sm p-1">100</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
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
      </div>

      <div className="mt-4 space-y-4">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map(submission => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onClick={
                activeTab === 'pending'
                  ? handleNavigateViewPendingResponse
                  : handleNavigateViewReviewedResponse
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No submissions found.</p>
        )}
      </div>
    </div>
  )
}

export default ViewAllPendingTasks
