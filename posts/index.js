const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173/", // Allow only this origin
  methods: "GET,POST", // Allow only GET and POST methods
  allowedHeaders: "Content-Type,Authorization", // Allow only these headers
};
app.use(cors());
app.use(express.json());

const posts = {}; // in-memory storing the posts.

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex"); // random id
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on port 4000!");
});
