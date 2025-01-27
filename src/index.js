import { AuthService } from "./services/AuthService.js";
import { ProductCatalogService } from "./services/ProductCatalogService.js";
import { OrderService } from "./services/OrderService.js";
import { PaymentService } from "./services/PaymentService.js";
import { Logger } from "./utils/Logger.js";

class Application {
  constructor() {
    // Inicializar serviços
    this.authService = new AuthService();
    this.productCatalogService = new ProductCatalogService();
    this.orderService = new OrderService(
      this.productCatalogService,
      this.authService
    );
    this.paymentService = new PaymentService(this.orderService);

    Logger.log("Application", "All services initialized");
  }

  // Método para demonstrar o fluxo completo
  async demonstrateFlow() {
    try {
      // 1. Registrar usuário
      const user = this.authService.registerUser(
        "john.doe",
        "password123",
        "john@example.com"
      );

      // 2. Login
      const { sessionToken } = this.authService.login(
        "john.doe",
        "password123"
      );

      // 3. Adicionar produtos ao catálogo
      const product1 = this.productCatalogService.addProduct(
        "Laptop",
        1200.0,
        10
      );
      const product2 = this.productCatalogService.addProduct("Mouse", 25.0, 50);

      // 4. Criar pedido
      const order = this.orderService.createOrder(sessionToken, [
        { productId: product1.id, quantity: 1 },
        { productId: product2.id, quantity: 2 },
      ]);

      // 5. Processar pagamento
      const payment = this.paymentService.processPayment(order.id, {
        type: "CREDIT_CARD",
        cardNumber: "**** **** **** 1234",
      });

      Logger.log("Application", "Flow demonstration completed successfully");
      return { user, order, payment };
    } catch (error) {
      Logger.error(
        "Application",
        `Flow demonstration failed: ${error.message}`
      );
      throw error;
    }
  }
}

export { Application };
