import PaymentStatus from "../enums/PaymentStatus.js";

class PaymentService {
  constructor(orderService) {
    this.payments = new Map();
    this.orderService = orderService;
    Logger.log("PaymentService", "Initialized");
  }

  processPayment(orderId, paymentDetails) {
    const order = this.orderService.getOrder(orderId);

    if (order.status !== OrderStatus.CREATED) {
      Logger.error(
        "PaymentService",
        `Invalid order status for payment: ${order.status}`
      );
      throw new Error("Invalid order status for payment");
    }

    // Simular validação de pagamento
    const paymentSuccess = this.simulatePaymentProcessing(paymentDetails);

    const payment = {
      id: uuidv4(),
      orderId: orderId,
      amount: order.total,
      status: paymentSuccess ? PaymentStatus.COMPLETED : PaymentStatus.FAILED,
      details: paymentDetails,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.payments.set(payment.id, payment);

    // Atualizar status do pedido
    this.orderService.updateOrderStatus(
      orderId,
      paymentSuccess ? OrderStatus.PAID : OrderStatus.FAILED
    );

    Logger.log(
      "PaymentService",
      `Payment for order ${orderId} processed with status ${payment.status}`
    );
    return payment;
  }

  simulatePaymentProcessing(paymentDetails) {
    // Simular falhas aleatórias e validações
    const simulatedSuccess = Math.random() > 0.2; // 80% de chance de sucesso

    if (!simulatedSuccess) {
      Logger.error("PaymentService", "Payment processing failed");
    }

    return simulatedSuccess;
  }

  getPayment(paymentId) {
    const payment = this.payments.get(paymentId);
    if (!payment) {
      Logger.error("PaymentService", `Payment ${paymentId} not found`);
      throw new Error("Payment not found");
    }
    return payment;
  }

  getPaymentsByOrder(orderId) {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.orderId === orderId
    );
  }
}

export { PaymentService };
