import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavItemsProps } from "../interfaces/NavInterface";

const BottomNavBar: React.FC<NavItemsProps> = ({
  navItems,
  navigate,
  currentPath,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg px-4 py-2 flex items-center justify-around">
      {navItems.map((item, index) => (
        <button
          key={index}
          className="focus:outline-none mb-2 hover:text-yellow-500 text-center"
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
  );
};

export default BottomNavBar;
