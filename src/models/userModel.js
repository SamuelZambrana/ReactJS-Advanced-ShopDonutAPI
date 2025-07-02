const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  favoritesDonut: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Donut" 
  }], 
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  }
});

// Middleware para ocultar la contraseña al buscar usuarios
userSchema.pre(/^find/, function(next) {
  this.select("-password"); 
  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
