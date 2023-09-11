import React, { useEffect, useState } from "react";
import { gigl } from "../api/gigl";
import JokesFeed from "../components/FeedComponents/JokesFeed";
import JoinModal from "../components/JoinModalComponents/JoinModal";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    username: "",
    profileImage: "",
  });

  const storedKey = localStorage.getItem("jwtToken");

  const [jokes, setJokes] = useState<[]>([]);

  useEffect(() => {
    if (storedKey !== "" && storedKey !== null) {
      gigl
        .get(`/ShowProfile?token=${storedKey}`)
        .then((res) => setProfile(res.data));
    }
  }, [storedKey]);

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="flex flex-col items-center">
        <img
          src={profile.profileImage}
          alt="User Profile"
          className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 rounded-full border-4 border-yellow-200 mb-4"
        />
        <span className="text-yellow-500 text-xl md:text-2xl lg:text-4xl font-bold mb-8">
          {profile.username}
        </span>
      </div>

      <div className="my-4 px-4 sm:px-6 lg:px-0 max-w-screen-lg mx-auto">
        <JokesFeed endpoint={`/ShowUsersJokes?token=${storedKey}`} />
      </div>
      <JoinModal path="profile" />
    </div>
  );
};

export default ProfilePage;
