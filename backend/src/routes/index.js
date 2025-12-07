const express = require('express');
const router = express.Router();

const healthRoutes = require('./health');
const sizesRoutes = require('./sizes');
const ingredientsRoutes = require('./ingredients');
const pizzasRoutes = require('./pizzas');

router.use('/health', healthRoutes);
router.use('/sizes', sizesRoutes);
router.use('/ingredients', ingredientsRoutes);
router.use('/pizzas', pizzasRoutes);

module.exports = router;