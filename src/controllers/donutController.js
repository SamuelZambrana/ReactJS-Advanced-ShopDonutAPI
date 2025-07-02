const donutModel = require('../models/donutModels');
const userModel = require('../models/userModel')
const mongoose = require('mongoose');

const addDonut = async (req, res) => {
    try {
      const newDonut= req.body;
      await donutModel.create(newDonut)
      res.status(200).send("El donut se ha añadido correctamente");
    } catch (error) {
      res.status(500).send({ status:"Failed", error: error.message })
    }
};


const getAllDonuts = async (req, res) => {
    try {
      const donuts = await donutModel.find();
      console.log('Donuts fetched:', recipes.length);
      if(!donuts){
        return res.status(200).send("No hay Donuts");
      }
      
      /*
      // Asegurar que cada donut tenga la propiedad 'likes' y devolver su longitud correctamente
      const formattedRecipes = recipes.map(recipe => ({
        ...recipe.toObject(), // Convertir a objeto plano para evitar problemas con mongoose
        likes: recipe.likes ? recipe.likes.length : 0
        }));
    */
      res.status(200).send(donut)
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
};

const getByIdDonut = async (req, res) => {
    try {
      const { idDonut } = req.params;
      const donut = await donutModel.findById(idDonut);
      console.log('DOnut fetched:', donut);
      if(!donut){
        return res.status(200).send("No existe el Donut");
      }
      
      res.status(200).send(donut)
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
};


const updateDonut= async (req, res) => {
  try {
    const idUser = req.payload._id;
    const { idDonut } = req.params;
    const { nombre, tipo, precio, imagenURL } = req.body;

    // Buscar usuario
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar el donut existente
    const donut = await donutModel.findById(idDonut);
    if (!donut) {
      return res.status(404).json({ message: "Donut no encontrada" });
    }

    // Actualizar los donut con los datos proporcionados
    donut.nombre = nombre || donut.nombre,
    donut.tipo = tipo || donut.tipo;
    donut.precio = precio || donut.precio;
    donut.imagenURL = imagenURL || donut.imagenURL;

    await donut.save();

    res.status(200).json({
      status: "Success",
      message: "Donut actualizada correctamente",
      data: donut
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};

const removeDonut = async (req, res) => {
  try {
    const idUser = req.payload._id;
    const { idDonut } = req.params;

    // Buscar usuario
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar y eliminar la receta
    const donut = await donutModel.findByIdAndDelete(idDonut);
    if (!donut) {
      return res.status(404).json({ message: "Donut no encontrada" });
    }

    res.status(200).json({
      status: "Success",
      message: "Donut eliminada correctamente",
      data: donut
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};

module.exports = {
    addDonut,
    getAllDonuts,
    getByIdDonut,
    updateDonut,
    removeDonut
}