const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImagesSchema = new Schema({
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  filename: String,
  contentType: String,
});

module.exports = mongoose.model('assets.files', ImagesSchema);