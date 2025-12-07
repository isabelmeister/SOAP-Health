class Pizza {
  constructor({ id, customerName, size, ingredients, finalPrice, createdAt }) {
    this.id = id;
    this.customerName = customerName;
    this.size = size;
    this.ingredients = ingredients;
    this.finalPrice = finalPrice;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = Pizza;