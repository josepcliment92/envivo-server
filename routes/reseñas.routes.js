const router = require("express").Router();

const Reseña = require("../models/Reseña.model");

//mostrar todas las reseñas de un festival
router.get("/:festivalId", async (req, res, next) => {
  const festivalId = req.params.festivalId;

  try {
    const response = await Reseña.find({ festival: festivalId }).populate(
      "Festival"
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//crear una nueva reseña
router.post("/:festivalId", async (req, res, next) => {
  const {
    user,
    festival,
    yourFavouriteThing,
    whatWouldYouImprove,
    moreObservations,
    overallRating,
  } = req.body;
  try {
    const response = await Reseña.create({
      user,
      festival,
      yourFavouriteThing,
      whatWouldYouImprove,
      moreObservations,
      overallRating,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

//editar una reseña
router.put("/:reseñaId", async (req, res, next) => {
  const {
    user,
    festival,
    yourFavouriteThing,
    whatWouldYouImprove,
    moreObservations,
    overallRating,
  } = req.body;
  try {
    const response = await Reseña.findByIdAndUpdate(
      req.params.reseñaId,
      {
        user,
        festival,
        yourFavouriteThing,
        whatWouldYouImprove,
        moreObservations,
        overallRating,
      },
      { new: true }
    );
    res.status(202).json({ message: "reseña actualizada" });
  } catch (error) {
    next(error);
  }
});

//borrar una reseña
router.delete("/:reseñaId", async (req, res, next) => {
  try {
    await Reseña.findByIdAndDelete(req.params.reseñaId);
    res.status(202).json({ message: "reseña borrada" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
