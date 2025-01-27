import { v4 as uuidv4 } from "uuid";
import { Logger } from "../utils/Logger.js";
import OrderStatus from "../enums/OrderStatus.js";

class OrderService {
  constructor(productCatalogService, authService) {
    this.orders = new Map();
    this.productCatalogService = productCatalogService;
    this.authService = authService;
    Logger.log("OrderService", "Initialized");
  }

  createOrder(sessionToken, items) {
    // Validar sessão
    const session = this.authService.validateSession(sessionToken);

    // Validar e processar itens
    const processedItems = items.map((item) => {
      const product = this.productCatalogService.getProduct(item.productId);

      if (
        !this.productCatalogService.checkAvailability(
          item.productId,
          item.quantity
        )
      ) {
        Logger.error(
          "OrderService",
          `Insufficient stock for product ${item.productId}`
        );
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        subtotal: product.price * item.quantity,
      };
    });

    const order = {
      id: uuidv4(),
      userId: session.userId,
      items: processedItems,
      status: OrderStatus.CREATED,
      total: processedItems.reduce((sum, item) => sum + item.subtotal, 0),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Reservar estoque
    processedItems.forEach((item) => {
      this.productCatalogService.updateStock(item.productId, -item.quantity);
    });

    this.orders.set(order.id, order);
    Logger.log("OrderService", `Order ${order.id} created successfully`);
    return order;
  }

  getOrder(orderId) {
    const order = this.orders.get(orderId);
    if (!order) {
      Logger.error("OrderService", `Order ${orderId} not found`);
      throw new Error("Order not found");
    }
    return order;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.getOrder(orderId);
    order.status = newStatus;
    order.updatedAt = new Date();

    Logger.log(
      "OrderService",
      `Order ${orderId} status updated to ${newStatus}`
    );
    return order;
  }

  cancelOrder(orderId) {
    const order = this.getOrder(orderId);

    if (order.status === OrderStatus.PAID) {
      Logger.error("OrderService", `Cannot cancel paid order ${orderId}`);
      throw new Error("Cannot cancel paid order");
    }

    // Devolver itens ao estoque
    order.items.forEach((item) => {
      this.productCatalogService.updateStock(item.productId, item.quantity);
    });

    order.status = OrderStatus.CANCELLED;
    order.updatedAt = new Date();

    Logger.log("OrderService", `Order ${orderId} cancelled successfully`);
    return order;
  }
}
export { OrderService };
