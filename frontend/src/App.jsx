import { useState, useEffect } from "react";
import { getSizes, getIngredients, getOrders } from "./services/api";
import NewOrders from "./components/NewOrders";
import OrdersSearch from "./components/OrdersSearch";
import OrdersList from "./components/OrdersList";

const App = () => {
  const [sizes, setSizes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filterCustomerName, setFilterCustomerName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [sizesData, ingredientsData] = await Promise.all([
          getSizes(),
          getIngredients(),
        ]);
        setSizes(sizesData);
        setIngredients(ingredientsData);
      } catch (error) {
        setError(`Failed to load initial data \n Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const loadPizzas = async () => {
    setLoading(true);
    try {
      const filters = {
        customerName: filterCustomerName,
        sortBy,
        order,
      };
      const data = await getOrders(filters);
      setPizzas(data);
    } catch (error) {
      setError(`Failed to load pizzas \n Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPizzas();
  }, [filterCustomerName, sortBy, order]);

  const handlePizzaCreated = () => {
    loadPizzas();
  };

  return (
    <div>
      <h1>Pizza Builder</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <NewOrders
            sizes={sizes}
            ingredients={ingredients}
            onPizzaCreated={handlePizzaCreated}
            setLoading={setLoading}
          />

          <hr />

          <OrdersSearch />

          <hr />

          <OrdersList
            pizzas={pizzas}
            filterCustomerName={filterCustomerName}
            setFilterCustomerName={setFilterCustomerName}
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
          />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
