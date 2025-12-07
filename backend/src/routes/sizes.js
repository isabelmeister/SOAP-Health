const express = require('express');
const router = express.Router();
const { getSizes } = require('../controllers/sizesController');

router.get('/', getSizes);

module.exports = router;