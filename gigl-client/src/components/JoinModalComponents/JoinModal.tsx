import React, { useEffect, useState } from "react";
import { gigl } from "../../api/gigl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { generateRandomAvatarUrl } from "../../utils/generateRandomAvatarUrl";

interface JoinModalProps {
  path: string;
}

const JoinModal: React.FC<JoinModalProps> = ({ path }) => {
  let message = "";

  switch (path) {
    case "gigled":
      message =
        "Empty favorites? 🤨 Join Gigl! Collect jokes that make you LOL and fill your laughter chest. 😂💼 Sign up now!";
      break;
    case "create":
      message =
        "Got a joke? 🎤 Become a Gigl-er first! 🚀 Join our 🤣 community and spread the giggles. Ready, set, gigl! 🚀😂";
      break;
    case "profile":
      message =
        "Empty profile? 🤔 Share jokes on Gigl, get laughs, and shine! 😂🌟 Sign up and showcase your humor!";
      break;
    default:
      message =
        "Ready to gigl? 🎉 Join us, share jokes, and gigl on! 😂🤝 #FunLovingGigl";
  }

  const [username, setUsername] = useState("");
  const [randomAvatar, setRandomAvatar] = useState(generateRandomAvatarUrl());
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    const checkToken = () => {
      const storedKey = localStorage.getItem("jwtToken");

      if (!storedKey || storedKey === "") {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    // Call immediately on component mount
    checkToken();

    // Set up interval to call the function every 5 minutes
    const intervalId = setInterval(checkToken, 5 * 60 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    setErrorMessage("");
  };

  const registerUser = () => {
    const user = {
      username: username,
      profileImage: randomAvatar,
    };
    gigl
      .post("CreateComedian", user)
      .then((res) => {
        localStorage.setItem("jwtToken", res.data);
        closePopup();
        window.location.reload();
      })
      .catch((error) => setErrorMessage(error.response.data));
  };

  return (
    <div className="relative z-10">
      {showPopup && (
        <div className="fixed inset-0 flex items-end justify-center backdrop-blur-md transition-all duration-300 ease-in-out sm:items-center">
          <button
            className="absolute top-4 right-4 text-white text-4xl hidden sm:block" // Visible on big screens
            onClick={closePopup}
          >
            &times;
          </button>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform duration-300 ease-in-out animate-slideIn w-full h-3/4 sm:max-w-md sm:h-auto relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl sm:hidden" // Visible on smaller screens
              onClick={closePopup}
            >
              &times;
            </button>
            <h2 className="font-bold text-yellow-500 mb-2">Join!</h2>
            <p className="text-white text-center font-semibold text-lg italic mb-4">
              {message}
            </p>
            <div className="flex flex-col justify-center items-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 mb-4">
                <img
                  src={randomAvatar}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                className="bg-gray-900 p-2 rounded text-white w-24 hover:bg-gray-700 focus:outline-none"
                onClick={() => setRandomAvatar(generateRandomAvatarUrl())}
              >
                <FontAwesomeIcon icon={faRepeat} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Username"
              className="bg-gray-700 p-2 w-full rounded text-gray-300 mb-4 focus:outline-none"
              onChange={onInputChange}
            />
            <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            <button
              className="bg-yellow-500 text-white p-2 w-full rounded"
              onClick={registerUser}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          .backdrop-blur-md {
            backdrop-filter: blur(20px);
          }
          .animate-slideIn {
            animation: slideIn 0.5s forwards;
          }
          @keyframes slideIn {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default JoinModal;
