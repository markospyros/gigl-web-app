import { useState, useEffect } from "react";
import { gigl } from "../api/gigl";
import { useNavigate } from "react-router-dom";

const useCreateJoke = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [jokeCategories, setJokeCategories] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    gigl.get("/ListJokeTypes").then((res) => {
      res.data.shift();
      setJokeCategories(res.data);
    });
  }, []);

  const navigate = useNavigate();

  const submitJoke = () => {
    const joke = {
      title,
      content,
      category,
    };

    const storedKey = localStorage.getItem("jwtToken");
    if (storedKey) {
      gigl
        .post(`/MakeAJoke?token=${storedKey}`, joke)
        .then(() => {
          setTitle("");
          setContent("");
          setCategory("All jokes");
          navigate("/success");
        })
        .catch((error) => setErrorMessage(error.response.data));
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    jokeCategories,
    submitJoke,
    errorMessage,
  };
};

export default useCreateJoke;
