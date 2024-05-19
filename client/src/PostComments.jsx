import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(() => res.data);
      setCount(() => res.data.length);
    }
    fetchData();
  }, [postId, setComments, comments]);

  return (
    <div>
      <span>{count}</span>
      <CommentList comments={comments} />
      <CommentCreate
        postId={postId}
        commentList={comments}
        setCommentList={setComments}
      />
    </div>
  );
}

export default PostComments;
