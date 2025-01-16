class Product {
  constructor(id, name, price, stockQuantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStock(quantity) {
    if (this.stockQuantity + quantity < 0) {
      throw new Error("Insufficient stock");
    }
    this.stockQuantity += quantity;
    this.updatedAt = new Date();
  }
}

export default Product;
