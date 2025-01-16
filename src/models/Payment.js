class Payment {
  constructor(id, orderId, amount, status = PaymentStatus.PENDING) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}

export default Payment;
