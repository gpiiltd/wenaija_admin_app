import React from "react";
import { LuUsers } from "react-icons/lu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Typography from "../Typography";
import { TypographyVariant } from "../types";

const data = [
  { name: "Jan", communityTask: 400, survey: 800 },
  { name: "Feb", communityTask: 450, survey: 950 },
  { name: "Mar", communityTask: 320, survey: 600 },
  { name: "Apr", communityTask: 400, survey: 700 },
  { name: "May", communityTask: 350, survey: 620 },
  { name: "Jun", communityTask: 500, survey: 900 },
  { name: "Jul", communityTask: 420, survey: 780 },
  { name: "Aug", communityTask: 440, survey: 800 },
  { name: "Sep", communityTask: 460, survey: 820 },
  { name: "Oct", communityTask: 480, survey: 900 },
  { name: "Nov", communityTask: 500, survey: 980 },
  { name: "Dec", communityTask: 390, survey: 750 },
];

const CustomBarChart = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        padding: 20,
        background: "#fff",
        borderRadius: 10,
      }}
    >
      {/* Title & Legend section */}
      <div>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="flex flex-row items-center"
        >
          <LuUsers className="mr-2" />
          Report
        </Typography>
        <hr className="w-20 h-[2px] bg-black border-none" />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <div></div>
        <div
          className="mr-10"
          style={{ display: "flex", gap: 15, alignItems: "center" }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 12,
                height: 12,
                background: "#164734",
                display: "inline-block",
                borderRadius: 3,
              }}
            ></span>
            Community task
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 12,
                height: 12,
                background: "#B3F3E5",
                display: "inline-block",
                borderRadius: 3,
              }}
            ></span>
            Survey
          </span>
        </div>
      </div>

      <div className="relative w-full bg-green">
        <h6
          className="absolute lr-[2rem] text-l_gray text-[11px] font-semibold leading-[22px] text-d_gray font-title pt-24"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          Counts
        </h6>

        {/* Chart Section */}
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="communityTask" stackId="a" fill="#164734" />{" "}
            {/* Dark Green */}
            <Bar dataKey="survey" stackId="a" fill="#B3F3E5" />{" "}
            {/* Light Green */}
          </BarChart>
        </ResponsiveContainer>

        <h6 className="flex items-center justify-center w-full text-l_gray text-[11px] font-semibold leading-[22px] text-d_gray font-title mt-4">
          Months
        </h6>
      </div>
    </div>
  );
};

export default CustomBarChart;
