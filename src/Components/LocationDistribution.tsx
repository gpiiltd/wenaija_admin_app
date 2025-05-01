import React, { FC } from 'react'
import ProgressBar from './ProgressBar'
import { TypographyVariant } from './types'
import Typography from './Typography'

interface LocationDistributionProps {
  distribution: Record<string, number>
}

const LocationDistribution: FC<LocationDistributionProps> = ({
  distribution,
}) => {
  console.log('Location distribution:', distribution)

  if (!distribution) return null
  return (
    <div className="border p-6 rounded-md py-6">
      <Typography
        variant={TypographyVariant.BODY_SMALL_MEDIUM}
        className="text-l_gray font-semibold"
      >
        Distribution by Location
      </Typography>
      <section className="mt-5 space-y-4">
        {Object.entries(distribution).map(([location, percentage]) => (
          <div key={location} className="flex items-center w-full gap-6">
            <Typography
              variant={TypographyVariant.BODY_SMALL_MEDIUM}
              className="font-semibold w-1/4"
            >
              {location}
            </Typography>
            <ProgressBar percentage={percentage} />
          </div>
        ))}
      </section>
    </div>
  )
}

export default LocationDistribution
