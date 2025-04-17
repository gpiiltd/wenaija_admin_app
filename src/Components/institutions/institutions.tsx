import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import routeNames from '../../Navigation/RouteNames'
import CustomModal from '../Modal'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import InstitutionCard from './InstitutionCard'
import { recentInstitutions, stats } from './institutionData'
import StatCard from './StatsCard'
import Stepper from './Stepper'
const Institutions = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="mb-6">
        <Typography variant={TypographyVariant.TITLE} className="font-semibold">
          Institution
        </Typography>{' '}
        <Typography
          variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
          className="text-dark_gray"
        >
          Manage medical facilities
        </Typography>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50">
          <Icon type="upload" className="w-6 h-6" />
          Bulk Upload
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
        >
          <Icon type="plus" className="w-6 h-6" />
          Add institution
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="cursor-pointer"
          onClick={() => navigate(routeNames.allInstitutions)}
        >
          <StatCard
            title="Total listed Institution"
            value={1234}
            icon="total"
          />
        </div>
        {stats.map((stat: any, index: any) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mb-6">
        <Typography
          variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
          className="font-semibold text-lg mb-4"
        >
          Recently added institution
        </Typography>{' '}
        {recentInstitutions.map((institution, index) => (
          <InstitutionCard key={index} {...institution} />
        ))}
      </div>
      <div className="mt-32">
        <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Stepper onClose={() => setShowModal(false)} />
        </CustomModal>
      </div>
    </div>
  )
}

export default Institutions
