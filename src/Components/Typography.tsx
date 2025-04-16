import React from 'react'
import { TypographyProps, TypographyVariant } from './types'

const Typography: React.FC<TypographyProps> = ({
  children,
  className,
  variant,
}) => {
  // Explicitly type the `classes` object
  const classes: Record<TypographyVariant, string> = {
    [TypographyVariant.TITLE]:
      'text-[25px] tracking-tight leading-[38px] font-semibold text-black font-title',
    [TypographyVariant.SUBTITLE]:
      'font-semibold text-[15px] leading-[26px] text-l_black font-title',
    [TypographyVariant.BODY_DEFAULT_MEDIUM]:
      'text-[16px] leading-[26px] font-medium text-gray font-title',
    [TypographyVariant.BODY_SMALL_MEDIUM]:
      'text-[12px] font-medium leading-[22px] text-d_gray font-title',
    [TypographyVariant.SMALL]:
      'text-[11px] font-normal leading-[22px] text-d_gray font-title',
    [TypographyVariant.NORMAL]: '',
  }

  const variantClass = classes[variant] || '' // Dynamically get the class for the variant

  return <div className={`${variantClass} ${className}`}>{children}</div>
}

export default Typography
