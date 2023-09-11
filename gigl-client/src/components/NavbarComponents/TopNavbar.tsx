import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavItemsProps } from "../interfaces/NavInterface";

const TopNavbar: React.FC<NavItemsProps> = ({
  navItems,
  navigate,
  currentPath,
}) => {
  return (
    <div className="top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 shadow-lg px-4 py-2 flex items-center justify-between lg:px-8">
      <div className="text-white font-bold text-xl mx-24">GIGL</div>
      <div className="flex space-x-6 mx-24">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="focus:outline-none hover:text-yellow-500 text-center"
            onClick={() => navigate(item.to)}
          >
            {item.imageIcon ? (
              <img
                src={item.imageIcon}
                alt={item.label}
                className="w-6 h-6 rounded-full border-2 border-yellow-500 mb-1 mx-auto"
              />
            ) : item.icon ? (
              <FontAwesomeIcon
                icon={item.icon}
                className={`text-xl mb-1 ${
                  currentPath === item.to ? "text-yellow-500" : item.color
                }`}
              />
            ) : null}
            <span
              className={`block text-xs ${
                currentPath === item.to ? "text-white" : item.color
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopNavbar;
