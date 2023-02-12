require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

let refereshTokens = [];

app.post("/token", (req, res) => {
  const refereshToken = req.body.token;
  if (refereshToken === null) return res.sendStatus(401);
  if (!refereshTokens.includes(refereshToken)) return res.sendStatus(403);
  jwt.verify(refereshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refereshTokens = refereshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refereshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
  refereshTokens.push(refereshToken);
  res.json({ accessToken: accessToken, refereshToken: refereshToken });
  res.json({ accessToken: accessToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "50s" });
}

app.listen(4000);
