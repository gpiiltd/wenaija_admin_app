import React, { FC, JSX, ReactNode } from "react";

interface Props {
  children: ReactNode;
  tooltip?: string;
  onClick?:() => void;
}

const Tooltip: FC<Props> = ({ children, tooltip,onClick }): JSX.Element => {
  return (
    <div className="group relative inline-block cursor-pointer" onClick={onClick}>
      {children}
      <span className="invisible group-hover:visible group-focus-within:visible absolute top-[-5px] right-3/12 transform -translate-x-1/2 transition bg-white p-3 text-black shadow-lg rounded-lg mt-2 max-w-xs w-max">
        {tooltip}
      </span>
    </div>
  );
};

export default Tooltip;
