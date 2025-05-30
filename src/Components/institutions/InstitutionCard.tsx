import React from 'react'
import {
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { InstitutionProps } from '../types'

const InstitutionCard: React.FC<InstitutionProps> = ({
  name,
  address,
  operation_days,
  mobile_number,
  email,
  icon,
  opening_time,
  closing_time,
}) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate('/app/instutitions/view-institute', {
      state: {
        name,
        address,
        mobile_number,
        email,
        icon,
        operation_days,
        opening_time,
        closing_time,
      },
    })
  }

  return (
    <div
      className="bg-white rounded-lg p-6 border mb-4 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <Icon type="quotient" className="w-fit" />
        <h4 className="text-lg font-semibold">{name}</h4>
      </div>

      <div className="grid grid-cols-1 lg:hidden">
        <div className="flex items-center gap-2 text-gray-600">
          <HiOutlineLocationMarker className="text-[#007A61]" />
          <span>{address}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <HiOutlinePhone className="text-[#007A61] mt-1" />
          <span>{mobile_number}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <HiOutlineClock className="text-[#007A61]" />
          <span>{operation_days}</span>
          <span>{`(${opening_time} - ${closing_time})`}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <HiOutlineMail className="text-[#007A61] mt-1" />
          <span>{email}</span>
        </div>
      </div>

      {/* large screen display */}

      <div className="lg:flex hidden">
        <div className="w-1/2">
          <div className="flex items-center gap-2 text-gray-600">
            <HiOutlineLocationMarker className="text-[#007A61]" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <HiOutlineClock className="text-[#007A61] mt-1" />
            <span>{operation_days}</span>
            <span>{`(${opening_time} - ${closing_time})`}</span>
          </div>
        </div>

        <div className="mx-10 lg:mx-20">
          <div className="hidden md:block md:col-span-1 md:border-l md:border-gray-300 md:h-full md:mx-4"></div>
        </div>

        <div className="w-1/2">
          <div className="flex items-center gap-2 text-gray-600">
            <HiOutlinePhone className="text-[#007A61]" />
            <span>{mobile_number}</span>
          </div>{' '}
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <HiOutlineMail className="text-[#007A61]" />
            <span>{email}</span>
          </div>{' '}
        </div>
      </div>
    </div>
  )
}

export default InstitutionCard
