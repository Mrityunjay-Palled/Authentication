const express = require("express");
const app = express();

const posts = [
  {
    username: "Naruto",
    title: "Post 1",
  },
  {
    username: "Levi",
    title: "Post 2",
  },
];

app.use(express.json())

app.get("/posts", (req, res) => {
    res.json(posts)
});



app.listen(3000, () => console.log("server started"));
