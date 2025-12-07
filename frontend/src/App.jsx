import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3001';

const App = () => {
  const [sizes, setSizes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [ingredientIds, setIngredientIds] = useState([]);

  // For listing pizzas
  const [filterCustomerName, setFilterCustomerName] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');

  // For searching by ID
  const [searchId, setSearchId] = useState('');
  const [searchedPizza, setSearchedPizza] = useState(null);
  const [searchError, setSearchError] = useState('');

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [sizesRes, ingredientsRes] = await Promise.all([
          fetch(`${API_BASE}/sizes`),
          fetch(`${API_BASE}/ingredients`)
        ]);
        const sizesData = await sizesRes.json();
        const ingredientsData = await ingredientsRes.json();
        setSizes(sizesData);
        setIngredients(ingredientsData);
      } catch (error) {
        setError(`Failed to load initial data \n Error: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Load pizzas
  const loadPizzas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCustomerName) params.append('customerName', filterCustomerName);
      if (sortBy) params.append('sortBy', sortBy);
      if (order) params.append('order', order);
      
      const response = await fetch(`${API_BASE}/pizzas?${params}`);
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      setError(`Failed to load pizzas \n Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Load pizzas on mount and when filter/sort changes
  useEffect(() => {
    loadPizzas();
  }, [filterCustomerName, sortBy, order]);

  // Handle ingredient checkbox change
  const handleIngredientChange = (ingId) => {
    setIngredientIds(prev =>
      prev.includes(ingId)
        ? prev.filter(id => id !== ingId)
        : [...prev, ingId]
    );
  };

  // Create pizza
  const handleCreatePizza = async (e) => {
    e.preventDefault();
    if (!customerName || !sizeId) {
      alert('Please fill in customer name and select a size');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/pizzas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          sizeId,
          ingredientIds,
        }),
      });
      
      if (response.ok) {
        const pizza = await response.json();
        alert(`Pizza created successfully!\nFinal price: $${pizza.finalPrice.toFixed(2)}`);
        // Reset form
        setCustomerName('');
        setSizeId('');
        setIngredientIds([]);
        // Reload pizzas
        loadPizzas();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Failed to create pizza \n Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Search pizza by ID
  const handleSearchById = async () => {
    if (!searchId) {
      alert('Please enter a Pizza ID');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/pizzas/${searchId}`);
      if (response.ok) {
        const pizza = await response.json();
        setSearchedPizza(pizza);
        setSearchError('');
      } else {
        const errorData = await response.json();
        setSearchedPizza(null);
        setSearchError(errorData.error);
      }
    } catch (error) {
      setSearchError(`Failed to search pizza \n Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pizza Builder</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Create Pizza</h2>
      <form onSubmit={handleCreatePizza}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Size:</label>
          {sizes.map(size => (
            <div key={size.id}>
              <input
                type="radio"
                id={`size-${size.id}`}
                name="size"
                value={size.id}
                checked={sizeId === size.id}
                onChange={() => setSizeId(size.id)}
              />
              <label htmlFor={`size-${size.id}`}>
                {size.name} (${size.basePrice.toFixed(2)})
              </label>
            </div>
          ))}
        </div>
        
        <div>
          <label>Ingredients:</label>
          {ingredients.map(ing => (
            <div key={ing.id}>
              <input
                type="checkbox"
                id={`ing-${ing.id}`}
                checked={ingredientIds.includes(ing.id)}
                onChange={() => handleIngredientChange(ing.id)}
              />
              <label htmlFor={`ing-${ing.id}`}>
                {ing.name} (${ing.extraPrice.toFixed(2)})
              </label>
            </div>
          ))}
        </div>
        
        <button type="submit">Create Pizza</button>
      </form>

      <hr />

      <h2>Search Pizza by ID</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Pizza ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearchById}>Search</button>
      </div>
      
      {searchedPizza && (
        <div>
          <h3>Pizza Details</h3>
          <p><strong>ID:</strong> {searchedPizza.id}</p>
          <p><strong>Customer:</strong> {searchedPizza.customerName}</p>
          <p><strong>Size:</strong> {searchedPizza.size.name} (${searchedPizza.size.basePrice})</p>
          <p><strong>Ingredients:</strong>
            {searchedPizza.ingredients.map(ing => (
              <span key={ing.id}> {ing.name} (${ing.extraPrice})</span>
            ))}
          </p>
          <p><strong>Final Price:</strong> ${searchedPizza.finalPrice.toFixed(2)}</p>
          <p><strong>Created At:</strong> {new Date(searchedPizza.createdAt).toLocaleString()}</p>
        </div>
      )}
      {searchError && <p style={{ color: 'red' }}>Error: {searchError}</p>}

      <hr />

      <h2>All Pizzas</h2>
      <div>
        <label>Filter by Customer Name:</label>
        <input
          type="text"
          value={filterCustomerName}
          onChange={(e) => setFilterCustomerName(e.target.value)}
          placeholder="Type to filter..."
        />
      </div>
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="finalPrice">Final Price</option>
          <option value="createdAt">Created At</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Final Price</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map(pizza => (
            <tr key={pizza.id}>
              <td>{pizza.id}</td>
              <td>{pizza.customerName}</td>
              <td>${pizza.finalPrice.toFixed(2)}</td>
              <td>{new Date(pizza.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;