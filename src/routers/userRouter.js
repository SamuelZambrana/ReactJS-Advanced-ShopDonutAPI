const express = require('express');
const router = express.Router();
const {

    addUser,
    getFavoritesDonuts,
    addFavouriteDonut,
    removeFavouriteDonut,
    updateMyProfile,
    addlikeRecipes

} = require('../controllers/userController');
const { verifyToken, verifyAdmin }= require('../middlewares/auth');


router.post('/', addUser);
router.get('/searchUser/favorites',verifyToken, getFavoritesDonuts);
router.patch('/addFavourites/:idRecipes', verifyToken, addFavouriteDonut);
router.patch('/removefavourites/:idRecipes', verifyToken, removeFavouriteDonut);
router.patch('/myProfile', verifyToken, verifyAdmin, updateMyProfile);
router.post('/addLike/:idRecipes', verifyToken, addlikeRecipes);



module.exports = router;