const donutModel = require('../models/donutModels');
const userModel = require('../models/userModel')
const mongoose = require('mongoose');


const addDonut = async (req, res) => {
  try {
    const newDonut = req.body;

    const createdDonut = await donutModel.create(newDonut);

    res.status(201).json({
      status: 'success',
      message: 'El donut se ha añadido correctamente',
      data: createdDonut,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al añadir el donut',
      error: error.message,
    });
  }
};


const getAllDonuts = async (req, res) => {
  try {
    const donuts = await donutModel.find();

    console.log('✅ Donuts encontrados:', donuts.length);

    // Si no hay donuts, puedes devolver un array vacío o un mensaje personalizado
    if (donuts.length === 0) {
      return res.status(200).json({ message: 'No hay donuts disponibles', donuts: [] });
    }

    // Si quieres formatear los donuts (por ejemplo, contar likes), puedes hacerlo aquí
    /*
    const formattedDonuts = donuts.map(donut => ({
      ...donut.toObject(),
      likes: donut.likes ? donut.likes.length : 0
    }));
    return res.status(200).json(formattedDonuts);
    */

    // Envío directo si no necesitas formatear
    return res.status(200).json(donuts);
  } catch (error) {
    console.error('❌ Error al obtener los donuts:', error);
    return res.status(500).json({ status: 'Failed', error: error.message });
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


const updateDonut = async (req, res) => {
  const { idDonut } = req.params;
  const updateData = req.body;

  console.log('📥 ID recibido para actualizar:', idDonut);
  console.log('📦 Datos recibidos:', updateData);

  // Validar que el ID sea un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(idDonut)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Verificar si el donut existe
    const existingDonut = await donutModel.findById(idDonut);
    if (!existingDonut) {
      return res.status(404).json({ message: 'Donut no encontrado' });
    }

    // Actualizar el donut
    const updatedDonut = await donutModel.findByIdAndUpdate(idDonut, updateData, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Aplica validaciones del schema
    });

    console.log('✅ Donut actualizado correctamente:', updatedDonut);
    res.status(200).json(updatedDonut);
  } catch (error) {
    console.error('❌ Error al actualizar el donut:', error.message);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

const removeDonut = async (req, res) => {
  const { idDonut } = req.params;
  console.log('🧾 ID recibido para eliminar:', idDonut);

  // Validar formato del ID
  if (!mongoose.Types.ObjectId.isValid(idDonut)) {
    console.warn('⚠️ ID inválido:', idDonut);
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Verificar si el donut existe antes de eliminar
    const donut = await donutModel.findById(idDonut);
    if (!donut) {
      console.warn('❌ Donut no encontrado en la base de datos:', idDonut);
      return res.status(404).json({ message: 'Donut no encontrado' });
    }

    // Eliminar el donut
    await donutModel.findByIdAndDelete(idDonut);
    console.log('✅ Donut eliminado correctamente:', donut.nombre || donut._id);

    res.status(200).json({ message: 'Donut eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar el donut:', error.message);
    res.status(500).json({ status: 'Failed', message: error.message });
  }
};

module.exports = {
    addDonut,
    getAllDonuts,
    getByIdDonut,
    updateDonut,
    removeDonut
}