const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  title: { type: String, required: true },
  imagePath: { type: String, required: true },
});

const albumSchema = mongoose.Schema({
  title: { type: String, required: true },
  photos: {type: [photoSchema]},
  order: { type: Number, required: true }
});

module.exports = mongoose.model('Album', albumSchema);
