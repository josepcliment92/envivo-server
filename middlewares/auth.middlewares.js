const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  try {
    const tokenArr = req.headers.authorization.split(" ");

    const token = tokenArr[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;

    next();
  } catch (error) {
    res.status(401).json({ errorMessage: "Token no válido o expirado" });
  }
}

function isUserAdmin(req, res, next) {
  if (req.payload.role === "admin") {
    next();
  } else {
    res.status(401).json("no eres un admin, fuera de aqui");
  }
}

module.exports = {
  isTokenValid,
  isUserAdmin,
};
