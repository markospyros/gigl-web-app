import JoinModal from "../components/JoinModalComponents/JoinModal";
import JokesFeed from "../components/FeedComponents/JokesFeed";

const GigledPage = () => {
  const storedKey = localStorage.getItem("jwtToken");
  const endpoint = `/ListGigledJokes?token=${storedKey}`;

  return (
    <div>
      <JokesFeed endpoint={endpoint} />
      <JoinModal path="gigled" />
    </div>
  );
};

export default GigledPage;
