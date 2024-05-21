const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

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

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { id: postId } = req.params;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || []; // if undefined give an empty array

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  //! throwing to the broker/event bus
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId },
  });

  res.status(201).json(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Commenting service listening on port 4001!");
});
