let pizzas = [];
let nextId = 1;

const getAllPizzas = () => [...pizzas];
const getPizzaById = (id) => pizzas.find(p => p.id === id);
const createPizza = (pizzaData) => {
  const pizza = {
    ...pizzaData,
    id: String(nextId++)
  };
  pizzas.push(pizza);
  return pizza;
};

module.exports = {
  pizzas,
  getAllPizzas,
  getPizzaById,
  createPizza
};