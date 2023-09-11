import React, { useState } from "react";
import JoinModal from "../components/JoinModalComponents/JoinModal";
import JokesFeed from "../components/FeedComponents/JokesFeed";
import CategoriesFilter from "../components/CategoriesFilterComponents/CategoriesFilter";

const FeedPage = () => {
  const [category, setCategory] = useState("All jokes");
  const endpoint = `/ListJokesBasedByCategory?category=${category}`;

  return (
    <div>
      <CategoriesFilter setCategory={setCategory} />
      <JokesFeed endpoint={endpoint} />
      <JoinModal path="feed" />
    </div>
  );
};

export default FeedPage;
