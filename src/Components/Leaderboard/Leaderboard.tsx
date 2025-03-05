import React, { useState } from "react";
import { badgeIconMap, getInitials, leaderboardData } from "./leaderboardData";
import backgroundImage from "../../Assets/svgImages/background.svg";
import { TypographyVariant } from "../../Components/types";
import Typography from "../Typography";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { FaRegEdit } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import Card from "../Card";

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("daily");
  const [visibleCount, setVisibleCount] = useState(10);

  const selectedTimeFrame =
    leaderboardData[timeFrame as keyof typeof leaderboardData];

  const sortedLeaderboardData = [...selectedTimeFrame].sort(
    (a, b) => b.points - a.points
  );

  const displayedItems = sortedLeaderboardData.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 10, selectedTimeFrame.length)
    );
  };

  const handleTimeFrameChange = (frame: string) => {
    setTimeFrame(frame);
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

            <div className="bg-white rounded-full p-2 cursor-pointer">
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
                  {index < 3 ? (
                    <Icon type={`medal${index + 1}`} className="w-10 h-10" />
                  ) : (
                    index + 1
                  )}
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
            {/* Show more rows */}
            {visibleCount < selectedTimeFrame.length && (
              <tr>
                <td colSpan={4} className="text-center border-b relative">
                  <button
                    onClick={handleShowMore}
                    className="text-black hover:underline text-3xl pb-8 font-semibold"
                    aria-label="Show more"
                  >
                    ...
                  </button>
                  <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                    Show more
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
