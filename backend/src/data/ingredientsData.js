const ingredients = [
  { id: 'cheese', name: 'Cheese', extraPrice: 0 },
  { id: 'chicken', name: 'Chicken', extraPrice: 0 },
  { id: 'pepperoni', name: 'Pepperoni', extraPrice: 1.5 },
  { id: 'mushroom', name: 'Mushroom', extraPrice: 1 },
  { id: 'olive', name: 'Olive', extraPrice: 0.5 },
  { id: 'ham', name: 'Ham', extraPrice: 2 },
  { id: 'pineapple', name: 'Pineapple', extraPrice: 1.5 },
];

const findIngredientsByIds = (ingredientIds) => 
  ingredientIds.map(id => ingredients.find(ing => ing.id === id)).filter(Boolean);
const getAllIngredients = () => ingredients;

module.exports = {
  ingredients,
  findIngredientsByIds,
  getAllIngredients
};