import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaughSquint } from "@fortawesome/free-solid-svg-icons";
import { formatElapsedTime } from "../../utils/formatElapsedTime";
import { gigl } from "../../api/gigl";

interface JokeCardProps {
  id: string;
  username: string;
  title: string;
  content: string;
  profileImage: string;
  timestamp: string;
  gigls: number;
}

const JokeCard: React.FC<JokeCardProps> = ({
  id,
  username,
  title,
  content,
  profileImage,
  timestamp,
  gigls,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  let [giglsState, setGiglsState] = useState(gigls);

  const storedKey = localStorage.getItem("jwtToken");

  const comedianLikesJoke = {
    comedianId: "",
    jokeId: id,
  };

  useEffect(() => {
    if (storedKey !== "" && storedKey !== null) {
      gigl
        .post(`/IsAJokeGigledByUser?token=${storedKey}`, comedianLikesJoke)
        .then((res) => {
          setIsClicked(!res.data);
        });
    }
  }, [storedKey]);

  const addGigl = () => {
    gigl
      .post(`/LikeAJoke?token=${storedKey}`, comedianLikesJoke)
      .then((res) => {
        if (res.data === true) {
          setGiglsState(giglsState + 1);
          setIsClicked(true);
        } else {
          setGiglsState(giglsState - 1);
          setIsClicked(false);
        }
      });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out">
      <div className="flex items-start space-x-3">
        <img
          src={profileImage}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-yellow-200"
        />
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold text-yellow-500 mr-2">{username}</span>
            <span className="text-gray-400 text-sm">
              {formatElapsedTime(timestamp)}
            </span>
          </div>
          <h3 className="mt-1 font-bold text-white">{title}</h3>
          {/* Title */}
          <p className="mt-2 text-gray-300">{content}</p>
          <div className="mt-3 flex justify-end items-center text-gray-500 space-x-3">
            <button className="flex items-center space-x-1" onClick={addGigl}>
              <FontAwesomeIcon
                icon={faFaceLaughSquint}
                className={`w-6 h-6 ${
                  isClicked ? "text-yellow-500" : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm ${
                  isClicked ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                {giglsState}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
