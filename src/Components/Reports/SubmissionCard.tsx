import React from 'react'
import { useNavigate } from 'react-router'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

interface Submission {
  id: number
  name: string
  email: string
  category: string
  indicator: string
  dateSubmitted: string
}

const SubmissionCard: React.FC<{
  submission: Submission
  onClick?: () => void
}> = ({ submission, onClick }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate('/app/reports/community-task')
  }

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center">
      {/* Name & Email */}
      <div className="flex flex-col min-w-[200px]">
        <Typography
          variant={TypographyVariant.NORMAL}
          className="font-semibold text-lg"
        >
          {submission.name}
        </Typography>
        <span className="text-gray-500 font-light">{submission.email}</span>
      </div>

      {/* Separator */}
      <div className="h-12 w-[1px] bg-gray-300"></div>

      {/* Category */}
      <div className="flex flex-col text-center min-w-[150px] items-start">
        <span className="text-sm text-[#717D96] font-medium">Category</span>
        <span className="text-gray-700 font-light">{submission.category}</span>
      </div>

      {/* Separator */}
      <div className="h-12 w-[1px] bg-gray-300"></div>

      {/* Indicator */}
      <div className="flex flex-col text-center min-w-[150px] items-start">
        <span className="text-sm text-[#717D96] font-medium">Indicator</span>
        <span className="text-gray-700 font-light">{submission.indicator}</span>
      </div>

      {/* Separator */}
      <div className="h-12 w-[1px] bg-gray-300"></div>

      {/* Date Submitted */}
      <div className="flex flex-col text-center min-w-[150px] items-start">
        <span className="text-sm text-[#717D96] font-medium">
          Date submitted
        </span>
        <span className="text-[#FF725E] font-light">
          {submission.dateSubmitted}
        </span>
      </div>

      {/* Separator */}
      <div className="h-12 w-[1px] bg-gray-300"></div>

      {/* Review Button */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-[#007A61] text-white rounded-lg"
          onClick={onClick ?? handleCardClick}
        >
          Review
          <span>
            <Icon type="searchZoom" className="w-6 h-6" />
          </span>
        </button>
      </div>
    </div>
  )
}

export default SubmissionCard
