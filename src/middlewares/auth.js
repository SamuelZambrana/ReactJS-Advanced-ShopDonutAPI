const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = payload; // ✅ aquí
    next();
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN);
      req.user = payload; // ✅ aquí también
      next();
    } catch (err) {
      return res.status(401).json({ status: 'Token inválido o expirado', error: err.message });
    }
  }
};


const verifyAdmin = (req, res, next) => {
  try {
    const role = req.user?.role;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ status: 'Error al verificar rol', error: error.message });
  }
};

 
module.exports = {
    verifyToken,
    verifyAdmin
};
   
