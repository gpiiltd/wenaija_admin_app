import React, { FC } from 'react'
import { CardProps } from './types'

const Card: FC<CardProps> = ({
  children,
  width,
  height,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white overflow-y-auto ${className || ''}`}
      style={{
        width: width,
        height: height,
        border: '1px solid #EEEEEEEE',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
      }}
    >
      {children}
    </div>
  )
}

export default Card
