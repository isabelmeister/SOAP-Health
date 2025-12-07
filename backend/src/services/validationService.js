const { ERROR_MESSAGES } = require('../utils/constants');

const validatePizzaCreation = (customerName, sizeId, ingredientIds) => {
  const errors = [];

  if (!customerName || customerName.trim() === '') {
    errors.push(ERROR_MESSAGES.CUSTOMER_NAME_REQUIRED);
  }

  if (!sizeId) {
    errors.push('sizeId is required');
  }

  if (!Array.isArray(ingredientIds)) {
    errors.push('ingredientIds must be an array');
  }
  return errors;
};

module.exports = {
  validatePizzaCreation
};