import React from 'react'
import { TiStopwatch } from 'react-icons/ti'
import Typography from './Typography'
import { TypographyVariant } from './types'
import { FiArrowUpRight } from 'react-icons/fi'
import Icon from '../Assets/svgImages/Svg_icons_and_images'

const TopContributors = () => {
  return (
    <>
      <div className="flex justify-between">
                <section className="flex gap-2 items-center">
                  <TiStopwatch />
                  <Typography variant={TypographyVariant.SUBTITLE}>
                    Top contributors
                  </Typography>
                </section>
                <div className="flex items-center cursor-pointer">
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-primary_green font-semibold"
                  >
                    View
                  </Typography>
                  <FiArrowUpRight color="#007A61" />
                </div>
              </div>
              <div className="p-6 bg-water_color flex items-center justify-between rounded-2xl mt-3 h-fit flex-1">
                <Icon type="champion" />
                <div className="p-3 bg-highlight_green rounded-full w-10 h-10 text-center">
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-primary_green"
                  >
                    JZ
                  </Typography>
                </div>
                <div className="p-3 ">
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                  >
                   Jizzyjeggs
                  </Typography>
                  <div className='flex items-center gap-2'>
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className='text-l_gray'
                  >
                    Legend level 
                  </Typography>
                  <Icon type="badge" />
                  </div>
                
                </div>
                <Typography
                    variant={TypographyVariant.SMALL}
                    className='text-orange font-semibold'
                  >
                    200 SP
                  </Typography>
              </div>
              <div className="p-6 bg-water_color flex items-center justify-between rounded-2xl mt-3 h-fit flex-1">
                <Icon type="champion" />
                <div className="p-3 bg-highlight_green rounded-full w-10 h-10 text-center">
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-primary_green"
                  >
                    JZ
                  </Typography>
                </div>
                <div className="p-3 ">
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                  >
                   Jizzyjeggs
                  </Typography>
                  <div className='flex items-center gap-2'>
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className='text-l_gray'
                  >
                    Legend level 
                  </Typography>
                  <Icon type="badge" />
                  </div>
                
                </div>
                <Typography
                    variant={TypographyVariant.SMALL}
                    className='text-orange font-semibold'
                  >
                    200 SP
                  </Typography>
              </div>
              <div className="p-2 bg-water_color flex items-center justify-between rounded-2xl mt-3 h-fit flex-1">
                <Icon type="champion" />
                <div className="p-3 bg-highlight_green rounded-full w-10 h-10 text-center">
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-primary_green"
                  >
                    JZ
                  </Typography>
                </div>
                <div className="p-3 ">
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                  >
                   Jizzyjeggs
                  </Typography>
                  <div className='flex items-center gap-2'>
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className='text-l_gray'
                  >
                    Legend level 
                  </Typography>
                  <Icon type="badge" />
                  </div>
                
                </div>
                <Typography
                    variant={TypographyVariant.SMALL}
                    className='text-orange font-semibold'
                  >
                    200 SP
                  </Typography>
              </div>
              </>
  )
}

export default TopContributors