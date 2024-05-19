const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const corsOptions = {
  // origin: "http://localhost:5173/", // Allow only this origin
  methods: "GET,POST", // Allow only GET and POST methods
  allowedHeaders: "Content-Type,Authorization", // Allow only these headers
};
app.use(cors());
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
