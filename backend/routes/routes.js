const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "assets",
  });
});

const Post = require("../models/post");
const Ability = require("../models/ability");
const multer = require("../middlewares/multer");
const Images = require("../models/images");

router.get("/favicon.ico", (req, res) => res.sendStatus(404));

/* Request Images */

router.get("/assets/:filename", async (req, res) => {
  try {
    const file = bucket
      .find({
        filename: req.params.filename,
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            error: "no files exist",
          });
        }
        bucket.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/assets", async (req, res) => {
  const images = await Images.find();
  res.json(images);
});

router.post("/assets", multer.upload, (req, res) => {
  if (Images.exists({ filename: req.file.originalname })) {
    res.json({ alert: "File already exists" });
  } else {
    res.json({ status: "File Saved" });
  }
});

/* Request Abilitys */

router.get("/abilities/:id", async (req, res) => {
  const ability = await Ability.findById(req.params.id);
  res.type("json").send(JSON.stringify(ability, null, 2) + "\n");
});

router.get("/abilities", async (req, res) => {
  const abilities = await Ability.find();
  res.type("json").send(JSON.stringify(abilities, null, 2) + "\n");
});

router.post("/abilities", async (req, res) => {
  try {
    const { title, image, link } = req.body;
    const ability = new Ability({ title, image, link });
    await ability.save();
    res.json({ status: "Ability Saved" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/abilities/:id", async (req, res) => {
  try {
    const { title, image, link } = req.body;
    const newAbility = { title, image, link };
    await Ability.findByIdAndUpdate(req.params.id, newAbility);
    res.json({ status: "Ability Updated" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/abilities/:id", async (req, res) => {
  try {
    await Ability.findByIdAndRemove(req.params.id);
    res.json({ status: "Ability Deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

/* Index Path Requests */

router.get("/featured", async (req, res) => {
  try {
    const featposts = await Post.where("featured")
      .equals(true)
      .where("personal")
      .equals(false);
    res.type("json").send(JSON.stringify(featposts, null, 2) + "\n");
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/projects", async (req, res) => {
  try {
    const projectsposts = await Post.where("personal").equals(false);
    res.type("json").send(JSON.stringify(projectsposts, null, 2) + "\n");
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/personal", async (req, res) => {
  try {
    const personalposts = await Post.where("personal").equals(true);
    
    res.type("json").send(JSON.stringify(personalposts, null, 2) + "\n");
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.type("json").send(JSON.stringify(posts, null, 2) + "\n");
});

router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.arams.id);
    res.type("json").send(JSON.stringify(posts, null, 2) + "\n");
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { data, screens, featured, personal } = req.body;
    const post = new Post({ data, screens, featured, personal });
    await post.save();
    res.json({ status: "Post Saved" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { data, screens, featured, personal } = req.body;
    const newPost = { data, screens, featured, personal };
    await Post.findByIdAndUpdate(req.params.id, newPost);
    res.json({ status: "Post Updated" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.json({ status: "Post Deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("*", function (req, res) {
  res.json({ error: "Route no defined" });
});

module.exports = router;
