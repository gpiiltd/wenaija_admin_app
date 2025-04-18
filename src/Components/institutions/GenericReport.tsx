import React, { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import { GenericImages } from './GenericImages'
import GenericReview from './GenericReview'

const GenericReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('images')
  const [searchTerm, setSearchTerm] = useState<string>('')
  return (
    <div className="">
      <div className="mx-auto  ">
        <div className="flex items-center justify-start gap-6 mb-8">
          <Link to="/app/instutitions">
            <Icon type="arrowBack" className="w-10 h-10" />
          </Link>
          <Typography
            variant={TypographyVariant.TITLE}
            className="font-semibold"
          >
            Generic reports
          </Typography>{' '}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Icon type="quotient" className="w-fit h-10" />
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-xl  font-semibold"
          >
            Quotient Specialist Hospital (QSH)
          </Typography>{' '}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex    rounded-xl bg-gray-100">
            <button
              className={`py-3 px-3  m-2 ${
                activeTab === 'images'
                  ? 'bg-white   text-black  rounded-xl'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('images')}
            >
              Uploaded images
              <span className="text-sm text-gray-600 ml-4 bg-gray-200 rounded-full px-3 py-1">
                45
              </span>
            </button>
            <button
              className={`py-3 px-3  m-2 ${
                activeTab === 'reports'
                  ? 'bg-white   text-black  rounded-xl'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
              <span className="text-sm text-gray-600 ml-4 bg-gray-200 rounded-full px-3 py-1">
                12
              </span>
            </button>
          </div>

          <div className="flex items-center border rounded-lg px-2 py-3 w-[30%]">
            <HiOutlineSearch className="text-gray-400 w-6 h-6 ml-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none ml-2"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {activeTab === 'images' && <GenericImages />}
        {activeTab === 'reports' && <GenericReview />}
      </div>
    </div>
  )
}

export default GenericReport
