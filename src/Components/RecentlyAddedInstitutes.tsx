import React, { FC } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { TypographyVariant } from './types'
import Typography from './Typography'

interface RecentlyAddedInstitutesProps {
  institutes: { name: string; location: string; lga: string }[]
}

const RecentlyAddedInstitutes: FC<RecentlyAddedInstitutesProps> = ({
  institutes,
}) => {
  const navigate = useNavigate()
  return (
    <div className="p-6 border rounded-md">
      <div className="flex justify-between">
        <Typography
          variant={TypographyVariant.BODY_SMALL_MEDIUM}
          className="font-semibold text-l_gray"
        >
          Recently Added Institute{' '}
        </Typography>

        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/app/instutitions')}
        >
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-primary_green font-semibold"
          >
            View all
          </Typography>
          <FiArrowUpRight color="#007A61" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {institutes.map((institute, index) => (
          <ul
            key={index}
            className="grid grid-cols-3 rounded-md items-center pt-4"
          >
            <li className="font-semibold ">
              <Typography
                variant={TypographyVariant.BODY_SMALL_MEDIUM}
                className="font-semibold"
              >
                {institute.name}
              </Typography>
            </li>
            <li className="text-gray-700 text-center">
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-l_gray font-semibold"
              >
                {institute.location}
              </Typography>
            </li>
            <li className="text-gray-700 text-right">
              {' '}
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-l_gray font-semibold"
              >
                {institute.lga}
              </Typography>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default RecentlyAddedInstitutes
