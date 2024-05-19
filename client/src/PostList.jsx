import axios from "axios";
import { useEffect, useState } from "react";

function PostList({ posts, setPosts }) {
  useEffect(() => {
    async function getPosts() {
      try {
        const data = await axios.get("http://localhost:4000/posts");
        const postsArray = Object.values(data.data);
        console.log(postsArray);
        setPosts(postsArray);
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, [setPosts]);

  return (
    <div>
      <h1 className="m-5 text-3xl font-mono">Your posts</h1>
      <ul className="list-none flex flex-wrap justify-center">
        {posts.map((p, index) => (
          <li
            key={index}
            className="border border-gray-300 bg-white rounded-lg shadow-md m-4 flex justify-center p-4"
            style={{ width: "200px", height: "150px" }}
          >
            <span className="text-center">{p.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
