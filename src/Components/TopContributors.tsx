import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { TiStopwatch } from 'react-icons/ti'
import { useNavigate } from 'react-router'
import Icon from '../Assets/svgImages/Svg_icons_and_images'
import { TypographyVariant } from './types'
import Typography from './Typography'

interface TopContributorsProps {
  top_contributors: {
    badge_level: string
    id: string
    name: string
    rank: number
    total_sp: number
  }[]
}

export const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' B'
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + ' K'
  }
  return num.toString()
}

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map(n => n[0])
    .join('')

const TopContributors = ({ top_contributors }: TopContributorsProps) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex justify-between">
        <section className="flex gap-2 items-center">
          <TiStopwatch />
          <Typography variant={TypographyVariant.SUBTITLE}>
            Top contributors
          </Typography>
        </section>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/app/leaderboard')}
        >
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-primary_green font-semibold"
          >
            View
          </Typography>
          <FiArrowUpRight color="#007A61" />
        </div>
      </div>

      {top_contributors.map((contributor, index) => (
        <div
          key={index}
          className="p-2 bg-water_color flex items-center justify-between rounded-2xl mt-3 h-fit flex-1"
        >
          <Icon
            className="w-7 h-7"
            type={
              contributor.rank === 1
                ? 'medal1'
                : contributor.rank === 2
                  ? 'medal2'
                  : 'medal3'
            }
          />
          <div className="p-3 bg-highlight_green rounded-full w-10 h-10 text-center">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-primary_green uppercase"
            >
              {getInitials(contributor.name)}
            </Typography>
          </div>
          <div className="p-3 ">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="capitalize"
            >
              {contributor.name}
            </Typography>
            <div className="flex items-center gap-2">
              <Typography
                variant={TypographyVariant.BODY_SMALL_MEDIUM}
                className="text-l_gray"
              >
                {contributor.badge_level} level
              </Typography>
              <Icon
                type={
                  contributor.badge_level === 'SCOUT'
                    ? 'scoutBadge'
                    : contributor.badge_level === 'GUARDIAN'
                      ? 'guardianBadge'
                      : contributor.badge_level === 'CHAMPION'
                        ? 'championBadge'
                        : contributor.badge_level === 'LEGEND'
                          ? 'legendBadge'
                          : ''
                }
                className="w-5 h-5"
              />
            </div>
          </div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-orange font-semibold"
          >
            {formatLargeNumber(contributor.total_sp)} SP
          </Typography>
        </div>
      ))}
    </>
  )
}

export default TopContributors
