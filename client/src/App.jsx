import { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  const [posts, setPosts] = useState([]);
  return (
    <>
      <PostCreate posts={posts} setPosts={setPosts} />
      <PostList posts={posts} setPosts={setPosts} />
    </>
  );
}

export default App;
