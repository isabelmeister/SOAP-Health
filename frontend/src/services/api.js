const API_BASE = 'http://localhost:3001';

// Funções para manipulação de sizes
export const getSizes = async () => {
  try {
    const response = await fetch(`${API_BASE}/sizes`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching sizes:', error);
    throw error;
  }
};

// Funções para manipulação de ingredients
export const getIngredients = async () => {
  try {
    const response = await fetch(`${API_BASE}/ingredients`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
};

// Funções para manipulação de pizzas
export const getOrders = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.customerName) params.append('customerName', filters.customerName);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);
    
    const response = await fetch(`${API_BASE}/pizzas?${params}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/pizzas/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching pizza ${id}:`, error);
    throw error;
  }
};

export const createNewOrder = async (pizzaData) => {
  try {
    const response = await fetch(`${API_BASE}/pizzas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pizzaData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating pizza:', error);
    throw error;
  }
};

// Exportando todas as funções como um objeto também para conveniência
const PizzaService = {
  getSizes,
  getIngredients,
  getOrders,
  getOrderById,
  createNewOrder
};

export default PizzaService;