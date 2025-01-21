import React, { useState} from 'react'
import { TypographyVariant } from '../Components/types';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from '../Components/Input/Input';
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthPages from '../Components/AuthPages';
import Typography from '../Components/Typography';
import InputField from '../Components/Input/Input';
import Button from '../Components/Button';


const Login = () => {
  
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate(); 


  const initialValues = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
    password: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters").trim(),
  });


  const handleLogin = () => {
setLoading(!loading);
setTimeout(() => {
  setLoading(false);
  navigate("/signup"); 
},3000)

  }

  return (
    <AuthPages>
    <div className="w-full">
    <Typography
        variant={TypographyVariant.SUBTITLE}
        className="text-black font-bold text-2xl flex flex-col items-center mb-2"
      >
        Login
      </Typography>
      <Typography
        variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
        className="text-[#5E5959] font-light flex flex-col items-center"
      >
        Kindly fill in your email address
      </Typography>
      <div className="pt-8">
        <Formik
          initialValues={initialValues}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values) => {
            console.log("Form values:", values);
          }}
          validationSchema={validationSchema}
        >
          {({ isValid, dirty }) => (
            <Form>
              
               <InputField
          label=""
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
        />
             {/* Password Input */}
        <div className="mt-8">
          <InputField
            label=""
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
          />
        </div>
        <a>
        <Typography
        variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
        className="  text-[#ED7D31] font-light text-sm  flex flex-col items-end mt-3"
      >
        Forgot password? 
      </Typography>
        </a>
                

       <Button 
       label='Login'
        handleLogin={handleLogin}
        loading={loading}
        disabled={isValid && dirty}
       />
            </Form>
          )}
        </Formik>
        <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
          <Typography variant={TypographyVariant.NORMAL} className="text-[#5E5959] font-light">
            Don't have an account?
          </Typography>
          <Link to="/">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-orange font-extrabold cursor-pointer"
            >
              Sign Up
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  </AuthPages>
  )
}

export default Login
