const OrdersList = ({
  pizzas,
  filterCustomerName,
  setFilterCustomerName,
  sortBy,
  setSortBy,
  order,
  setOrder
}) => {
  return (
    <div>
      <h2>All Pizzas</h2>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Filter by Customer Name:</label>
          <input
            type="text"
            value={filterCustomerName}
            onChange={(e) => setFilterCustomerName(e.target.value)}
            placeholder="Type to filter..."
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginRight: '10px' }}>
            <option value="">None</option>
            <option value="finalPrice">Final Price</option>
            <option value="createdAt">Created At</option>
          </select>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      
      {pizzas.length === 0 ? (
        <p>No pizzas found.</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Customer Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Final Price</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map(pizza => (
              <tr key={pizza.id}>
                <td style={{ padding: '10px' }}>{pizza.id}</td>
                <td style={{ padding: '10px' }}>{pizza.customerName}</td>
                <td style={{ padding: '10px' }}>${pizza.finalPrice.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>{new Date(pizza.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersList;