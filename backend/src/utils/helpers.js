const calculateFinalPrice = (size, ingredients) => {
  const basePrice = size.basePrice;
  const ingredientsPrice = ingredients.reduce((sum, ing) => sum + ing.extraPrice, 0);
  return basePrice + ingredientsPrice;
};

const formatPizzaList = (pizzas) => {
  return pizzas.map(pizza => ({
    id: pizza.id,
    customerName: pizza.customerName,
    finalPrice: pizza.finalPrice,
    createdAt: pizza.createdAt
  }));
};

const validatePizzaData = (customerName, sizeId, ingredientIds) => {
  const errors = [];
  
  if (!customerName || customerName.trim() === '') {
    errors.push('customerName is required and cannot be empty');
  }
  
  if (!sizeId) {
    errors.push('sizeId is required');
  }
  
  return errors;
};

module.exports = {
  calculateFinalPrice,
  formatPizzaList,
  validatePizzaData
};