import { ReactNode } from 'react'

export enum TypographyVariant {
  TITLE,
  SUBTITLE,
  BODY_DEFAULT_MEDIUM,
  BODY_SMALL_MEDIUM,
  SMALL,
  NORMAL,
}

export interface TypographyProps {
  children: React.ReactNode
  variant: TypographyVariant
  className?: string
}

export interface Svgprops {
  type: any
  className?: string
  click?: () => void
}

export interface TextInputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  helperText?: string
  icon?: ReactNode
  onClick?: () => void
  focusStyle?: string
  value?: string
  required?: boolean
  setValues?: (value: Record<string, string>) => void
  setFieldValue?: (a: string, b: string) => void
  setFieldTouched?: (a: string, b: boolean, c: boolean) => void
}

export interface CardProps {
  titleLeft: React.ReactNode
  titleRight: React.ReactNode
  children: React.ReactNode
  width?: string
  height?: string
  className?: string
  onClick?: () => void
}

export interface InstituteCardProps {
  title: string
  location: string
  percentage: number
}
export interface InstitutionProps {
  name: string
  address: string
  operation_days: string
  mobile_number: string
  email: string
  icon?: string
  opening_time?: string
  closing_time?: string
}

export interface StatCardProps {
  title: string
  value: string | number | undefined // <== change this
  icon: string
  // color?: string;
}

export interface ButtonProps {
  bg_color?: string
  text: string
  onClick?: () => void
  active: boolean
  loading: boolean
  text_color?: string
  border_color?: string
  icon?: any
}

export type UserTab = string
