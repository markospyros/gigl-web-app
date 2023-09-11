import React, { useEffect, useState } from "react";
import JokeCard from "./JokeCard";
import { gigl } from "../../api/gigl";
import NoDataFound from "../NoDataFound";

interface Joke {
  id: string;
  comedianUsername: string;
  date: string;
  profileImage: string;
  title: string;
  content: string;
  gigls: number;
}

interface JokesFeedProps {
  endpoint: string;
}

const JokesFeed: React.FC<JokesFeedProps> = ({ endpoint }) => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const storedKey = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (storedKey !== "" && storedKey !== null) {
      gigl
        .get(endpoint)
        .then((res) => setJokes(res.data))
        .catch((error) => setErrorMessage(error.response.data));
    }
  }, [storedKey, endpoint]);

  const listJokes = jokes.map((joke) => {
    return (
      <div key={joke.id} style={{ marginBottom: "20px" }}>
        <JokeCard
          id={joke.id}
          username={joke.comedianUsername}
          timestamp={joke.date}
          profileImage={joke.profileImage}
          title={joke.title}
          content={joke.content}
          gigls={joke.gigls}
        />
      </div>
    );
  });

  if (jokes.length === 0) {
    return <NoDataFound message={errorMessage} />;
  }

  return (
    <div>
      <div className="mb-24 my-4 px-4 sm:px-6 md:mx-80">{listJokes}</div>
    </div>
  );
};

export default JokesFeed;
