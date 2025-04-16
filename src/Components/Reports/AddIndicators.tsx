import React, { useEffect, useState } from "react";
import ReportDialog from "./ReportDialogs";
import Button from "../Button";
import { AppDispatch, RootState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerCreateIndicators,
  triggerGetACategory,
  triggerGetCategories,
} from "../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk";
import {
  resetCategoriesState,
  resetCreateIndicatorsState,
} from "../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice";
import showCustomToast from "../CustomToast";
import { toast } from "react-toastify";

interface AddIndicatorProps {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}

interface Indicator {
  id: number;
  name: string;
}

interface Category {
  identifier: string;
  name: string;
  category_type: string;
  description: string;
  created_at: string;
  indicator_count: number;
}

interface Indicator {
  identifier: string;
  name: string;
  description: string;
  total_sp: number;
  question_count: number;
}

const AddIndicator: React.FC<AddIndicatorProps> = ({
  isOpen: externalIsOpen,
  setIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const [selectedIndicatorId, setSelectedIndicatorId] = useState("");
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [description, setDescription] = useState("");
  const isOpen = externalIsOpen ?? internalIsOpen;
  const setIsOpenState = setIsOpen ?? setInternalIsOpen;
  const dispatch: AppDispatch = useDispatch();
  const { categories, createIndicators, category } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  );
  console.log("category name", selectedCategoryName);
  //CRAETE INDICATORS
  const handleCreateIndicator = () => {
    if (!selectedCategoryName || !description || !selectedIndicatorId) {
      toast.error("fields not filled");
      return;
    }
    const payload = {
      name: selectedCategoryName,
      description: description,
      category_identifier: selectedIndicatorId,
    };
    console.log('Paload',payload)
    dispatch(triggerCreateIndicators(payload));
  };
  useEffect(() => {
    if (createIndicators.statusCode === 201 && createIndicators.data) {
      showCustomToast("Success", `${createIndicators.message}`);
      console.log(
        "CATEGORY DISPATCHED",
        JSON.stringify(createIndicators.data.results)
      );
      setTimeout(() => {
        setIsOpenState(false);
      }, 2000);
    }
    if (createIndicators.error && createIndicators.message !== "") {
      console.log("Error creating category");
      const fieldErrors = createIndicators.data?.name;
      const detailedError = Array.isArray(fieldErrors) ? fieldErrors[0] : "";
      toast.error(
        `${createIndicators.message}${
          detailedError ? `: ${detailedError}` : ""
        }`
      );
      setTimeout(() => {
        setIsOpenState(false);
      }, 2000);
    }
    dispatch(resetCreateIndicatorsState());
  }, [
    createIndicators.data,
    createIndicators.error,
    createIndicators.message,
    createIndicators.statusCode,
    dispatch,
    setIsOpenState,
  ]);

  //GET CATEGORIES
  useEffect(() => {
    dispatch(triggerGetCategories({}));
  }, [dispatch]);

  useEffect(() => {
    if (categories.statusCode === 200 || categories.data) {
      if (Array.isArray(categories.data)) {
        setAllCategories(categories.data);
      } else {
        console.error("categories.data is not an array:", categories.data);
      }
    }
    if (categories.error && categories.message !== "") {
      console.log("Error fetching ALL INSTITUTIONS");
    }
    dispatch(resetCategoriesState());
  }, [
    dispatch,
    categories.data,
    categories.error,
    categories.message,
    categories.statusCode,
  ]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = allCategories.find(
      (category) => category.name === e.target.value
    );
    setSelectedCategoryId(selectedCategory ? selectedCategory.identifier : "");
    setSelectedCategoryName(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  //Get a category
  useEffect(() => {
    if (selectedCategoryId && selectedCategoryId !== "") {
      dispatch(triggerGetACategory(selectedCategoryId));
    }
  }, [dispatch, selectedCategoryId]);

  useEffect(() => {
    if (category.statusCode === 200 || category.data) {
      console.log("Category Seen", category.data);
      setIndicators(category.data.indicators);
    }
    if (category.error && category.message) {
      console.log("Error fetching Category");
    }
  }, [category.statusCode, category.message, category.data, category.error]);
  const handleIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndicator = indicators.find(
      (indicator) => indicator.name === e.target.value
    );
    setSelectedIndicatorId(
      selectedIndicator ? selectedIndicator.identifier : ""
    );
  };

  return (
    <>
      <ReportDialog
        title="Add Indicator"
        isOpen={isOpen}
        onClose={() => setIsOpenState(false)}
      >
        <form className="flex flex-col gap-4">
          {/* Select Category Dropdown */}
          <div>
            <label className="block text-sm font-normal">Select Category</label>
            <select
              className="border rounded w-full p-2 mt-1"
              onChange={handleCategoryChange}
            >
              <option value="">Select category</option>
              {allCategories?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Indicator Dropdown (Filtered by Category) */}
          <div>
            <label className="block text-sm font-normal">Indicator Name</label>
            <select
              className="border rounded w-full p-2 mt-1"
              onChange={handleIndicatorChange}
            >
              <option value="">Select Indicator name</option>
              {indicators &&
                indicators.map((indicator, index) => (
                  <option key={index} value={indicator.name}>
                    {indicator.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-normal">Description</label>
            <textarea
              placeholder="Write description here"
              className="border rounded w-full p-2 mt-1"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <div className="w-[7rem] mr-2">
              <Button
                text="Cancel"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="black"
                loading={false}
                onClick={() => setIsOpenState(false)}
              />
            </div>

            <div className="w-[7rem]">
              <Button
                text="Submit"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={createIndicators.loading}
                onClick={handleCreateIndicator}
              />
            </div>
          </div>
        </form>
      </ReportDialog>
    </>
  );
};

export default AddIndicator;
