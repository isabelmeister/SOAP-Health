const { getAllIngredients } = require('../data/ingredientsData');

const getIngredients = (req, res) => {
  try {
    const ingredients = getAllIngredients();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
};

module.exports = {
  getIngredients
};