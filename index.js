const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 300;
app.use(express.json());

app.listen(port, () => console.log("listening to the app", port));
app.get("/", async (req, res) => res.json({ hello: "test" }));