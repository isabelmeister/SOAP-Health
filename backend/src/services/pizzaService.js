const { findIngredientsByIds } = require('../data/ingredientsData');
const { findSizeById } = require('../data/sizesData');
const { calculateFinalPrice } = require('../utils/helpers');
const { getAllPizzas, getPizzaById, createPizza } = require('../data/pizzasData');
const { validatePizzaCreation } = require('./validationService');

const createPizzaOrder = (customerName, sizeId, ingredientIds) => {
  const validationErrors = validatePizzaCreation(customerName, sizeId, ingredientIds);
  if (validationErrors.length > 0) {
    throw new Error(validationErrors.join(', '));
  }

  const size = findSizeById(sizeId);
  const ingredients = findIngredientsByIds(ingredientIds);

  const finalPrice = calculateFinalPrice(size, ingredients);

  const pizzaData = {
    customerName: customerName.trim(),
    size,
    ingredients,
    finalPrice,
    createdAt: new Date().toISOString()
  };

  const savedPizza = createPizza(pizzaData);
  
  return savedPizza;
};

const getAllPizzaOrders = (filters = {}) => {
  let pizzas = getAllPizzas();
  const { customerName, sortBy, order = 'asc' } = filters;

  if (customerName) {
    pizzas = pizzas.filter(p =>
      p.customerName.toLowerCase().includes(customerName.toLowerCase())
    );
  }

  if (sortBy === 'finalPrice' || sortBy === 'createdAt') {
    const orderMultiplier = order === 'desc' ? -1 : 1;
    pizzas.sort((a, b) => {
      if (sortBy === 'finalPrice') {
        return (a.finalPrice - b.finalPrice) * orderMultiplier;
      } else {
        return (new Date(a.createdAt) - new Date(b.createdAt)) * orderMultiplier;
      }
    });
  }

  return pizzas;
};

const getPizzaOrderById = (id) => {
  const pizza = getPizzaById(id);
  if (!pizza) {
    throw new Error('Pizza not found');
  }
  return pizza;
};

module.exports = {
  createPizzaOrder,
  getAllPizzaOrders,
  getPizzaOrderById
};