import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import FeedPage from "./pages/FeedPage";
import GigledPage from "./pages/GigledPage";
import CreatePage from "./pages/CreatePage";
import ProfilePage from "./pages/ProfilePage";
import SuccessPage from "./pages/SuccessPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<FeedPage />} />
          <Route path="gigled" element={<GigledPage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
