import React from 'react';

interface ArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

export const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={`${className} absolute left-0 z-10 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full shadow-md cursor-pointer`}
    style={{ ...style, display: 'block', background: "red"}}
    onClick={onClick}
  >
    &#10094;bnbbb {/* Left arrow symbol */}
  </div>
);

export const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={`${className} absolute right-0 z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md cursor-pointer`}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  >
    &#10095; {/* Right arrow symbol */}
  </div>
);
