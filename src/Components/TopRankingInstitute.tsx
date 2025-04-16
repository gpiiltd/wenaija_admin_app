import React, { FC } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import Card from './Card'
import {
  addedIntitute,
  distributionByLocationData,
  institutCardData,
} from './data'
import ProgressBar from './ProgressBar'
import { InstituteCardProps, TypographyVariant } from './types'
import Typography from './Typography'

const CardItem: FC<InstituteCardProps> = ({ title, location, percentage }) => (
  <Card titleLeft={undefined} titleRight={undefined} className="p-3 flex-1">
    <div className="flex flex-col justify-center items-center">
      <Typography variant={TypographyVariant.SMALL} className="font-semibold">
        {title}
      </Typography>
      <Typography
        variant={TypographyVariant.SMALL}
        className="text-l_gray font-semibold"
      >
        {location}
      </Typography>
      <div className="py-1 px-3 bg-highlight_green rounded-xl text-center mt-5">
        <Typography
          variant={TypographyVariant.SMALL}
          className="text-primary_green font-semibold"
        >
          {percentage}
        </Typography>
      </div>
    </div>
  </Card>
)
const TopRankingInstitute = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-semibold"
          >
            Top ranking institute{' '}
          </Typography>
          <Typography variant={TypographyVariant.SMALL} className="text-l_gray">
            Below are top 3 ranked institute based on these indicators.{' '}
          </Typography>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/app/instutitions/all-institutions')}
        >
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-primary_green font-semibold cursor-pointer"
          >
            View
          </Typography>
          <FiArrowUpRight color="#007A61" />
        </div>
      </div>

      <section className="grid grid-cols-2 gap-5 w-full ">
        <div className="p-6 border rounded-md mt-3 py-6">
          <Typography
            variant={TypographyVariant.BODY_SMALL_MEDIUM}
            className="text-l_gray font-semibold"
          >
            Acceptability of Service{' '}
          </Typography>
          <div className="flex gap-5 justify-center items-center pt-4">
            {institutCardData.map((card, index) => (
              <CardItem
                key={index}
                title={card.title}
                location={card.location}
                percentage={card.percentage}
              />
            ))}
          </div>
        </div>
        <div className="p-6 border rounded-md mt-3 ">
          <Typography
            variant={TypographyVariant.BODY_SMALL_MEDIUM}
            className="text-l_gray font-semibold"
          >
            Competency of health workers
          </Typography>
          <div className="flex gap-5 justify-center items-center pt-4">
            {institutCardData.map((card, index) => (
              <CardItem
                key={index}
                title={card.title}
                location={card.location}
                percentage={card.percentage}
              />
            ))}
          </div>
        </div>
        <div className="p-6 border rounded-md mt-3 py-6">
          <Typography
            variant={TypographyVariant.BODY_SMALL_MEDIUM}
            className="text-l_gray font-semibold"
          >
            Privacy and confidentiality
          </Typography>
          <div className="flex gap-5 justify-center items-center pt-4">
            {institutCardData.map((card, index) => (
              <CardItem
                key={index}
                title={card.title}
                location={card.location}
                percentage={card.percentage}
              />
            ))}
          </div>
        </div>
        <div className="p-6 border rounded-md mt-3 py-6">
          <Typography
            variant={TypographyVariant.BODY_SMALL_MEDIUM}
            className="text-l_gray font-semibold"
          >
            Global accessment
          </Typography>
          <div className="flex gap-5 justify-center items-center pt-4">
            {institutCardData.map((card, index) => (
              <CardItem
                key={index}
                title={card.title}
                location={card.location}
                percentage={card.percentage}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 grid-cols-2">
        <div className="border p-6 border rounded-md mt-3">
          <div className="flex justify-between">
            <Typography
              variant={TypographyVariant.BODY_SMALL_MEDIUM}
              className="font-semibold text-l_gray"
            >
              Recently Added Institute{' '}
            </Typography>

            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/app/instutitions/all-institutions')}
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
          <div>
            <div>
              {addedIntitute.map((item, index) => (
                <ul
                  key={index}
                  className=" grid grid-cols-3 ounded-md items-start pt-4"
                >
                  <li className="font-semibold ">
                    <Typography
                      variant={TypographyVariant.BODY_SMALL_MEDIUM}
                      className="font-semibold"
                    >
                      {item.title}
                    </Typography>
                  </li>
                  <li className="text-gray-700 text-center">
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-l_gray font-semibold"
                    >
                      {item.state}
                    </Typography>
                  </li>
                  <li className="text-gray-700 text-right">
                    {' '}
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-l_gray font-semibold"
                    >
                      {item.lga}
                    </Typography>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
        {/* distribution by location */}
        <div className="border p-6 border rounded-md mt-3 py-6 ">
          <Typography
            variant={TypographyVariant.BODY_SMALL_MEDIUM}
            className="text-l_gray font-semibold"
          >
            Distribution by Location
          </Typography>
          <section className="mt-5">
            {distributionByLocationData.map((item, index) => (
              <div key={index} className="flex gap-6 items-center w-full mt-3">
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className="font-semibold"
                >
                  {item.state}
                </Typography>
                <ProgressBar percentage={item.percentage} />
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  )
}

export default TopRankingInstitute
