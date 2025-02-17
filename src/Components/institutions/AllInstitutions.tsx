import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { recentInstitutions } from "./institutionData";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import { CircularProgressbar } from "react-circular-progressbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import CustomModal from "../Modal";

const AllInstitutions: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [formData, setFormData] = useState({
    state: "",
    localGovt: "",
    ward: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="px-2">
      <div className="flex items-center justify-start gap-6 mb-8">
        <Link to="/app/instutitions">
          <Icon type="arrowBack" className="w-10 h-10" />
        </Link>
        <Typography variant={TypographyVariant.TITLE} className="font-semibold">
          View all institutions
        </Typography>{" "}
      </div>
      <div className="flex justify-between my-6">
        <div>
          <div className="flex items-center gap-2">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-dark_gray font-bold text-xl"
            >
              All institution
            </Typography>
            <span className="text-[#007A61] px-2 py-1 font-semibold bg-[#f1fffc] rounded-lg">
              1240
            </span>
          </div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-l_gray "
          >
            See recently added institution and keep track of their indicator
            ratings.{" "}
          </Typography>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center border rounded-lg">
            <HiOutlineSearch className="text-l_gray w-6 h-6 ml-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none ml-2"
            />
          </div>
          <Button
            text="Filters"
            bg_color="white"
            text_color="black"
            border_color="border-green-500"
            active={true}
            loading={false}
            icon={<Icon type="filterlines" className="" />}
            onClick={() => setIsModalOpen1(true)}
          />

          <Button
            text="Export"
            bg_color="#007A61"
            text_color="white"
            border_color="border-green-500"
            active={true}
            loading={false}
            icon={<Icon type="export" className="" />}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-2 mr-2 shadow py-3 rounded-lg px-2">
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-dark_gray font-semibold"
          >
            Acceptability of services
          </Typography>
        </div>
        <div className="flex items-center gap-2 mr-2 shadow py-3 rounded-lg px-2">
          <div className="w-6 h-6 bg-[#C379D6] rounded-full"></div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-dark_gray font-semibold"
          >
            Competency of health workers
          </Typography>
        </div>
        <div className="flex items-center gap-2 mr-2 shadow py-3 rounded-lg px-2">
          <div className="w-6 h-6 bg-[#9878E1] rounded-full"></div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-dark_gray font-semibold"
          >
            Privacy and confidentiality
          </Typography>
        </div>
        <div className="flex items-center gap-2 mr-2 shadow py-3 rounded-lg px-2">
          <div className="w-6 h-6 bg-[#DFAA54] rounded-full"></div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-dark_gray font-semibold"
          >
            Global assessment
          </Typography>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border-2 border-b-0 mt-8">
        <table className="min-w-full  rounded-t-xl">
          <thead>
            <tr className="text-[#667085] font-semibold text-left border-b-2 rounded-t-xl bg-[#F9FAFB]">
              <th className=" px-4 ">NO</th>
              <th className="px-4  ">Institute name</th>
              <th className="px-4  ">Address</th>
              <th className="px-4  ">Date registered</th>
              <th className="px-4  ">
                <Icon type="greensort" className="w-12 h-12 cursor-pointer" />
              </th>
              <th className="px-4  ">
                <Icon type="purplesort" className="w-12 h-12 cursor-pointer" />
              </th>
              <th className="px-4  ">
                <Icon type="yellowsort" className="w-12 h-12 cursor-pointer" />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recentInstitutions.map((institution, index) => (
              <tr key={institution.name} className="border-b-2 text-dark_gray">
                <td className=" px-4 py-4 items-center justify-center ">
                  {index + 1}
                </td>
                <td className=" px-4 py-4 ">
                  <div className="flex justify-center items-center gap-2">
                    <Icon type="quotient" className="w-12 h-12" />
                    <div>
                      <span className="block text-sm font-semibold">
                        {institution.name}
                      </span>
                      <span className="text-sm text-l_gray">
                        {institution.website}
                      </span>
                    </div>
                  </div>
                </td>
                <td className=" px-4 py-4 text-sm "> {institution.address}</td>
                <td className=" px-4 py-4 text-sm w-48"> {institution.date}</td>
                <td className=" px-4 py-4 ">
                  <CircularProgressbar
                    className="w-10 h-10"
                    value={institution.acceptancyRating}
                    text={`${institution.acceptancyRating}%`}
                    styles={{
                      path: {
                        stroke: "#64D158",
                      },
                      text: { fill: "#000", fontSize: "26px" },
                      trail: { stroke: "#d6d6d6" },
                    }}
                  />
                </td>
                <td className=" px-4 py-4 ">
                  <CircularProgressbar
                    className="w-10 h-10"
                    value={institution.privacyRating}
                    text={`${institution.privacyRating}%`}
                    styles={{
                      path: {
                        stroke: "#9878E1",
                      },
                      text: { fill: "#000", fontSize: "26px" },
                      trail: { stroke: "#d6d6d6" },
                    }}
                  />
                </td>
                <td className=" px-4 py-4 ">
                  <CircularProgressbar
                    className="w-10 h-10"
                    value={institution.globalRating}
                    text={`${institution.globalRating}%`}
                    styles={{
                      path: {
                        stroke: "#DFAA54",
                      },
                      text: { fill: "#000", fontSize: "26px" },
                      trail: { stroke: "#d6d6d6" },
                    }}
                  />
                </td>

                <td className=" px-4 py-4">
                  <div
                    onClick={() => navigate("/app/instutitions/view-institute")}
                  >
                    <Icon type="morevertical" className="mr-4 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal
        width="45%"
        height="65%"
        isOpen={isModalOpen1}
        onClose={() => setIsModalOpen1(false)}
      >
        <div className="flex flex-col  px-12 ">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-dark_gray font-semibold "
          >
            Filter
          </Typography>
          <div className="flex flex-col w-full">
            <div className="mt-5">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="state"
              >
                By State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select state</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add state options here */}
              </select>
            </div>

            <div className="mt-8">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="localGovt"
              >
                By Local government
              </label>
              <select
                name="localGovt"
                value={formData.localGovt}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select local govt</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add local govt options here */}
              </select>
            </div>

            <div className="mt-8">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="ward"
              >
                By Ward
              </label>
              <select
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select ward</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add ward options here */}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center my-8 gap-4 mx-auto">
            <Button
              text="Clear filter"
              bg_color="white"
              text_color="black"
              border_color="border-green-500"
              active={true}
              loading={false}
            />

            <Button
              text="Apply filter"
              bg_color="#007A61"
              text_color="white"
              border_color="border-green-500"
              active={true}
              loading={false}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AllInstitutions;
