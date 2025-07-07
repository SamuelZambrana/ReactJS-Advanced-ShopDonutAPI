const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/auth.token');
const { sendEmail } = require('../services/email.services');

 
const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validación de campos obligatorios
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Todos los campos son obligatorios',
      });
    }

    // Validación de coincidencia de contraseñas
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Las contraseñas no coinciden',
      });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const createdUser = await userModel.create(newUser);

    // Enviar correo de bienvenida
    const to = email;
    const subject = 'Bienvenido a nuestra App';
    const html = `<h3>Hola ${name}, gracias por registrarte en nuestra aplicación</h3>`;

    await sendEmail(to, subject, html);

    res.status(201).json({
      status: 'Success',
      message: 'Usuario registrado correctamente',
      data: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      error: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email: email })
      .select("name email password role"); // ✅ Incluye el campo role

    if (!user) {
      return res.status(404).send("Usuario o contraseña no validos");
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(404).send("Usuario o contraseña no validos");
    }

    const payload = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    const token = generateToken(payload, false);
    const token_refresh = generateToken(payload, true);

    res.status(200).send({
      status: "Success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
      token_refresh,
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};


  const getTokens = async (req, res) => {
    try {
      const payload = {
        _id: req.payload._id,
        name: req.payload.name,
        role: req.payload.role,
      };
      const token = generateToken(payload, false);
      const token_refresh = generateToken(payload, true);
      res.status(200).send({ status: "Success", token, token_refresh });
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
  };


  module.exports = {
    login,
    getTokens,
    signup
      
  }