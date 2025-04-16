import React, { ReactNode } from 'react'
import Card from '../../Components/Card'
import { TypographyVariant } from '../../Components/types'
import Typography from '../../Components/Typography'

export type TabKey =
  | 'Basic information'
  | 'Contact information'
  | 'KYC verification'

export const UserInfoRow = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <div className="flex flex-col ">
    <Typography
      variant={TypographyVariant.SMALL}
      className="text-l_gray font-semibold"
    >
      {label}
    </Typography>
    <Typography
      variant={TypographyVariant.BODY_SMALL_MEDIUM}
      className="text-primary_green font-semibold"
    >
      {value}
    </Typography>
  </div>
)

export const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: ReactNode
  color: string
}) => (
  <Card titleLeft={undefined} titleRight={undefined} className="p-3">
    <div className="flex flex-col gap-5">
      <section className="flex justify-between items-center">
        <Typography
          variant={TypographyVariant.SUBTITLE}
          className="text-l_gray w-2/3"
        >
          {title}
        </Typography>
        <span style={{ color }}>{icon}</span>
      </section>
      <section className="flex items-center justify-between">
        <Typography
          variant={TypographyVariant.BODY_SMALL_MEDIUM}
          className="text-[#2D3648] font-semibold"
        >
          {value}
        </Typography>
      </section>
    </div>
  </Card>
)

export const UserInfo = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <div className="flex flex-col pb-8">
    <Typography
      variant={TypographyVariant.BODY_SMALL_MEDIUM}
      className="text-l_gray font-bold"
    >
      {label}
    </Typography>
    <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
      {value}
    </Typography>
  </div>
)

interface InfoItemProps {
  label: string
  value: string
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1 pt-6">
      <Typography
        variant={TypographyVariant.SMALL}
        className="text-l_gray font-semibold"
      >
        {label}
      </Typography>
      <Typography
        variant={TypographyVariant.BODY_SMALL_MEDIUM}
        className="text-[#2D3648] font-semibold"
      >
        {value}
      </Typography>
    </div>
  )
}

interface TabContent {
  gridCols: string
  data?: { label: string; value: (d: any) => any }[]
  fields?: { label: string; value: (d: any) => any }[]
  title?: string
}
export const tabContent: { [key: string]: TabContent } = {
  'Basic information': {
    title: 'Basic information',
    gridCols: 'grid-cols-1 md:grid-cols-3',
    data: [
      {
        label: 'Full Name',
        value: (d: any) => `${d.first_name} ${d.last_name}`,
      },
      { label: 'Username', value: (d: any) => d.username || 'N/A' },
      { label: 'Nationality', value: (d: any) => d.nationality || 'N/A' },
      { label: 'Gender', value: (d: any) => d.gender || 'N/A' },
      {
        label: 'Date of Birth',
        value: (d: any) =>
          new Date(d.date_of_birth).toLocaleDateString() || 'N/A',
      },
    ],
  },
  'Contact information': {
    title: 'Contact information',

    gridCols: 'grid-cols-1 md:grid-cols-3',
    data: [
      { label: 'Phone Number', value: (d: any) => d.mobile_number || 'N/A' },
      { label: 'Email', value: (d: any) => d.email || 'N/A' },
      {
        label: 'Residential Address',
        value: (d: any) => d.address || 'N/A',
      },
    ],
  },
  'KYC verification': {
    title: 'KYC Verification',
    gridCols: 'grid-cols-1 md:grid-cols-3',
    fields: [
      { label: 'ID Type', value: (d: any) => d.id_type || 'N/A' },
      { label: 'ID Number', value: (d: any) => d.id_number || 'N/A' },
      { label: 'Uplaoded ID front', value: (d: any) => d.id_front || 'N/A' },
      { label: 'Uplaoded ID back', value: (d: any) => d.id_back || 'N/A' },
    ],
  },
}
