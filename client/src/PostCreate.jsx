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
      const response = await axios.post("http://localhost:4000/posts", body);
      console.log(response);
      const newPost = response.data; // Assume response.data contains the newly created post
      setPosts([...posts, newPost]); // Append the new post to the existing posts
      setPostInput(""); // Clear the input field after submission
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={postInput}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
