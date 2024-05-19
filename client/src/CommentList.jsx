function CommentList({ comments }) {
  return (
    <div>
      <ul>
        {comments.map((com, index) => (
          <li key={index}>{com.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
