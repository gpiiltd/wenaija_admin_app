import React, { useState } from "react";
import { badgeIconMap, getInitials, leaderboardData } from "./leaderboardData";
import backgroundImage from "../../Assets/svgImages/background.svg";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { FaRegEdit } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import Card from "../Card";
import ButtonComponent from "../Button";
import CustomModal from "../Modal";
import BadgeLevelInput from "./BadgeLevelInput";
import showCustomToast from "../CustomToast";

const Leaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [scoutMin, setScoutMin] = useState(0);
  const [scoutMax, setScoutMax] = useState(499);
  const [guardianMin, setGuardianMin] = useState(500);
  const [guardianMax, setGuardianMax] = useState(999);
  const [championMin, setChampionMin] = useState(1000);
  const [championMax, setChampionMax] = useState(1999);
  const [legendMin, setLegendMin] = useState(2000);
  const [legendMax, setLegendMax] = useState(499);

  const itemsPerPage = 10;

  const selectedTimeFrame =
    leaderboardData[timeFrame as keyof typeof leaderboardData];

  const sortedLeaderboardData = [...selectedTimeFrame].sort(
    (a, b) => b.points - a.points,
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedItems = sortedLeaderboardData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(sortedLeaderboardData.length / itemsPerPage);

  const handleTimeFrameChange = (frame: string) => {
    setTimeFrame(frame);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalOpen(false);
    }, 2000);
    setTimeout(() => {
      showCustomToast(
        "Points threshold edited successfully",
        `Lorem ipsum dolor sit amet consectetur.`,
      );
    }, 2000);

    console.log({
      scout: { min: scoutMin, max: scoutMax },
      guardian: { min: guardianMin, max: guardianMax },
      champion: { min: championMin, max: championMax },
      legend: { min: legendMin, max: legendMax },
    });
  };

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
                <span style={{ color: "#ED7D31" }}>
                  <LuUsers className="w-6 h-6" />
                </span>
              </section>
              <section className="flex items-center justify-between">
                <Typography
                  variant={TypographyVariant.TITLE}
                  className="text-black font-semibold"
                >
                  1,234
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
                  1,234
                </Typography>
              </section>
            </div>
          </Card>
        </div>

        <div
          className="relative w-full md:w-[60%] h-[300px] rounded-xl flex flex-col p-6 bg-[#007A61] mb-4 md:mb-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
            <div className="flex flex-col items-center justify-center w-40">
              <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-2 md:h-36">
                <h1 className="text-left text-black pt-4 font-bold">SCOUT</h1>
                <Icon type="scoutBadge" className="w-32 h-28" />
              </div>
              <Typography
                variant={TypographyVariant.SMALL}
                className=" text-left text-white pt-2 font-semibold"
              >
                0 - 499 points
              </Typography>
            </div>
            <div className="flex flex-col items-center justify-center w-40">
              <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-2 md:h-36">
                <h1 className="text-left text-black pt-4 font-bold">
                  GUARDIAN
                </h1>

                <Icon type="guardianBadge" className="w-32 h-28" />
              </div>
              <Typography
                variant={TypographyVariant.SMALL}
                className=" text-left text-white pt-2 font-semibold"
              >
                500 - 999 points
              </Typography>
            </div>
            <div className="flex flex-col items-center justify-center w-40">
              <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-2 md:h-36">
                <h1 className="text-left text-black pt-4 font-bold">
                  CHAMPION
                </h1>

                <Icon type="championBadge" className="w-32 h-28" />
              </div>
              <Typography
                variant={TypographyVariant.SMALL}
                className=" text-left text-white pt-2 font-semibold"
              >
                1000 - 1999 points
              </Typography>
            </div>
            <div className="flex flex-col items-center justify-center w-40">
              <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-2 md:h-36">
                <h1 className="text-left text-black pt-4 font-bold">LEGEND</h1>

                <Icon type="legendBadge" className="w-32 h-28" />
              </div>
              <Typography
                variant={TypographyVariant.SMALL}
                className=" text-left text-white pt-2 font-semibold"
              >
                2000+ points
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-12 items-center space-x-4 mb-4 bg-gray-100 p-2 rounded-lg w-full md:w-[50%] lg:w-[32%] ">
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "daily"
              ? "bg-white text-black px-2 md:px-6"
              : "text-gray-500"
          }`}
          onClick={() => handleTimeFrameChange("daily")}
        >
          Daily
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "weekly" ? "bg-white text-black" : "text-gray-500"
          }`}
          onClick={() => handleTimeFrameChange("weekly")}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "monthly" ? "bg-white text-black" : "text-gray-500"
          }`}
          onClick={() => handleTimeFrameChange("monthly")}
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
            {displayedItems.map((player, index) => (
              <tr key={player.name} className="border-b-2">
                <td className=" px-4 py-2 items-center justify-center">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td className=" px-4 py-2 flex items-center w-64">
                  <div className="text-xs md:text-lg font-semibold bg-[#F0FEFB] rounded-full px-2 py-2 md:px-6 md:py-4  text-[#007A61] mr-2">
                    {getInitials(player.name)}
                  </div>
                  {player.name}
                </td>
                <td className=" px-4 py-2  text-[#ED7D31] font-semibold w-64  gap-2">
                  <span className="text-sm mr-2">{player.points}</span>
                  <span className="text-sm">SP</span>
                </td>
                <td className=" px-4 py-2 flex items-center text-gray-500 w-64">
                  <Icon
                    type={badgeIconMap[player.badge] || "scoutBadge"}
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
            active={currentPage > 1}
            loading={false}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="">
          <ButtonComponent
            text="Next"
            active={currentPage < totalPages}
            loading={false}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      </div>

      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        width="40%"
        height="fit"
      >
        <div className="flex flex-col px-14 py-2">
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="mb-6 text-center"
          >
            Edit badge points threshold
          </Typography>

          <div className="flex flex-col gap-4">
            <BadgeLevelInput
              levelName="Scout level"
              minValue={scoutMin}
              maxValue={scoutMax}
              onMinChange={setScoutMin}
              onMaxChange={setScoutMax}
              icon={<Icon type="scoutBadge" className="w-8 h-8" />}
            />
            <BadgeLevelInput
              levelName="Guardian level"
              minValue={guardianMin}
              maxValue={guardianMax}
              onMinChange={setGuardianMin}
              onMaxChange={setGuardianMax}
              icon={<Icon type="guardianBadge" className="w-8 h-8" />}
            />
            <BadgeLevelInput
              levelName="Champion level"
              minValue={championMin}
              maxValue={championMax}
              onMinChange={setChampionMin}
              onMaxChange={setChampionMax}
              icon={<Icon type="championBadge" className="w-8 h-8" />}
            />
            <BadgeLevelInput
              levelName="Legend level"
              minValue={legendMin}
              maxValue={legendMax}
              onMinChange={setLegendMin}
              onMaxChange={setLegendMax}
              icon={<Icon type="legendBadge" className="w-8 h-8" />}
            />
          </div>

          <div className="flex justify-between mt-6 mx-auto gap-4 mb-12">
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
              loading={loading}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default Leaderboard;
