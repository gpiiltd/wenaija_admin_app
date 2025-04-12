import React, { useEffect, useState } from "react";
import StatCard from "./StatsCard";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import CustomModal from "../Modal";
import { recentInstitutions, stats } from "./institutionData";
import routeNames from "../../Navigation/RouteNames";
import { useNavigate } from "react-router-dom";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import AddInstitution from "./AddInstitution";
import { AppDispatch, RootState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { triggerListAllInstitutions } from "../../features/institutions/institutionManagementThunk";
import { resetinstitutionState } from "../../features/institutions/institutionManagementSlice";
import {
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

const Institutions = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { institution } = useSelector(
    (state: RootState) => state.institutionManagement
  );

  useEffect(() => {
    dispatch(triggerListAllInstitutions({}));
  }, [dispatch]);

  useEffect(() => {
    if (institution.statusCode === 200 || institution.data) {
      console.log("INSTITUTIONS GOTTEN", JSON.stringify(institution.data));
    }
    if (institution.error && institution.message) {
      console.log("Error fetching INSTITUTIONS");
    }
    dispatch(resetinstitutionState());
  }, [
    dispatch,
    institution.data,
    institution.error,
    institution.message,
    institution.statusCode,
  ]);
  return (
    <div className="">
      <div className="mb-6">
        <Typography variant={TypographyVariant.TITLE} className="font-semibold">
          Institution
        </Typography>{" "}
        <Typography
          variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
          className="text-dark_gray"
        >
          Manage medical facilities
        </Typography>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50">
          <Icon type="upload" className="w-6 h-6" />
          Bulk Upload
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
        >
          <Icon type="plus" className="w-6 h-6" />
          Add institution
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="cursor-pointer"
          onClick={() => navigate(routeNames.allInstitutions)}
        >
          <StatCard
            title="Total listed Institution"
            value={1234}
            icon="total"
          />
        </div>
        {stats.map((stat: any, index: any) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mb-6">
        <Typography
          variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
          className="font-semibold text-lg mb-4"
        >
          Recently added institution
        </Typography>
        {Array.isArray(institution?.data?.results) &&
  institution.data.results.map((institution: any, index: number) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 border mb-4 cursor-pointer"
            onClick={() => {
              navigate(
                `/app/instutitions/view-institute/${institution.identifier}`
              );
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Icon type="quotient" className="w-fit" />
              <h4 className="text-lg font-semibold">{institution.name}</h4>
            </div>

            <div className="grid grid-cols-1 lg:hidden">
              <div className="flex items-center gap-2 text-gray-600">
                <HiOutlineLocationMarker className="text-[#007A61]" />
                <span>{institution.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <HiOutlinePhone className="text-[#007A61] mt-1" />
                <span>{institution.mobile_number}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <HiOutlineClock className="text-[#007A61]" />
                <span>{institution.operation_days}</span>
                <span>{`(${institution.opening_time} - ${institution.closing_time})`}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <HiOutlineMail className="text-[#007A61] mt-1" />
                <span>{institution.email}</span>
              </div>
            </div>

            {/* large screen display */}
            <div className="lg:flex hidden">
              <div className="w-1/2">
                <div className="flex items-center gap-2 text-gray-600">
                  <HiOutlineLocationMarker className="text-[#007A61]" />
                  <span>{institution.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <HiOutlineClock className="text-[#007A61] mt-1" />
                  <span>{institution.operation_days}</span>
                  <span>{`(${institution.opening_time} - ${institution.closing_time})`}</span>
                </div>
              </div>

              <div className="mx-10 lg:mx-20">
                <div className="hidden md:block md:col-span-1 md:border-l md:border-gray-300 md:h-full md:mx-4"></div>
              </div>

              <div className="w-1/2">
                <div className="flex items-center gap-2 text-gray-600">
                  <HiOutlinePhone className="text-[#007A61]" />
                  <span>{institution.mobile_number}</span>
                </div>{" "}
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <HiOutlineMail className="text-[#007A61]" />
                  <span>{institution.email}</span>
                </div>{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-32">
        <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <AddInstitution onClose={() => setShowModal(false)} />
        </CustomModal>
      </div>
    </div>
  );
};

export default Institutions;
