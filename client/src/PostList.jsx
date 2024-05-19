import axios from "axios";
import { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import PostComments from "./PostComments";

function PostList({ posts, setPosts }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    async function getPosts() {
      try {
        const data = await axios.get("http://localhost:4000/posts");
        const postsArray = Object.values(data.data);
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
            className="border border-gray-300 bg-white rounded-lg shadow-md m-4  p-4"
          >
            <span className="text-lg text-black">{p.title}</span>

            <PostComments postId={p.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
