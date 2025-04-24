import React from 'react'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { StatCardProps } from '../types'

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-200">
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-bold">{title}</h3>
        <Icon type={icon} className="w-fit" />
      </div>
      <p className="text-2xl font-semibold mt-8">{value.toLocaleString()}</p>
    </div>
  </div>
)

export default StatCard
