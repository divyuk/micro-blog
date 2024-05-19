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
      <h1 className="text-3xl font-bold underline">Your posts</h1>
      <ul>
        {posts.map((p, index) => (
          <li key={index}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
