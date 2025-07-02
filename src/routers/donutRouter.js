const express = require('express');
const router = express.Router();


const {
    addDonut,
    getAllDonuts,
    getByIdDonut,
    updateDonut,
    removeDonut
  
} = require('../controllers/donutController');
const { verifyToken, verifyAdmin }= require('../middlewares/auth');

router.post('/', addDonut)
router.get('/', getAllDonuts);
router.get('/:idDonut', getByIdDonut);
router.patch('/updateDonut/:idDonut',verifyToken, verifyAdmin, updateDonut);
router.delete('/removeDonut/:idDonut',verifyToken, verifyAdmin, removeDonut);


module.exports = router;