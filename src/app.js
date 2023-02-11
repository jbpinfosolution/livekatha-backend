const express = require("express");
const path = require("path");
require("../src/db/connection");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 3000;
const VideoDetails = require("../src/models/video");
const Videos = require("../src/models/newVideo");

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

app.get("/video", async (req, res) => {
  try {
    const getVideos = await Videos.find({}).sort({_id: -1});
    res.status(201).send(getVideos);
  } catch (e) {
    res.status(400).send(e);
  }
});

function paginationMiddleware(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  req.pagination = {
    limit,
    skip: (page - 1) * limit,
  };
  next();
}

app.use(paginationMiddleware);

app.get("/items", (req, res) => {
  const { pagination } = req;
  VideoDetails.count({}, (err, count) => {
    if (err) return res.send(err);
    const totalPages = Math.ceil(count / pagination.limit);
    VideoDetails.find({})
      .sort({ _id: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .exec((err, items) => {
        if (err) return res.send(err);
        res.json({ items: items, totalPages: totalPages });
      });
  });
});

app.get("/newItems", (req, res) => {
  const { pagination } = req;
  Videos.count({}, (err, count) => {
    if (err) return res.send(err);
    const totalPages = Math.ceil(count / pagination.limit);
    Videos.find({})
      .sort({ _id: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .exec((err, items) => {
        if (err) return res.send(err);
        res.json({ items: items, totalPages: totalPages });
      });
  });
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

app.post("/newPost", async (req, res) => {
  try {
    const uploadingNewVideo = new Videos(req.body);
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
    const deleteVideo = await VideoDetails.deleteOne({ _id: req.params.id });
    res.send(deleteVideo);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/newDelete/:id", async (req, res) => {
  try {
    // const _id = req.params.id
    const deleteVideo = await Videos.deleteOne({ _id: req.params.id });
    res.send(deleteVideo);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`connection is live on ${port}`);
});
