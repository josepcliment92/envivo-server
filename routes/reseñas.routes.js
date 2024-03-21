const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares");

const Reseña = require("../models/Reseña.model");

//mostrar todas las reseñas de un festival
router.get("/:festivalId", async (req, res, next) => {
  const festivalId = req.params.festivalId;
  console.log(festivalId);

  try {
    const response = await Reseña.find({ festival: festivalId });
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

    res.status(201).json(response.festival);
  } catch (error) {
    next(error);
  }
});

//acceder a una reseña específica
router.get("/username/:resenaId", async (req, res, next) => {
  const resenaId = req.params.resenaId;
  console.log(resenaId)

  try {
    const response = await Reseña.findById(resenaId).populate("user");
    console.log(response)
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Usuario no encontrado" });
  }
});

//editar una reseña
router.patch("/:resenaId", async (req, res, next) => {
  const {
    yourFavouriteThing,
    whatWouldYouImprove,
    moreObservations,
    overallRating,
  } = req.body;
  try {
    const response = await Reseña.findByIdAndUpdate(
      req.params.resenaId,
      {
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
router.delete("/:resenaId", async (req, res, next) => {
  try {
    await Reseña.findByIdAndDelete(req.params.resenaId);
    res.status(202).json({ message: "reseña borrada" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
