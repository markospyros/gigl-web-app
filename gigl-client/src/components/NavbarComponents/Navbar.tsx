import React, { useEffect, useState } from "react";
import BottomNavBar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import {
  faFire,
  faPlus,
  faBell,
  faUser,
  faFaceLaughSquint,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem } from "../interfaces/NavInterface";
import { useLocation, useNavigate } from "react-router-dom";
import { gigl } from "../../api/gigl";

interface Profile {
  username: string;
  profileImage: string;
}

const NavBar: React.FC = () => {
  const [profile, setProfile] = useState<Profile>();

  const storedKey = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (storedKey) {
      gigl
        .get(`/ShowProfile?token=${storedKey}`)
        .then((res) => setProfile(res.data))
        .catch((error) => console.error("Failed to fetch profile:", error));
    }
  }, [storedKey]);

  const navItems: NavItem[] = [
    {
      icon: faFire,
      label: "Trending",
      color: "text-gray-400",
      textColor: "text-gray-400",
      to: "/",
    },
    {
      icon: faFaceLaughSquint,
      label: "Gigled",
      color: "text-gray-400",
      textColor: "text-gray-400",
      to: "/gigled",
    },
    {
      icon: faPlus,
      label: "Create",
      color: "text-gray-400",
      textColor: "text-gray-400",
      to: "/create",
    },
    {
      icon: profile ? undefined : faUser,
      imageIcon: profile ? profile.profileImage : undefined,
      label: profile ? profile.username : "Profile",
      color: "text-gray-400",
      textColor: "text-gray-400",
      to: "/profile",
    },
  ];

  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  return (
    <>
      {/* Show on smaller screens */}
      <div className="md:hidden">
        <BottomNavBar
          navItems={navItems}
          navigate={navigate}
          currentPath={currentPath}
        />
      </div>

      {/* Show on medium and larger screens */}
      <div className="hidden md:block">
        <TopNavbar
          navItems={navItems}
          navigate={navigate}
          currentPath={currentPath}
        />
      </div>
    </>
  );
};

export default NavBar;
