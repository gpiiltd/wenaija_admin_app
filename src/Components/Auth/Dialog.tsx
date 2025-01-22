import React from 'react'
import { TypographyVariant } from '../types';
import Icon from '../../Assets/svgImages/Svg_icons_and_images';
import Typography from '../Typography';

interface DialogProps {
    isOpen: boolean;
    title: string;
    className: string;
    feedBackClassName: string;
    onClose: () => void;
    children: React.ReactNode;
}
const Dialog: React.FC<DialogProps> = ({
    isOpen,
    title,
    onClose,
    children,
    className,
    feedBackClassName,
}) => {
    if (!isOpen) return null;
    return (
        <div className={`dialog-backdrop bg-[#34405499] ${className || ''}`}>
          <div className="dialog-content">
            <header className="dialog-header">
            </header>
            <main className="flex items-center justify-center h-screen ">
              <div className={`p-10 flex flex-col bg-white rounded-lg ${feedBackClassName || ''}`}>
              <Icon type="adminDailogCheck" className="size-20" />
              <Typography variant={TypographyVariant.NORMAL} className="pt-5 pb-2 text-[16px] lg:text-[20px] font-bold text-[#101828]">
              Registration successful
            </Typography>
            <Typography variant={TypographyVariant.SMALL} className="text-center text-[14px] lg:text-[16px] mb-5 text-[#5E5959] font-light">
            Great Job! Kindly login in to access the dashboard.
            </Typography>

            <button className="bg-[#007A61] py-3 w-full rounded-lg mt-4 text-white text-sm font-normal" onClick={onClose}>Login</button>

              </div>
            </main>
            
          </div>
        </div>
      );
}

export default Dialog