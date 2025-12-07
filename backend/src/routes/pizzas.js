const express = require('express');
const router = express.Router();
const { createPizza, getPizzas, getPizzaById } = require('../controllers/pizzasController');

router.post('/', createPizza);
router.get('/', getPizzas);
router.get('/:id', getPizzaById);

module.exports = router;