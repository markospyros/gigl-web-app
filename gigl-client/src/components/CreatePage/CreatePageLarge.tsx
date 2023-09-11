import useCreateJoke from "../../hooks/useCreateJoke";

const CreatePageLarge: React.FC = () => {
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
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-start pt-8">
      <div className="bg-gray-800 w-2/5 rounded-lg shadow-2xl p-8">
        <h1 className="font-bold text-3xl text-white mb-5">What's the joke?</h1>

        <input
          type="text"
          placeholder="Joke Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-900 text-white text-xl rounded-lg p-3 w-full focus:outline-none shadow-md mb-5"
        />

        <textarea
          placeholder="Your Joke Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-900 text-white text-xl rounded-lg p-3 w-full h-48 focus:outline-none shadow-md mb-5"
        />

        <div className="mb-5">
          <label className="block text-lg text-white mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-900 text-white text-xl rounded-lg p-3 w-full focus:outline-none shadow-md"
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

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-lg text-xl focus:outline-none shadow-md"
          onClick={submitJoke}
        >
          Share Joke
        </button>
      </div>
    </div>
  );
};

export default CreatePageLarge;
