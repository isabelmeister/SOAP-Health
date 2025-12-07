
const { ERROR_MESSAGES } = require('../utils/constants');
const { findSizeById, findIngredientById } = require('../data/sizesData');

const validatePizzaCreation = (customerName, sizeId, ingredientIds, sizes, ingredients) => {
  const errors = [];

  if (!customerName || customerName.trim() === '') {
    errors.push(ERROR_MESSAGES.CUSTOMER_NAME_REQUIRED);
  }

  if (!sizeId) {
    errors.push('sizeId is required');
  } else if (!findSizeById(sizeId)) {
    errors.push(ERROR_MESSAGES.INVALID_SIZE_ID(sizeId));
  }

  if (!Array.isArray(ingredientIds)) {
    errors.push('ingredientIds must be an array');
  } else {
    ingredientIds.forEach(ingId => {
      if (!findIngredientById(ingId)) {
        errors.push(ERROR_MESSAGES.INVALID_INGREDIENT_ID(ingId));
      }
    });
  }

  return errors;
};

module.exports = {
  validatePizzaCreation
};