import React, { useEffect, useState } from "react";
import AuthPages from "../Components/AuthPages";
import { useNavigate } from "react-router-dom";
import Typography from "../Components/Typography";
import { TypographyVariant } from "../Components/types";
import { AppDispatch, RootState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import showCustomToast from "../Components/CustomToast";
import { toast, ToastContainer } from "react-toastify";
import { triggerEmailVerification } from "../features/auth/authThunks";
import { resetState } from "../features/auth/authSlice";
import Button from "../Components/Button";

const AuthPinNewUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [count, setCount] = useState(30);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState<string[]>(new Array(6).fill(""));
  const { error, message, loading, statusCode } = useSelector(
    (state: RootState) => state.auth,
  );

  const getUserEmail = () => {
    let userEmail =
      localStorage.getItem("nssf_user_email") !== "null"
        ? JSON.parse(localStorage.getItem("nssf_user_email") as string)
        : null;
    if (userEmail) {
      setEmail(userEmail);
    }
  };
  const handleChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value.slice(0, 1);
    setPin(newPin);

    if (value && index < pin.length - 1) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };
  const handleBackspace = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const navigate = useNavigate();

  const handleEmailVerification = () => {
    const pinValue = pin.join("");
    console.log("Email:", email);
    console.log("Pin Value:", pinValue);
    console.log("Pin Value Length:", pinValue.length);
    console.log("Is Pin Value Numeric:", !isNaN(Number(pinValue)));

    if (pinValue.length === 6 && !isNaN(Number(pinValue))) {
      const payload = {
        email: email,
        otp: pinValue,
      };
      dispatch(triggerEmailVerification(payload));
    } else {
      console.error("Invalid pin format");
    }
  };

  useEffect(() => {
    if (count <= 0) return; // Stop at 0

    const timer = setInterval(() => {
      setCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrease count every second
    }, 1000);

    return () => clearInterval(timer); // Cleanup function
  }, [count]);

  const formattedCount = `0:${count.toString().padStart(2, "0")}`;

  useEffect(() => {
    getUserEmail();
    console.log("STATUS_CODE_COMPONENT", statusCode);
    if (!error && statusCode === 200) {
      showCustomToast("Success", message);
      setTimeout(() => {
        navigate("/createpassword");
      }, 2000);
    } else if (error && message) {
      toast.error(message);
    }
    dispatch(resetState());
  }, [error, statusCode, message, navigate, dispatch]);

  return (
    <div>
      <ToastContainer />

      <AuthPages>
        <div className="flex flex-col items-center justify-center">
          <div className="text-center w-full">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-2xl font-bold mb-2"
            >
              Check your email
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-600 text-md"
            >
              Enter OTP sent to your email
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-md font-medium text-[#007A61]"
            >
              “{email}”
            </Typography>
          </div>
          <div className="flex space-x-2 mt-6">
            {pin.map((_, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="text"
                value={pin[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 text-center text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007A61]"
                maxLength={1}
              />
            ))}
          </div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-gray-600 text-sm mt-10 mb-2"
          >
            Didn’t receive a code?
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-black text-sm"
          >
            Re-send code via SMS ({formattedCount})
          </Typography>
          <Button
            text="Submit"
            active={pin.every((digit) => digit !== "")}
            bg_color="#007A61"
            text_color="white"
            loading={loading}
            onClick={handleEmailVerification}
          />
        </div>
      </AuthPages>
    </div>
  );
};

export default AuthPinNewUser;
