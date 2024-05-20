import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(res.data);
      setCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div>
      <span>{count}</span>
      <CommentList comments={comments} />
      <CommentCreate
        postId={postId}
        commentList={comments}
        fetchComments={fetchComments}
        setComments={setComments}
      />
    </div>
  );
}

export default PostComments;
