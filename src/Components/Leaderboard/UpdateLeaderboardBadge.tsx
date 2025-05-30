import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { triggerEditPointsAndBadges } from '../../features/leaderboard/leaderboardThunk'
import { AppDispatch, RootState } from '../../state'
import ButtonComponent from '../Button'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import BadgeLevelInput from './BadgeLevelInput'

export interface UpdateLeaderboardBadgeProps {
  badges: {
    id: number
    logo: string
    maximum_sp: number
    minimum_sp: number
    name: string
  }[]
  setModalOpen: (open: boolean) => void
}

const UpdateLeaderboardBadge: React.FC<UpdateLeaderboardBadgeProps> = ({
  badges,
  setModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const { editLeaderboardData } = useSelector(
    (state: RootState) => state.leaderboard
  )

  const [badgeValues, setBadgeValues] = useState(() =>
    badges?.map(badge => ({
      id: badge.id,
      name: badge.name,
      logo: badge.logo,
      minimum_sp: badge.minimum_sp,
      maximum_sp: badge.maximum_sp,
    }))
  )

  const handleMinChange = (id: number, value: number) => {
    setBadgeValues(prev =>
      prev.map(badge =>
        badge.id === id ? { ...badge, minimum_sp: value } : badge
      )
    )
  }

  const handleMaxChange = (id: number, value: number) => {
    setBadgeValues(prev =>
      prev.map(badge =>
        badge.id === id ? { ...badge, maximum_sp: value } : badge
      )
    )
  }

  const handleSubmit = () => {
    const payload = {
      id: badgeValues[0].id,
      data: {
        minimum_sp: Number(badgeValues[0].minimum_sp),
        maximum_sp: Number(badgeValues[0].maximum_sp),
      },
    }

    dispatch(triggerEditPointsAndBadges(payload))
  }

  // useEffect(() => {
  //   if (editLeaderboardData.results && editLeaderboardData.statusCode === 200) {
  //     toast.success('Badge thresholds updated successfully!')
  //   } else {
  //     toast.error(editLeaderboardData.message)
  //   }
  //   setModalOpen(false)
  //   dispatch(resetLeaderboardState())
  // }, [
  //   dispatch,
  //   editLeaderboardData.message,
  //   editLeaderboardData.results,
  //   editLeaderboardData.statusCode,
  //   setModalOpen,
  // ])

  return (
    <div className="flex flex-col px-10 py-4">
      <Typography
        variant={TypographyVariant.SUBTITLE}
        className="mb-6 text-center text-lg"
      >
        Edit badge points threshold
      </Typography>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {badgeValues.map(badge => (
          <div key={badge.id}>
            <BadgeLevelInput
              levelName={`${badge.name} level`}
              minValue={badge.minimum_sp}
              maxValue={badge.maximum_sp}
              onMinChange={value => handleMinChange(badge.id, value)}
              onMaxChange={value => handleMaxChange(badge.id, value)}
              icon={
                <Icon
                  type={
                    badge.name === 'SCOUT'
                      ? 'scoutBadge'
                      : badge.name === 'GUARDIAN'
                        ? 'guardianBadge'
                        : badge.name === 'CHAMPION'
                          ? 'championBadge'
                          : badge.name === 'LEGEND'
                            ? 'legendBadge'
                            : ''
                  }
                  className="w-8 h-8"
                />
              }
            />
          </div>
        ))}

        <div className="flex justify-between mt-6 mx-auto gap-4 pb-12">
          <ButtonComponent
            text="Cancel"
            active={true}
            loading={false}
            onClick={() => setModalOpen(false)}
          />

          <ButtonComponent
            text="Submit"
            text_color="#FFFFFF"
            bg_color="#007A61"
            active={true}
            onClick={handleSubmit}
            loading={false}
          />
        </div>
      </form>
    </div>
  )
}

export default UpdateLeaderboardBadge
