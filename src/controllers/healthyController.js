
const healthyController = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servidor funcionando correctamente ✅',
    timestamp: new Date().toISOString()
  });
};

module.exports = healthyController;
