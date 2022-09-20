const mongoose = require("mongoose");

const { Schema } = mongoose;

const AbilitySchema = new Schema({
  title: {type: "string", required: true},
  image: {type: "string", required: true},
  link: {type: "string"}
});

module.exports = mongoose.model("Ability", AbilitySchema);