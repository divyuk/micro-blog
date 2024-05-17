const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());

const commentsByPostId = {}; // in memory data structure for the comments
/*
    postId -> { [ {commentID : , content : '']} , [{}] , ...  } //? Array of objects
*/

app.get("/posts/:id/comments", (req, res) => {
  const { id: postId } = req.params;
  res.status(200).json(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { id: postId } = req.params;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || []; // if undefined give an empty array

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;
  res.status(201).json(comments);
});

app.listen(4001, () => {
  console.log("Commenting service listening on port 4001!");
});
