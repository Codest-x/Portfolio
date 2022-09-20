const mongoose = require("mongoose");

const { Schema } = mongoose;

const date = new Date(Date.now()).toLocaleDateString();

const PostSchema = new Schema({
  data: {
    type: "object",
    required: true,
    title: { type: "string" },
    description: { type: "string" },
    shorttitle: { type: "string" },
    image: { type: "string" },
    link: { type: "string" },
    date: { type: "string", default: date },
  },
  personal: { type: "boolean", default: false },
  featured: { type: "boolean", default: false },
  screens: [],
});

module.exports = mongoose.model("Post", PostSchema);
