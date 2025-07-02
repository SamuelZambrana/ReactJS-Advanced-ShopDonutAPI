const userModel = require('../models/userModel');
const donutModel = require('../models/donutModels')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../services/email.services');

const addUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = {
          name,
          email,
          password: await bcrypt.hash(password, 10)
      }
      await userModel.create(newUser);
      console.log('User added:', newUser);
      res.status(200).send("El Usuario se ha añadido correctamente");
    } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message });
    }
}

const getFavoritesDonuts = async (req, res) => {
  try {
    
    const userId = req.payload._id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ status: "Failed", message: "Usuario no encontrado" });
    }

    const favorites = await donutModel.find({ _id: { $in: user.favoritesDonut } });
    const favoritesCount = favorites.length;

    res.status(200).json({ status: "Success", count: favoritesCount, data: favorites });
  } catch (error) {
    console.error("Error obteniendo donuts favoritos:", error);
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

const addFavouriteDonut = async (req, res) => {
  try {
    const { idDonut } = req.params;
    const idUser = req.payload._id;

    // Buscar usuario
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar donut
    const recipe = await donutModel.findById(idDonut);
    if (!recipe) {
      return res.status(404).json({ message: "Donut no encontrada" });
    }

    // Verificar si el donut ya está en favoritos
    if (user.favoritesDonut.includes(idDonut)) {
      return res.status(400).json({ message: "El donut ya está en favoritos" });
    }

    // Agregar donut a favoritos y guardar cambios
    user.favoritesDonut.push(idDonut);
    await user.save();

    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error.message });
  }
};

const removeFavouriteDonut = async (req, res) => {
  try {
    const { idDonut } = req.params;
    const idUser = req.payload._id;

    // Buscar usuario
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

   // Verificar si el donut ya está en favoritos
    if (user.favoritesDonut.includes(idDonut)) {
      return res.status(400).json({ message: "El donut ya está en favoritos" });
    }

    // Eliminar el donut de favoritos y guardar cambios
    user.favoritesDonut = user.favoritesDonut.filter(donut => donut !== idDonut);
    await user.save();

    res.status(200).json({ status: "Success", message: "Donut eliminada de favoritos", data: user });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error.message });
  }
};


const updateMyProfile = async (req, res) => {
  try {
    // Verificar si el payload existe y tiene un ID válido
    if (!req.payload || !req.payload._id) {
      return res.status(400).json({ status: "Error", message: "ID de usuario no proporcionado" });
    }

    const idUser = req.payload._id;
    const updatedData = req.body;

    // Verificar que se haya enviado información para actualizar
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ status: "Error", message: "No se enviaron datos para actualizar" });
    }

    // Actualizar el perfil del usuario en la base de datos
    const updatedUser = await userModel.findByIdAndUpdate(idUser, updatedData, { new: true }).populate({ path: "favoritesRecipes", select: "title description" });

    if (!updatedUser) {
      return res.status(404).json({ status: "Error", message: "Usuario no encontrado" });
    }

    res.status(200).json({ status: "Success", data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

const addlikeRecipes = async (req, res) => {
  try {
    const { idDonut } = req.params;
    const idUser = req.payload._id;

    // Buscar usuario
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar donut
    const donut = await donutModel.findById(idDonut);
    if (!donut) {
      return res.status(404).json({ message: "Donut no encontrada" });
    }

    // Evitar que el usuario dé like varias veces
    if (donut.likes.includes(idUser)) {
        return res.status(400).json({ success: false, message: 'Ya diste like a este donut' });
    }

    // Agregar el like
    donut.likes.push(idUser);
    await donut.save();

    // Obtener el creador del donut (debe ser `createdBy`
    const creator = await userModel.findById(donut.createdBy);
    if (!creator) {
      return res.status(404).json({ success: false, message: "No se pudo encontrar el creador del donut" });
    }

    //Redactamos el correo hacia el creador de la receta que reciba un like
    const to = creator.email;
    const subject = 'Tu Donut Ha recibido un nuevoLike';
    const html = `Hola ${creator.name}, tu donut "${donut.name}" acaba de recibir un nuevo like. ¡Sigue compartiendo tus deliciosas creaciones!`
    
    await sendEmail(to, subject, html)
      
    res.status(200).json({ success: true, message: 'Like añadido y notificación enviada' });

    } catch (error) {
        console.error('Error al procesar el like:', error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }

};


module.exports = {
  addUser,
  getFavoritesDonuts,
  addFavouriteDonut,
  removeFavouriteDonut,
  updateMyProfile,
  addlikeRecipes
    
}