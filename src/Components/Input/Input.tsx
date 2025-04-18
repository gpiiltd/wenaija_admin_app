import { useField } from 'formik'
import React, { useState } from 'react'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { TextInputProps, TypographyVariant } from '../types'
import Typography from '../Typography'

const InputField: React.FC<TextInputProps> = ({
  label,
  helperText,
  placeholder,
  icon,
  type,
  onClick,
  focusStyle,

  setFieldValue,
  setFieldTouched,
  ...props
}) => {
  const [field, meta] = useField(props.name)
  const [isFocused, setIsFocused] = useState(false)

  const handleBlur = () => {
    setFieldTouched!(props.name, true, false)
    setIsFocused(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFieldValue!(props.name, value)
    setFieldTouched!(props.name, true, false)
  }

  return (
    <div className="relative w-full">
      <label
        htmlFor={props.name}
        className={` text-base transition-all duration-200 ${
          field.value || meta.touched ? 'text-dark_gray' : 'text-dark_gray'
        }`}
        style={{ pointerEvents: 'none' }}
      >
        <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
          {label}
        </Typography>
      </label>
      <input
        type={type}
        className={`text-base font-normal py-2  block w-full flex justify-center items-center  px-2  border border-primary_color rounded-md shadow-sm focus:outline-none ${
          meta.touched && meta.error
            ? 'border-error focus:border-error focus:ring-error'
            : `focus:border-${focusStyle} focus:ring-${focusStyle}`
        }`}
        placeholder={placeholder}
        {...field}
        {...props}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        onChange={handleChange}
      />
      {meta.touched && meta.error && isFocused ? (
        <div className="w-full flex gap-1 items-center">
          <Icon type="error" className="pt-1" />

          <Typography
            variant={TypographyVariant.SMALL}
            className="text-error mt-1 text-left"
          >
            {meta.error}
          </Typography>
        </div>
      ) : (
        helperText &&
        !meta.error &&
        meta.touched &&
        isFocused && (
          <div className="flex gap-1 items-center">
            <Icon type="success" className="pt-1" />
            <div className="flex gap-2">
              <Typography
                variant={TypographyVariant.SMALL}
                className="mt-1 text-left text-green-700"
              >
                {helperText}
              </Typography>
            </div>
          </div>
        )
      )}
      <span className="absolute right-3 top-3 cursor-pointer" onClick={onClick}>
        {icon}
      </span>
    </div>
  )
}

export default InputField
