

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
    default:
      "https://images.ecestaticos.com/V-BFQif9aRCJoj_W4WxB8ffFgkE=/49x0:2211x1622/557x418/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fdc8%2F0bd%2Ff1c%2Fdc80bdf1cc8349bcb6d17e68096603b9.jpg",
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
