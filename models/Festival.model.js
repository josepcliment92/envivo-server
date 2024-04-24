const { Schema, model } = require("mongoose");
const { default: citiesArr } = require("./utils/citiesArr");
const { default: regionsArr } = require("./utils/regionsArr");

const festivalSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
    enum: [citiesArr],
  },
  region: {
    type: String,
    required: true,
    enum: [regionsArr],
  },
  artists: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
    enum: [
      "pop",
      "rock",
      "indie",
      "alternativo",
      "urbano",
      "reggae",
      "folk",
      "urbano",
      "hip hop",
      "reggaeton",
      "otros",
    ],
  },
  minPrize: {
    type: Number,
    min: 0,
  },
  campingArea: {
    type: Boolean,
  },
  extraInfo: {
    type: String,
  },
});

const Festival = model("Festival", festivalSchema);

module.exports = Festival;
