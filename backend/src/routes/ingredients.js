const express = require('express');
const router = express.Router();
const { getIngredients } = require('../controllers/ingredientsController');

router.get('/', getIngredients);

module.exports = router;