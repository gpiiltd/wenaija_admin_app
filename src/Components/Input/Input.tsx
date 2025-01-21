import React, { useState } from "react";
import { useField } from "formik";
import { TextInputProps, TypographyVariant } from "../types";
import Typography from "../Typography";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// const InputField: React.FC<TextInputProps> = ({
//   label,
//   helperText,
//   placeholder,
//   icon,
//   type,
//   onClick,
//   focusStyle,
//   setFieldValue,
//   setFieldTouched,
//   ...props
// }) => {
//   const [field, meta] = useField(props.name);
//   const [isFocused, setIsFocused] = useState(false);

//   const handleBlur = () => {
//     setFieldTouched!(props.name, true, false);
//     setIsFocused(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setFieldValue!(props.name, value);
//     setFieldTouched!(props.name, true, false);
//   };

//   return (
//     <div className="relative w-full">
//       <label
//         htmlFor={props.name}
//         className={` text-base transition-all duration-200 ${
//           field.value || meta.touched ? "text-dark_gray" : "text-dark_gray"
//         }`}
//         style={{ pointerEvents: "none" }}
//       >
//         <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
//           {label}
//         </Typography>
//       </label>
//       <input
//         type={type}
//         className={`text-base font-normal py-2  block w-full flex justify-center items-center  px-2  border border-primary_color rounded-md shadow-sm focus:outline-none ${
//           meta.touched && meta.error
//             ? "border-error focus:border-error focus:ring-error"
//             : `focus:border-${focusStyle} focus:ring-${focusStyle}`
//         }`}
//         placeholder={placeholder}
//         {...field}
//         {...props}
//         onBlur={handleBlur}
//         onFocus={() => setIsFocused(true)}
//         onChange={handleChange}
//       />
// {meta.touched && meta.error && isFocused ? (
//   <div className="w-full md:w-[350px] lg:w-[500px] overflow-hidden flex gap-1 items-center">
//           <Icon type="error" className="pt-1" />

//     <Typography
//       variant={TypographyVariant.SMALL}
//       className="text-error mt-1 text-left"
//     >
//       {meta.error}
//     </Typography>
//   </div>
// ) : (
//   helperText &&
//   !meta.error &&
//   meta.touched &&
//   isFocused && (
//     <div className="flex gap-1 items-center">
//       <Icon type="success" className="pt-1" />
//       <div className="flex gap-2">
//         <Typography
//           variant={TypographyVariant.SMALL}
//           className="mt-1 text-left text-green-700"
//         >
//           {helperText}
//         </Typography>
//       </div>
//     </div>
//   )
// )}
//       <span className="absolute right-3 top-9 cursor-pointer" onClick={onClick}>
//         {icon}
//       </span>
//     </div>
//   );
// };

// export default InputField;







interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  type?: "text" | "password" | "email";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  helperText,
  error,
  disabled = false,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordField = type === "password";

  return (
    <div className="w-full relative">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPasswordField && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`block w-full px-3 py-2 text-base font-light border rounded-md shadow-sm focus:outline-none ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-primary focus:border-primary"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        />

        {/* Eye Icon for Password Toggle */}
        {isPasswordField && (
          <span
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <FaRegEye />
            ) : (
              <FaRegEyeSlash />
            )}
          </span>
        )}
      </div>

      {/* Helper Text or Error Message */}
      {error ? (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      ) : (
        helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;


