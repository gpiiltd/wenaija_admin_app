import React from 'react'
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router'
import { TypographyVariant } from './types'
import Typography from './Typography'

interface HeaderProps {
  label: string
}
const GoBack: React.FC<HeaderProps> = ({ label }) => {
  const navigate = useNavigate()

  return (
    <div className="flex gap-2">
      <button onClick={() => navigate(-1)}>
        <HiOutlineArrowSmallLeft size={24} />
      </button>
      <Typography variant={TypographyVariant.TITLE}>{label}</Typography>
    </div>
  )
}

export default GoBack
