const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donutSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del donut es obligatorio"],
    trim: true,
  },
  tipo: {
    type: String,
    required: [true, "El tipo de donut es obligatorio"],
    enum: ["glaseado", "relleno", "frito", "horneado", "vegano", "otro"],
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
  },

  imagenURL: {
    type: String,
    required: [true, "Se requiere una imagen del donut"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //required: true,
  },
    likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }], 
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Donut = mongoose.model("Donut", donutSchema);
module.exports = Donut;
