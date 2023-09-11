import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";

interface NoDataFoundProps {
  message?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({ message }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-40 space-y-8">
      <FontAwesomeIcon
        icon={faFrownOpen}
        size="5x"
        className="text-yellow-500 animate-bounce"
      />
      <p className="text-white font-bold text-2xl">{message}</p>
      <p className="text-white italic">It's lonely in here... 🌵</p>
    </div>
  );
};

export default NoDataFound;
