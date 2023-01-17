const express = require("express");
const path = require("path");
require("../src/db/connection");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 3000;
const VideoDetails = require("../src/models/video");

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

app.get("/videos", async (req, res) => {
  try {
    const getVideos = await VideoDetails.find({});
    res.status(201).send(getVideos);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/post", async (req, res) => {
  try {
    const uploadingNewVideo = new VideoDetails(req.body);
    console.log(req.body);
    const insertVideo = await uploadingNewVideo.save();
    res.status(201).send(insertVideo);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    // const _id = req.params.id
    const deleteVideo = await VideoDetails.deleteOne({ _id:req.params.id });
    res.send(deleteVideo);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`connection is live on ${port}`);
});
