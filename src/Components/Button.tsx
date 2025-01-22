import React from 'react';
import Spinner from '../Assets/svgImages/Spinner.svg';

interface ButtonProps {
    handleLogin: () => void;
    label: string;
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ handleLogin, label, loading = true, disabled}) => {
    return (
        <button
  onClick={handleLogin}
  disabled={disabled || loading}
  className={`${
    disabled ? "bg-[#007A61]/50 cursor-not-allowed" : "bg-[#007A61]"
  } py-3 w-full rounded-lg mt-5 text-white text-md font-normal flex items-center justify-center`}
>
  {loading ? (
    <div className="flex items-center justify-center">
      <img
        src={Spinner}
        className="h-[30px] w-[30px]"
        alt="Loading spinner"
      />
    </div>
  ) : (
    label
  )}
</button>

                
    )
};

export default Button;