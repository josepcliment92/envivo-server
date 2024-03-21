const router = require("express").Router();

const Festival = require("../models/Festival.model");

//mostrar todos los festivales
router.get("/", (req, res, next) => {
  Festival.find({})
    .then((festivales) => {
      res.status(200).json(festivales);
    })
    .catch((error) => {
      next(error); //PULIR ESTO
    });
});

//mostrar el detalle de un festival
router.get("/:festivalId", async (req, res, next) => {
  try {
    const response = await Festival.findById(req.params.festivalId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//crear un nuevo festival
router.post("/", async (req, res, next) => {
  const {
    name,
    image,
    startDate,
    endDate,
    city,
    region,
    artists,
    genres,
    minPrize,
    campingArea,
    extraInfo,
  } = req.body;
  try {
    const response = await Festival.create({
      name,
      image,
      startDate,
      endDate,
      city,
      region,
      artists,
      genres,
      minPrize,
      campingArea,
      extraInfo,
    });
    res.status(201).json(response._id);
  } catch (error) {
    next(error);
  }
});

//editar detalles de un festival
router.put("/:festivalId", async (req, res, next) => {
  const {
    name,
    image,
    startDate,
    endDate,
    city,
    region,
    artists,
    genres,
    minPrize,
    campingArea,
    extraInfo,
  } = req.body;
  try {
    const response = await Festival.findByIdAndUpdate(
      req.params.festivalId,
      {
        name,
        image,
        startDate,
        endDate,
        city,
        region,
        artists,
        genres,
        minPrize,
        campingArea,
        extraInfo,
      },
      { new: true }
    );
    res.status(202).json({ message: "festival actualizado" });
  } catch (error) {
    next(error);
  }
});

//editar solo la imagen de un festival
/*router.patch("/:festivalId", async (req, res, next) => {
  const { image } = req.body;
  try {
    const response = await Festival.findByIdAndUpdate(
      req.params.festivalId,
      {
        image,
      },
      { new: true }
    );
    res.status(202).json({ message: "imagen actualizada" });
  } catch (error) {
    next(error);
  }
});*/

//eliminar un festival
router.delete("/:festivalId", async (req, res, next) => {
  try {
    await Festival.findByIdAndDelete(req.params.festivalId);
    res.status(202).json({ message: "festival eliminado" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
