import axios from "axios";
import { useState } from "react";

function CommentCreate({ postId, commentList, setCommentList }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { content: comment };
    try {
      const response = await axios.post(
        `http://localhost:4001/posts/${postId}/comments`,
        body
      );
      setCommentList([...commentList, response.data]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentId" className="text-blue-400 text-sm">
          Comment
        </label>
        <div id="commentId" className="border rounded-sm border-black ">
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div>
          <button
            className="border  border-cyan-100 bg-cyan-200 p-0.5 text-balck m-1
            hover:bg-cyan-400 focus:outline-none px-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentCreate;
