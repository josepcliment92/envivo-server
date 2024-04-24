const router = require("express").Router();

const { isTokenValid } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

//lee los detalles de tu perfil
router.get("/", isTokenValid, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id).select({
      name: 1,
      email: 1,
      role: 1,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//edita los detalles de tu perfil
router.put("/", isTokenValid, async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const response = await User.findByIdAndUpdate(
      req.payload._id,
      {
        name,
        email,
        password
      },
      { new: true }
    );
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

//elimina tu perfil
router.delete("/", isTokenValid, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.payload._id);
    res.status(202).json({ message: "usuario borrado" });
  } catch (error) {
    next(error);
  }
});

//agregar nuevos festivales a la propiedad "favouriteFestivals" (guardar un festival en favoritos)
router.patch("/", isTokenValid, async (req, res, next) => {
  try {
    const festivalId = req.body.festivalIdToAdd
    const response = await User.findByIdAndUpdate(
      req.payload._id, 
      { $addToSet: { favouriteFestivals: festivalId } },
      { new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
