import React, { useState } from "react";
import { recentInstitutions, stats } from "./InstitutionData";
import InstitutionCard from "./InstitutionCard";
import StatCard from "./StatsCard";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import CustomModal from "../Modal";
import AddInstitution from "./AddInstitution";
import OperationHours from "./OperationHours";

const Institutions = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Institution</h1>
        <p className="text-gray-600">Manage medical facilities</p>
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
        {stats.map((stat: any, index: any) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Recently added institution
        </h2>
        {recentInstitutions.map((institution, index) => (
          <InstitutionCard key={index} {...institution} />
        ))}
      </div>
      <div className="mt-32">
        <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
          {/* <AddInstitution /> */}
          <OperationHours />
        </CustomModal>
      </div>
    </div>
  );
};

export default Institutions;
