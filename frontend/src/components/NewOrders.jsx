import { useState } from "react";
import { createNewOrder } from "../services/api";

const NewOrders = ({ sizes, ingredients, onPizzaCreated, setLoading }) => {
  const [customerName, setCustomerName] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [ingredientIds, setIngredientIds] = useState([]);

  const handleIngredientChange = (ingId) => {
    setIngredientIds((prev) =>
      prev.includes(ingId)
        ? prev.filter((id) => id !== ingId)
        : [...prev, ingId]
    );
  };

  const handleCreatePizza = async (e) => {
    e.preventDefault();

    if (!customerName) {
      alert("Please fill in customer name");
      return;
    }

    if (!sizeId) {
      alert("Please select a size");
      return;
    }

    if (ingredientIds.length < 3) {
      alert("Please select at least 3 ingredients");
      return;
    }

    setLoading(true);
    try {
      const pizza = await createNewOrder({
        customerName,
        sizeId,
        ingredientIds,
      });

      alert(
        `Pizza created successfully!\nFinal price: $${pizza.finalPrice.toFixed(
          2
        )}`
      );
      setCustomerName("");
      setSizeId("");
      setIngredientIds([]);
      onPizzaCreated();
    } catch (error) {
      alert(`Failed to create pizza \n Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Pizza</h2>
      <form onSubmit={handleCreatePizza}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label>Size:</label>
          {sizes.map((size) => (
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
          )) || 'Sizes not available'}
        </div>

        <div>
          <label>Ingredients:</label>
          {ingredients.map((ing) => (
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
          )) || 'Ingredients not available'}
        </div>

        <button type="submit">Create Pizza</button>
      </form>
    </div>
  );
};

export default NewOrders;
