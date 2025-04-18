import React, { FC, ReactNode } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

interface TooltipProps {
  children: ReactNode
  tooltip: string
  className?: string
  onClick?: () => void
}

const Tooltip: FC<TooltipProps> = ({
  children,
  tooltip,
  className,
  onClick,
}) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip()

  return (
    <div className="relative">
      <button type="button" ref={setTriggerRef} onClick={onClick}>
        {children}
      </button>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: `tooltip-container ${className || ''}`,
            style: { border: 'none', backgroundColor: 'white' }, // Remove border
          })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {tooltip}
        </div>
      )}
    </div>
  )
}

export default Tooltip
