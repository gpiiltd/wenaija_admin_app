import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { LuUsers } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import backgroundImage from '../../Assets/svgImages/background.svg'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { TypographyVariant } from '../../Components/types'
import {
  fetchLeaderboardByUrl,
  triggerGetLeaderboardData,
} from '../../features/leaderboard/leaderboardThunk'
import { AppDispatch, RootState } from '../../state'
import ButtonComponent from '../Button'
import Card from '../Card'
import CustomModal from '../Modal'
import Typography from '../Typography'
import { badgeIconMap, getInitials } from './leaderboardData'
import UpdateLeaderboardBadge from './UpdateLeaderboardBadge'

const Leaderboard = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [timeFrame, setTimeFrame] = useState<
    'today' | 'this_week' | 'all_time'
  >('today')
  const [currentPage, setCurrentPage] = useState(1)
  const [isChangingPage, setIsChangingPage] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { results, loading } = useSelector(
    (state: RootState) => state.leaderboard.leaderboardData
  )

  const leaderboardData = results?.results

  useEffect(() => {
    dispatch(triggerGetLeaderboardData({ time: timeFrame }))
  }, [dispatch, timeFrame])

  if (loading || !leaderboardData) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#667085" size={50} />
      </div>
    )
  }

  const totalPages = Math.ceil(
    leaderboardData?.count / leaderboardData?.results?.length
  )

  const handleTimeFrameChange = (frame: 'today' | 'this_week' | 'all_time') => {
    setTimeFrame(frame)
    setCurrentPage(1)
  }

  const handleNextPage = () => {
    if (leaderboardData.next && !isChangingPage) {
      setIsChangingPage(true)
      dispatch(fetchLeaderboardByUrl(leaderboardData.next))
        .then(() => {
          setCurrentPage(currentPage + 1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        .finally(() => {
          setIsChangingPage(false)
        })
    }
  }

  const handlePreviousPage = () => {
    if (leaderboardData?.previous && !isChangingPage) {
      setIsChangingPage(true)
      dispatch(fetchLeaderboardByUrl(leaderboardData?.previous))
        .then(() => {
          setCurrentPage(currentPage - 1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        .finally(() => {
          setIsChangingPage(false)
        })
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg  w-full mx-auto mb-12">
      <Typography
        variant={TypographyVariant.SUBTITLE}
        className="text-lg md:text-2xl"
      >
        Leaderboard
      </Typography>
      <div className="flex flex-col md:flex-row justify-start rounded-lg py-4 mb-4 md:space-x-8 ">
        <div className="w-full md:w-[40%] flex flex-col space-y-6 ">
          <Card titleLeft={undefined} titleRight={undefined} className="p-6">
            <div className="flex flex-col gap-5">
              <section className="flex justify-between items-center">
                <Typography
                  variant={TypographyVariant.SUBTITLE}
                  className="text-l_gray w-2/3"
                >
                  Total Users Registered
                </Typography>
                <span style={{ color: '#ED7D31' }}>
                  <LuUsers className="w-6 h-6" />
                </span>
              </section>
              <section className="flex items-center justify-between">
                <Typography
                  variant={TypographyVariant.TITLE}
                  className="text-black font-semibold"
                >
                  {leaderboardData?.total_enabled_users.toLocaleString()}
                </Typography>
              </section>
            </div>
          </Card>

          <Card titleLeft={undefined} titleRight={undefined} className="p-4">
            <div className="flex flex-col gap-5">
              <section className="flex justify-between items-center">
                <Typography
                  variant={TypographyVariant.SUBTITLE}
                  className="text-l_gray w-2/3"
                >
                  Total point accumulated
                </Typography>
                <Icon type="star" className="w-12 h-12" />
              </section>
              <section className="flex items-center justify-between">
                <Typography
                  variant={TypographyVariant.TITLE}
                  className="text-black font-semibold"
                >
                  {leaderboardData?.total_starpoints.toLocaleString()}
                </Typography>
              </section>
            </div>
          </Card>
        </div>

        <div
          className="relative w-full md:w-[60%] h-[300px] rounded-xl flex flex-col p-6 bg-[#007A61] mb-4 md:mb-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex items-center justify-between mb-4 mx-2">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className=" text-left text-white "
            >
              Badges levels & Points thresholds
            </Typography>

            <div
              className="bg-white rounded-full p-2 cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <FaRegEdit className="text-[#007A61] " />
            </div>
          </div>

          <div className="flex space-x-6 m-2">
            {leaderboardData?.badges?.map((badge: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-40"
              >
                <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-2 md:h-36">
                  <h1 className="text-left text-black pt-4 font-bold uppercase">
                    {badge.name}
                  </h1>

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
                    className="w-32 h-28"
                  />
                </div>
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="text-left text-white pt-2 font-semibold"
                >
                  {badge.name === 'LEGEND'
                    ? `${badge.minimum_sp} +`
                    : `${badge.minimum_sp} - ${badge.maximum_sp}`}{' '}
                  points
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex mt-12 items-center space-x-4 mb-4 bg-gray-100 p-2 rounded-lg w-max">
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === 'today'
              ? 'bg-white text-black px-2 md:px-6'
              : 'text-gray-500'
          }`}
          onClick={() => handleTimeFrameChange('today')}
        >
          Daily
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === 'this_week' ? 'bg-white text-black' : 'text-gray-500'
          }`}
          onClick={() => handleTimeFrameChange('this_week')}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === 'all_time' ? 'bg-white text-black' : 'text-gray-500'
          }`}
          onClick={() => handleTimeFrameChange('all_time')}
        >
          All time
        </button>
      </div>

      <div className="overflow-x-auto rounded-3xl border-2 border-b-0 mt-8">
        <table className="min-w-full  rounded-t-3xl">
          <thead>
            <tr className="text-gray-500 font-semibold text-left border-b-2 py-12 rounded-t-3xl">
              <th className=" px-4 py-6">Rank</th>
              <th className=" px-4 py-6">Name</th>
              <th className=" px-4 py-6">Star Point</th>
              <th className=" px-4 py-6">Badges</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.results?.map((player: any, index: number) => (
              <tr key={index} className="border-b-2">
                <td className=" px-4 py-2 items-center justify-center">
                  {player.rank}
                </td>

                <td className="px-4 py-2 flex items-center w-64 space-x-2">
                  <div className="text-xs md:text-lg font-semibold bg-[#F0FEFB] rounded-full p-2 text-[#007A61] w-14 h-14 flex items-center justify-center">
                    {getInitials(player.full_name)}
                  </div>
                  <span className="capitalize">{player.full_name}</span>
                </td>
                <td className=" px-4 py-2 text-[#ED7D31] font-semibold w-64  gap-2">
                  <span className="text-sm mr-2">
                    {player.total_sp.toLocaleString()}
                  </span>
                  <span className="text-sm">SP</span>
                </td>
                <td className=" px-4 py-2 flex items-center text-gray-500 w-64">
                  <Icon
                    type={badgeIconMap[player.badge] || 'scoutBadge'}
                    className="w-6 h-6 mr-2 "
                  />
                  {player.badge}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <div className="">
          <ButtonComponent
            text="Previous"
            active={!!leaderboardData?.previous}
            loading={false}
            // onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            onClick={handlePreviousPage}
          />
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="">
          <ButtonComponent
            text="Next"
            active={!!leaderboardData?.next}
            loading={false}
            // onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            onClick={handleNextPage}
          />
        </div>
      </div>

      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        width="max-content"
        height="fit"
      >
        <UpdateLeaderboardBadge
          setModalOpen={setModalOpen}
          badges={leaderboardData?.badges}
        />
      </CustomModal>
    </div>
  )
}

export default Leaderboard
