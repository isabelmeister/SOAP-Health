import { useState } from 'react';
import { getOrderById } from '../services/api';

const OrdersSearch = () => {
  const [searchId, setSearchId] = useState('');
  const [searchedPizza, setSearchedPizza] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearchById = async () => {
    if (!searchId) {
      alert('Please enter your solicitation order number');
      return;
    }
    
    setSearchLoading(true);
    try {
      const pizza = await getOrderById(searchId);
      setSearchedPizza(pizza);
      setSearchError('');
    } catch (error) {
      setSearchedPizza(null);
      setSearchError(error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchId('');
    setSearchedPizza(null);
    setSearchError('');
  };

  return (
    <div>
      <h2>Search Pizza by ID</h2>
      <div>
        <input
          type="text"
          placeholder="Enter your solicitation order number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearchById} disabled={searchLoading}>
          {searchLoading ? 'Searching...' : 'Search'}
        </button>
        {searchedPizza && (
          <button onClick={handleClearSearch} style={{ marginLeft: '10px' }}>
            Clear
          </button>
        )}
      </div>
      
      {searchedPizza && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
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
    </div>
  );
};

export default OrdersSearch;