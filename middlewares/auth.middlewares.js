const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  try {
    //console.log(req.headers.authorization)
    const tokenArr = req.headers.authorization.split(" ");

    const token = tokenArr[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;

    next(); //continuar con la ruta
  } catch (error) {
    res.status(401).json({ errorMessage: "Token no válido o expirado" });
  }
}

function isUserAdmin(req, res, next) {
  if (req.payload.role === "admin") {
    next(); // continua con la ruta
  } else {
    res.status(401).json("no eres un admin, fuera de aqui");
  }
}

module.exports = {
  isTokenValid,
  isUserAdmin,
};

//testear rutas ya