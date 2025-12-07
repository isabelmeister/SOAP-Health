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

module.exports = {
  calculateFinalPrice,
  formatPizzaList
};