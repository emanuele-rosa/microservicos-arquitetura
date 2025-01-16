class Order {
  constructor(id, userId, items, status = OrderStatus.CREATED) {
    this.id = id;
    this.userId = userId;
    this.items = items; // Array of { productId, quantity, price }
    this.status = status;
    this.total = this.calculateTotal();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  calculateTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}

export default Order;
