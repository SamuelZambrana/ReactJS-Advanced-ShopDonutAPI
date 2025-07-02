const express = require('express');
const router = express.Router();
const healthyController = require('../controllers/healthyController');

router.get('/health', healthyController);

module.exports = router;
