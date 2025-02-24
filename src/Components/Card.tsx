import React, { FC } from "react";
import { CardProps } from "./types";

const Card: FC<CardProps> = ({
  children,
  width,
  height,
  className
}) => {
  return (
    <div
    className={`bg-white overflow-y-auto ${className || ""}`}
    style={{
      width: width,
      height: height,
      border: '1px solid #EEEEEEEE',  
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', 
      borderRadius: '6px',
      
    }}
  >
    {children}
  </div>
  );
};

export default Card;
