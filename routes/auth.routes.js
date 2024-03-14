const router = require("express").Router(); //sintaxis avanzada para requerir express y ejecutar el método Router
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");

// POST "api/auth/signup" --> recibir info del usuario y crear doc. en la DB
router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;

  //validar datos usuario (que estén todos los campos, que la contraseña sea fuerte, que usuario no esté repetido en la DB, cifrar contraseña)
  if (!name || !email || !password) {
    res.status(400).json({
      message: "los campos nombre, email y password son obligatorios",
    });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      message:
        "la contraseña debe contener mínimo 8 caracteres, letras en mayúscula y minúscula y 1 número",
    });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email }); // DUDA: esto también es una cláusula de guardia, ¿por qué esta dentro del Try/Catch?
    if (foundUser !== null) {
      //significa que ya existe
      res.status(400).json({ message: "correo ya registrado" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    //crear usuario en BD
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "el usuario se ha registrado" });
  } catch (error) {
    next(error);
  }
});

//POST "api/auth/login" --> validar credenciales usuario y enviar token
router.post("/login", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "los campos nombre, email y password son obligatorios",
    });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser === null) {
      //significa que ese correo no está en la DB
      res.status(400).json({ message: "usuario no registrado" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect === false) {
      res.status(400).json({ message: "contraseña no válida" });
      return;
    }

    //crear token y enviar al cliente
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      //role: foundUser.role
    };
    //aquí se crea el token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "5 days",
    });

    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

//GET "api/auth/verify" --> Autorización. Validar el token e indicar al cliente que está autenticado
router.get("/verify", isTokenValid, (req, res, next) => {
  res.json(req.payload);
});

module.exports = router;
