const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  // Use Promise.all to handle multiple async operations
  Promise.allSettled([
    axios.post("http://localhost:4000/events", event), // post
    axios.post("http://localhost:4001/events", event), // comment
    axios.post("http://localhost:4002/events", event), // query
  ])
    .then(() => {
      res.send({ status: "OK" });
    })
    .catch((err) => {
      console.error("Error posting events:", err);
      res
        .status(500)
        .send({ status: "Error", message: "Failed to post events" });
    });
});
app.listen(4005, () => {
  console.log("Event Bus listening on 4005");
});
