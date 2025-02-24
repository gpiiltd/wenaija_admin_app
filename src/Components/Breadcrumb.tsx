import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

const breadcrumbRoutes: Record<string, string> = {
  "/app/users": "User",
  "/app/users/validate-kyc": "Validate KYC",
  "/app/users/profile": "Profile",
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  let currentPath = "";

  return (
    <nav className="flex items-center text-sm">
      {pathSegments.map((segment, index) => {
        currentPath += `/${segment}`;
        const label = breadcrumbRoutes[currentPath];

        if (!label) return null; 

        const isActive = index === pathSegments.length - 1;

        return (
          <React.Fragment key={currentPath}>
            {index > 1 && ( 
              <MdArrowForwardIos className="text-gray-400 mx-2 text-xs" />
            )}
            {isActive ? (
              <span className="text-primary_green font-semibold">{label}</span>
            ) : (
              <Link to={currentPath} className="text-gray-500 hover:text-Primary_green">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
