import React, { FC } from "react";
import Typography from "./Typography";
import { InstituteCardProps, TypographyVariant } from "./types";
import Card from "./Card";
import { FiArrowUpRight } from "react-icons/fi";
import { institutCardData } from "./data";

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
);
const TopRankingInstitute = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-semibold"
          >
            Top ranking institute{" "}
          </Typography>
          <Typography variant={TypographyVariant.SMALL} className="text-l_gray">
            Below are top 3 ranked institute based on these indicators.{" "}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-primary_green font-semibold"
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
            Acceptability of Service{" "}
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
    </div>
  );
};

export default TopRankingInstitute;
