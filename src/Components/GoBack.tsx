import React from 'react'
import Typography from './Typography';
import { TypographyVariant } from './types';
import { useNavigate } from 'react-router';
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";


interface HeaderProps {
    label: string;
  }
const GoBack: React.FC<HeaderProps> = ({ label }) => {
    const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <button onClick={() => navigate(-1)}>
        <HiOutlineArrowSmallLeft size={24} />

      </button>
      <Typography variant={TypographyVariant.TITLE}>
        {label}
      </Typography>
    </div>
  )
}

export default GoBack