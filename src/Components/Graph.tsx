import { Line } from "react-chartjs-2";
import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import Typography from "./Typography";
import { TypographyVariant } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface Tab {
  key: string;
  label: string;
  icon: React.ReactNode;
}

interface FloatingBarChartProps {
  tabs: Tab[];
}

const FloatingBarChart: React.FC<FloatingBarChartProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");

  const data = (canvas: any) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 250, 0, 0);

    gradient.addColorStop(0, "rgba(0, 122, 97, 0.05)");
    gradient.addColorStop(0.5, "rgba(0, 122, 97, 0.2)");
    gradient.addColorStop(1, "rgba(0, 122, 97, 0.4)");

    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "",
          data: [0, 20, 40, 60, 80, 100, 80, 60, 40, 20, 10, 0],
          borderColor: "#007A61",
          backgroundColor: gradient,
          borderWidth: 2,
          tension: 0.3,
          fill: true,
          pointRadius: 0,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        grid: { drawBorder: false },
        beginAtZero: false,
        min: -0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="w-full h-auto">
      <div className="flex justify-between items-center mb-6">
        <section className="flex gap-6">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`flex items-center gap-2 py-2 cursor-pointer ${
                activeTab === tab.key
                  ? "text-black border-b-2 border-b-black"
                  : "text-gray border-b-2 border-b-gray"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className={`font-semibold ${
                  activeTab === tab.key ? "text-black" : "text-gray"
                }`}
              >
                {tab.label}
              </Typography>
            </div>
          ))}
        </section>

        <section className="border p-2 rounded cursor-pointer">
          <div className="flex items-center gap-2">
            <CiCalendar />
            <Typography
              variant={TypographyVariant.BODY_SMALL_MEDIUM}
              className="text-l_gray"
            >
              Select dates
            </Typography>
          </div>
        </section>
      </div>

      <div className="flex w-full">
  <h6
    className="text-l_gray text-[11px] font-semibold leading-[22px] text-d_gray font-title pt-24"
    style={{
      writingMode: "vertical-rl",
      textOrientation: "mixed",
    }}
  >
    Counts
  </h6>
  <div className="flex flex-col items-center w-full">
    <div className="w-full h-[200px] flex-1">
      <Line data={data} options={options} />
    </div>

    {/* Months Label - Placed outside the chart */}
    <Typography
      variant={TypographyVariant.BODY_SMALL_MEDIUM}
      className="text-l_gray text-center pt-3"
    >
      Months
    </Typography>
  </div>
</div>
    </div>
  );
};

export default FloatingBarChart;
