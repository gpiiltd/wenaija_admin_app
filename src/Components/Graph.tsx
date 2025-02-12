import React from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useState } from "react";
import Typography from "./Typography";
import { TypographyVariant } from "./types";
import { LuUsers } from "react-icons/lu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const FloatingBarChart = () => {
  const [data, setData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ],
    datasets: [
      {
        label: "",
        data: [100, 80, 60, 40, 20, 0],
        borderColor: ["#007A61"],
        pointBorderColor: "rgba(0, 0, 0, 0)",
        backgroundColor: "#007A6100",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        pointHoverBorderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 2,
        tension: 0.2,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  });

  const options = {
    plugins: {
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  return (
    <div className=" ">
      <div className="flex justify-between items-center">
        <section className="flex gap-6 ">
          <div className="flex items-center gap-2 border-b-2 border-b-black py-2 cursor-pointer">
            <HiOutlineDocumentReport />
            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className=" font-semibold"
            >
              Reports
            </Typography>
          </div>
          <div className="flex items-center gap-2 border-b-2 border-b-black py-2 cursor-pointer">
            <LuUsers />
            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className="font-semibold"
            >
              Users
            </Typography>
          </div>
        </section>
        <section className="border p-2 rounded cursor-pointer">
          <div className="flex items-center gap-2">
            <CiCalendar />
            <Typography
              variant={TypographyVariant.BODY_SMALL_MEDIUM}
              className=" text-l_gray"
            >
              Select dates{" "}
            </Typography>
          </div>
        </section>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default FloatingBarChart;
