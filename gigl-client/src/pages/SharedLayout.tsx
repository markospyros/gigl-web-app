import NavBar from "../components/NavbarComponents/Navbar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
