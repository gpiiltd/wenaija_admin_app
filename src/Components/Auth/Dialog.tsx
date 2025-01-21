
import React, { useState } from 'react'
import { TypographyVariant } from '../types';
import Icon from '../../Assets/svgImages/Svg_icons_and_images';
import Typography from '../Typography';
import { useNavigate } from 'react-router-dom';


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

  const [loading,setLoading] = useState(false);



    if (!isOpen) return null;

   
   

    return (
        <div className={`dialog-backdrop bg-[#34405499] ${className || ''}`}>
          <div className="dialog-content">
            <header className="dialog-header">
              {/* <h2>{title}</h2>
              <button onClick={onClose} className="close-button" aria-label="Close dialog">
                ×
              </button> */}
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
            

            {/* <Button
                border_color='bg-transparent'
                text="Yes, I’m sure"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={false}
                onClick={undefined}
                
              /> */}

            <button className="bg-[#007A61] py-3 w-full rounded-lg mt-4 text-white text-sm font-normal" onClick={onClose}>Login</button>

              </div>
            </main>
            
          </div>
        </div>
      );
}

export default Dialog