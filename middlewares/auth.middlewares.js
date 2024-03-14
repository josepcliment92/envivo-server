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

module.exports = {
  isTokenValid,
};
