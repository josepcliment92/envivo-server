const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    favouriteFestivals: {
      type: [Schema.Types.ObjectId],
      ref: "Festival" // array. necesito rutas para añadir festival a array favoritos. clase miercoles semana 7, ver ruta para agregar o quitar elementos de un array. hacerla en perfil.routes.
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
