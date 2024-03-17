const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//FESTIVAL RUTAS
const festivalRouter = require("./festival.routes")
router.use("/festivales", festivalRouter)

//RESEÑAS RUTAS
const reseñaRouter = require("./reseñas.routes")
router.use("/reseñas", reseñaRouter)

//AUTH ROUTES
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

//PERFIL RUTAS
const perfilRouter = require("./perfil.routes")
router.use("/perfil", perfilRouter)

//¿ARTISTA RUTAS? CREO QUE NO


module.exports = router;
