const ERROR_MESSAGES = {
  CUSTOMER_NAME_REQUIRED: 'customerName is required and cannot be empty',
  INVALID_SIZE_ID: (sizeId) => `Invalid sizeId: ${sizeId}`,
  INVALID_INGREDIENT_ID: (ingId) => `Invalid ingredientId: ${ingId}`,
  PIZZA_NOT_FOUND: 'Pizza not found',
  SERVER_ERROR: 'Internal server error'
};

const SORT_OPTIONS = {
  FINAL_PRICE: 'finalPrice',
  CREATED_AT: 'createdAt'
};

const ORDER_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc'
};

module.exports = {
  ERROR_MESSAGES,
  SORT_OPTIONS,
  ORDER_OPTIONS
};