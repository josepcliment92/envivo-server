const router = require("express").Router();

const { isTokenValid } = require("../middlewares/auth.middlewares");
const Usuario = require("../models/User.model");

//lee los detalles de tu perfil
router.get("/:perfilId", isTokenValid, async (req, res, next) => {
  try {
    const response = await Usuario.findById(req.params.id).select({
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
router.put("/:perfilId", isTokenValid, async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const response = Usuario.findByIdAndUpdate(
      req.params.perfilId,
      {
        name,
        email,
        password,
        role,
      },
      { new: true }
    );
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

//elimina tu perfil
router.delete("/:perfilId", isTokenValid, async (req, res, next) => {
  try {
    await Usuario.findByIdAndDelete(req.params.perfilId);
    res.status(202).json({ message: "usuario borrado" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
