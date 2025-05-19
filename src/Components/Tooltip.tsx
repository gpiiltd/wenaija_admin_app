import React, { FC, ReactNode } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { v4 as uuidv4 } from 'uuid'

interface TooltipProps {
  children: ReactNode
  tooltip: string
  className?: string
  onClick?: () => void
}

const Tooltip: FC<TooltipProps> = ({ children, tooltip, onClick }) => {
  const id = uuidv4()

  return (
    <>
      <div
        data-tooltip-id={id}
        data-tooltip-content={tooltip}
        onClick={onClick}
      >
        {children}
      </div>
      <ReactTooltip id={id} place="bottom" className="bg-white text-black" />
    </>
  )
}

export default Tooltip
