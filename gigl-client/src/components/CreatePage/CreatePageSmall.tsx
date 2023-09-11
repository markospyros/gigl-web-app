import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useCreateJoke from "../../hooks/useCreateJoke";

const CreatePageSmall = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    jokeCategories,
    submitJoke,
    errorMessage,
  } = useCreateJoke();

  return (
    <div className="bg-gray-900 min-h-screen pb-16">
      <div className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <button>
          <FontAwesomeIcon icon={faArrowLeft} className="text-yellow-500" />
        </button>
        <h1 className="font-bold">Create a Joke</h1>
        <button className="text-yellow-500 font-bold" onClick={submitJoke}>
          Post
        </button>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Joke Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 text-white rounded-lg p-2 w-full mb-4 focus:outline-none"
        />
        <textarea
          placeholder="Your Joke Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-800 text-white rounded-lg p-2 w-full h-40 focus:outline-none mb-4"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-800 text-white rounded-lg p-4 w-full mb-4 focus:outline-none" // Updated the padding and font size
        >
          <option value="" disabled>
            Select Category
          </option>
          {jokeCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
      </div>
    </div>
  );
};

export default CreatePageSmall;
