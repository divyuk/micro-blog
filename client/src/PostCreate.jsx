import { useState } from "react";
import axios from "axios";

function PostCreate({ posts, setPosts }) {
  const [postInput, setPostInput] = useState("");

  const handleChange = (e) => {
    setPostInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title: postInput };
    try {
      if (postInput != "") {
        const response = await axios.post("http://localhost:4000/posts", body);
        console.log(response);
        const newPost = response.data; // Assume response.data contains the newly created post
        setPosts([...posts, newPost]); // Append the new post to the existing posts
        setPostInput(""); // Clear the input field after submission
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-10 ml-5">
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleInput" className="p-3 text-lg">
          Title
        </label>
        <input
          type="text"
          id="titleInput"
          value={postInput}
          onChange={(e) => handleChange(e)}
          className="border rounded-md px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border-black"
        />
        <div className="m-3">
          <button
            type="submit"
            className="border border-blue-500 bg-blue-500 text-white rounded-sm px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:blue-red-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreate;
