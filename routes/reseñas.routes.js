const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares");

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
router.post("/:festivalId", isTokenValid, async (req, res, next) => {
  //confirmar que el usuario está logueado para realizar esta acción. user viene de BE (ultima parte clase autenticador)
  const {
    yourFavouriteThing,
    whatWouldYouImprove,
    moreObservations,
    overallRating,
  } = req.body;

  try {
    const response = await Reseña.create({
      user: req.payload._id,
      festival: req.params.festivalId,
      yourFavouriteThing,
      whatWouldYouImprove,
      moreObservations,
      overallRating,
    });
    if (req.payload.role === "admin" || "user") {
      res.status(201).json(response);
    } else {
      res
        .status(400)
        .json({ message: "tienes que registrarte para poder dejar tu reseña" });
    }
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
