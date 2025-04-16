import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import Button from '../Button'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

const EditTaskView = () => {
  return (
    <div className="">
      <div className="mb-6">
        <Typography
          variant={TypographyVariant.TITLE}
          className="font-bold mb-2 flex flex-row items-center"
        >
          <Link to="/app/reports/task-poser/view">
            <FiArrowLeft className="mr-3" />
          </Link>{' '}
          Indicators
        </Typography>
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          Reports &gt; Task &gt; <span className="text-[#007A61]">Edit</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-white border border-1 border-[#000000] rounded-md">
        {/* Tags */}
        <div className="flex gap-2 mb-3">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold "
          >
            NCD Prevention
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="px-3 bg-[#ffdee5] text-[#7A0019] py-1 text-sm font-semibold bg-red-100 rounded-full"
          >
            Mental Health Promotion
          </Typography>
        </div>

        {/* Question Title */}
        <label className="block text-gray-700 font-semibold mb-1">
          Question Title
        </label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={3}
          defaultValue="Mental health only refer to only when someone Loses his/her mind and roam the streets. True or false? Argue your reasons in 50 words"
        />

        {/* Question Type */}
        <label className="block text-gray-700 font-semibold mt-4 mb-1">
          Question Type
        </label>
        <select className="w-full p-2 border rounded-md">
          <option>Short text</option>
        </select>

        {/* Options */}
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border-b rounded-md"
            maxLength={50}
            defaultValue=""
            placeholder="Short answer text (Maximum of 50 words)"
          />
        </div>

        {/* Max Points */}
        <div className="flex flex-row items-center justify-end mt-6">
          <div className="flex items-center mr-4">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-700 "
            >
              Select Max point
            </Typography>
            <select className="ml-2 p-2 border rounded-md">
              <option>5.00</option>
            </select>
          </div>
          <div className="flex border-l-2 pl-4">
            <Icon type="deleteIcon" className="pr-2 h-6 w-6" />
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="max-w-2xl mx-auto  mt-4 gap-3 flex justify-start">
        <div className="w-[8rem]">
          <Button
            text="Cancel"
            active={true}
            bg_color="#FFFFFF"
            text_color="black"
            loading={false}
          />
        </div>

        <div className="w-[8rem]">
          <Button
            text="Submit"
            active={true}
            bg_color="#007A61"
            text_color="white"
            loading={false}
          />
        </div>
      </div>
    </div>
  )
}

export default EditTaskView
