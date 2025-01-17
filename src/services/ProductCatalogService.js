class ProductCatalogService {
  constructor() {
    this.products = new Map();
    Logger.log("ProductCatalogService", "Initialized");
  }

  addProduct(name, price, stockQuantity) {
    const product = {
      id: uuidv4(),
      name,
      price,
      stockQuantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.set(product.id, product);
    Logger.log("ProductCatalogService", `Product ${name} added successfully`);
    return product;
  }

  getProduct(productId) {
    const product = this.products.get(productId);
    if (!product) {
      Logger.error("ProductCatalogService", `Product ${productId} not found`);
      throw new Error("Product not found");
    }
    return product;
  }

  updateStock(productId, quantity) {
    const product = this.getProduct(productId);

    if (product.stockQuantity + quantity < 0) {
      Logger.error(
        "ProductCatalogService",
        `Insufficient stock for product ${productId}`
      );
      throw new Error("Insufficient stock");
    }

    product.stockQuantity += quantity;
    product.updatedAt = new Date();

    Logger.log(
      "ProductCatalogService",
      `Stock updated for product ${productId}`
    );
    return product;
  }

  listProducts() {
    return Array.from(this.products.values());
  }

  checkAvailability(productId, quantity) {
    const product = this.getProduct(productId);
    return product.stockQuantity >= quantity;
  }
}

export { AuthService, ProductCatalogService };
