import React, { useEffect, useState } from "react";
import AuthPages from "../Components/AuthPages";
import Dialog from "../Components/Auth/Dialog";
import { useNavigate } from "react-router-dom";
import Typography from "../Components/Typography";
import { TypographyVariant } from "../Components/types";
import { AppDispatch, RootState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import showCustomToast from "../Components/CustomToast";
import { toast, ToastContainer } from "react-toastify";
import { triggerAuth } from "../features/auth/authThunks";
import { resetState } from "../features/auth/authSlice";
import Button from "../Components/Button";


const Auth: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [count, setCount] = useState(30);
  const [pin, setPin] = useState<string[]>(new Array(6).fill(""));
  const { error, message, loading, statusCode } = useSelector(
    (state: RootState) => state.auth,
  );

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

  const [isDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleButton = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleAuth = () => {
    const payload = {
      pin: pin.join(""),
    };
    console.log("PAYLOAD", payload);
    dispatch(triggerAuth(payload));
  };

  useEffect(() => {
    if (count <= 0) return; // Stop at 0
    const timer = setInterval(() => {
      setCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrease count every second
    }, 1000);
    return () => clearInterval(timer); // Cleanup function
  }, [count]);

  useEffect(() => {
    if (!error && statusCode === 200) {
      showCustomToast("Success", message);
      setTimeout(() => {
        navigate("/app/dashboard");
      }, 2000);
    } else if (error && message) {
      toast.error(message);
    }
    dispatch(resetState());
  }, [error, statusCode, message, navigate, dispatch]);

  return (
    <div className="w-full">
      <ToastContainer />
      <div>
        <Dialog
          isOpen={isDialogOpen}
          onClose={handleButton}
          title="Registration successful"
          subText="Great Job! Kindly login in to access the dashboard."
          buttonTitle="Login"
          className="absolute w-full bg-[#34405499]"
          feedBackClassName="w-[373px] lg:w-[573px] flex items-center justify-center"
        >
          <Typography variant={TypographyVariant.NORMAL}>
            This is a reusable dialog component!
          </Typography>
        </Dialog>
        <AuthPages>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <Typography
                variant={TypographyVariant.TITLE}
                className="text-2xl font-bold mb-2"
              >
                Enter authentication pin
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-gray-600"
              >
                Kindly enter your 6 digit security code to continue to dashboard
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
            <div className="mt-4 w-full">
              <Button
                text="Submit"
                active={pin.every((digit) => digit !== "")}
                bg_color="#007A61"
                text_color="white"
                loading={loading}
                onClick={handleAuth}
              />
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-gray-600  pt-3 text-center"
              >
                Can’t remember your security code?{" "}
                <span
                  className="text-orange ml-1 font-bold cursor-pointer"
                  onClick={() => navigate("/forgotPassword")}
                >
                  Forgot password
                </span>
              </Typography>
            </div>
          </div>
        </AuthPages>
      </div>
    </div>
  );
};

export default Auth;
