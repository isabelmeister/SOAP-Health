const pizzaService = require('../services/pizzaService');

const createPizza = (req, res) => {
  try {
    const { customerName, sizeId, ingredientIds } = req.body;
    const pizza = pizzaService.createPizzaOrder(customerName, sizeId, ingredientIds);
    res.status(201).json(pizza);
  } catch (error) {
    if (error.message.includes('Invalid') || error.message.includes('required')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create pizza' });
  }
};

const getPizzas = (req, res) => {
  try {
    const filters = {
      customerName: req.query.customerName,
      sortBy: req.query.sortBy,
      order: req.query.order
    };
    
    const pizzas = pizzaService.getAllPizzaOrders(filters);
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pizzas' });
  }
};

const getPizzaById = (req, res) => {
  try {
    const pizza = pizzaService.getPizzaOrderById(req.params.id);
    res.json(pizza);
  } catch (error) {
    if (error.message === 'Pizza not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to fetch pizza' });
  }
};

module.exports = {
  createPizza,
  getPizzas,
  getPizzaById
};