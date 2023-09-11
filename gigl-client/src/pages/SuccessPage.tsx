import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh } from "@fortawesome/free-solid-svg-icons"; // You can choose any playful icon

const SuccessPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800">
      <h2 className="font-bold text-yellow-500 mb-2 text-3xl">Success!</h2>
      <p className="text-white text-center font-semibold text-lg italic mb-4">
        Your joke has been added! Ready to make some people gigl? 😂
      </p>
      <FontAwesomeIcon
        icon={faLaugh}
        size="6x"
        className="text-yellow-500 mb-4"
      />
      <button
        onClick={() => window.history.back()}
        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default SuccessPage;
