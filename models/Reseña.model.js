const { Schema, model } = require("mongoose");

const reseñaSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  festival: {
    type: Schema.Types.ObjectId,
    ref: "Festival",
  },
  yourFavouriteThing: {
    type: String,
    required: true,
  },
  whatWouldYouImprove: {
    type: String,
    required: true,
  },
  moreObservations: {
    type: String,
  },
  overallRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: true,
  },
});

const Reseña = model("Reseña", reseñaSchema);

module.exports = Reseña;
