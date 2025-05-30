import React from "react";
import { Link } from "react-router-dom";

const Header = ({
  title = "Dashboard",
  subtitle = "",
  link = "/",
  icon = "bi bi-house-door",
  link_text = "Go Back",
}) => {
  return (
    <header className=" top-0 z-40 bg-white shadow-sm border-b px-4 md:px-8 py-3">
      <div className="flex items-center justify-between">
        
        {/* Left: Icon + Title */}
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <i className={`${icon} text-xl`} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={link}
            // className="inline-flex items-center gap-2 text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all "
          >
            <i className="bi bi-arrow-left" />
            {link_text}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
