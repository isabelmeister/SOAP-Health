const cors = require('cors');
app.use(cors());

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Dados em memória
const sizes = [
  { id: 'sm', name: 'Small', basePrice: 8 },
  { id: 'md', name: 'Medium', basePrice: 10 },
  { id: 'lg', name: 'Large', basePrice: 12 },
  { id: 'xlg', name: 'Extra Large', basePrice: 14 },
];

const ingredients = [
  { id: 'cheese', name: 'Cheese', extraPrice: 0 },
  { id: 'chicken', name: 'Chicken', extraPrice: 0 },
  { id: 'pepperoni', name: 'Pepperoni', extraPrice: 1.5 },
  { id: 'mushroom', name: 'Mushroom', extraPrice: 1 },
  { id: 'olive', name: 'Olive', extraPrice: 0.5 },
  { id: 'ham', name: 'Ham', extraPrice: 2 },
  { id: 'pineapple', name: 'Pineapple', extraPrice: 1.5 },
];

let pizzas = [];
let nextId = 1;

// 1. GET /health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 2. GET /sizes
app.get('/sizes', (req, res) => {
  res.json(sizes);
});

// 3. GET /ingredients
app.get('/ingredients', (req, res) => {
  res.json(ingredients);
});

// 4. POST /pizzas
app.post('/pizzas', (req, res) => {
  const { customerName, sizeId, ingredientIds } = req.body;

  // Validação
  if (!customerName || customerName.trim() === '') {
    return res.status(400).json({ error: 'customerName is required and cannot be empty' });
  }

  const size = sizes.find(s => s.id === sizeId);
  if (!size) {
    return res.status(400).json({ error: `Invalid sizeId: ${sizeId}` });
  }

  const ingredientsList = [];
  for (const ingId of ingredientIds) {
    const ingredient = ingredients.find(ing => ing.id === ingId);
    if (!ingredient) {
      return res.status(400).json({ error: `Invalid ingredientId: ${ingId}` });
    }
    ingredientsList.push(ingredient);
  }

  // Cálculo do preço final
  const ingredientsPrice = ingredientsList.reduce((sum, ing) => sum + ing.extraPrice, 0);
  const finalPrice = size.basePrice + ingredientsPrice;

  // Criação do objeto pizza
  const pizza = {
    id: String(nextId++),
    customerName: customerName.trim(),
    size: size,
    ingredients: ingredientsList,
    finalPrice,
    createdAt: new Date().toISOString(),
  };

  pizzas.push(pizza);
  res.status(201).json(pizza);
});

// 5. GET /pizzas
app.get('/pizzas', (req, res) => {
  let result = [...pizzas];

  // Filtro por nome do cliente
  const { customerName, sortBy, order } = req.query;
  if (customerName) {
    result = result.filter(p =>
      p.customerName.toLowerCase().includes(customerName.toLowerCase())
    );
  }

  // Ordenação
  if (sortBy === 'finalPrice' || sortBy === 'createdAt') {
    const orderMultiplier = order === 'desc' ? -1 : 1;
    result.sort((a, b) => {
      if (sortBy === 'finalPrice') {
        return (a.finalPrice - b.finalPrice) * orderMultiplier;
      } else {
        return (new Date(a.createdAt) - new Date(b.createdAt)) * orderMultiplier;
      }
    });
  }

  // Para a listagem, retornar apenas campos básicos
  const list = result.map(p => ({
    id: p.id,
    customerName: p.customerName,
    finalPrice: p.finalPrice,
    createdAt: p.createdAt,
  }));
  res.json(list);
});

// 6. GET /pizzas/:id
app.get('/pizzas/:id', (req, res) => {
  const pizza = pizzas.find(p => p.id === req.params.id);
  if (!pizza) {
    return res.status(404).json({ error: 'Pizza not found' });
  }
  res.json(pizza);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});