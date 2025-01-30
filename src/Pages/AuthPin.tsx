import React, { useEffect, useState } from "react";
import AuthPages from "../Components/AuthPages";
import Dialog from "../Components/Auth/Dialog";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthenticationPin {
  email?: string;
}

const AuthenticationPin: React.FC = () => {
  const location = useLocation();
  const [count, setCount] = useState(30);
  const state = location.state as AuthenticationPin;
  const email = state?.email || "";

  const [pin, setPin] = useState<string[]>(new Array(6).fill(""));

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const openDialog = () => setIsDialogOpen(true);

  const handleButton = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleCreatePassword = () => {
    setTimeout(() => {
      navigate("/createpassword");
    }, 1000);
  };

  useEffect(() => {
    if (count <= 0) return; // Stop at 0

    const timer = setInterval(() => {
      setCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrease count every second
    }, 1000);

    return () => clearInterval(timer); // Cleanup function
  }, [count]);

  const formattedCount = `0:${count.toString().padStart(2, "0")}`;

  return (
    <div className="w-full">
      {email ? (
        <div>
          <AuthPages>
            <div className="flex flex-col items-center justify-center">
              <div className="text-center w-full">
                <h1 className="text-2xl font-bold mb-2">Check your email</h1>
                <p className="text-gray-600 text-md">
                  Enter OTP send to your email
                </p>
                <p className="text-md font-medium text-[#007A61]">“{email}”</p>
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
                    className="w-12 h-12 text-center text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    maxLength={1}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-10 mb-2">
                Didn’t receive a code?
              </p>
              <p className="text-black text-sm">
                Re-send code via SMS ({formattedCount})
              </p>
              <button
                onClick={handleCreatePassword}
                className="bg-[#007A61] py-3 w-full rounded-lg mt-10 text-white text-sm font-normal"
              >
                Submit
              </button>
            </div>
          </AuthPages>
        </div>
      ) : (
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
            <p>This is a reusable dialog component!</p>
          </Dialog>
          <AuthPages>
            <div className="flex flex-col items-center justify-center">
              <div className="text-center w-full">
                <h1 className="text-2xl font-bold mb-2">
                  Create authentication pin
                </h1>
                <p className="text-gray-600">
                  Kindly set up your 6-digit security code to continue with your
                  registration
                </p>
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
                    className="w-12 h-12 text-center text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    maxLength={1}
                  />
                ))}
              </div>
              <button
                onClick={openDialog}
                className="bg-[#007A61] py-3 w-full rounded-lg mt-10 text-white text-sm font-normal"
              >
                Submit
              </button>
            </div>
          </AuthPages>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPin;
