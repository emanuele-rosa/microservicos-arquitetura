import { Application } from "../index.js";

async function runDemo() {
  const app = new Application();

  try {
    // 1. Registrar um usuário
    console.log("\n\n=== Teste 1: Registro de Usuário ===");
    const user = app.authService.registerUser(
      "emanuele.leli",
      "leli123",
      "emanuele.leli@email.com"
    );

    console.log("Usuário registrado:", user);

    // 2. Login
    console.log("\n\n=== Teste 2: Login ===");
    const { sessionToken } = app.authService.login("emanuele.leli", "leli123");

    console.log("Login realizado. Token:", sessionToken);

    // 3. Adicionar produtos
    console.log("\n\n=== Teste 3: Cadastro de Produtos ===");
    const produto1 = app.productCatalogService.addProduct(
      "Notebook",
      5000.0,
      10
    );

    const produto2 = app.productCatalogService.addProduct("Teclado", 100.0, 20);

    console.log("Produtos cadastrados:", { produto1, produto2 });

    // 4. Criar pedido
    console.log("\n\n=== Teste 4: Criação de Pedido ===");
    const pedido = app.orderService.createOrder(sessionToken, [
      { productId: produto1.id, quantity: 1 },
      { productId: produto2.id, quantity: 2 },
    ]);

    console.log("Pedido criado:", pedido);

    // 5. Processar pagamento
    console.log("\n\n=== Teste 5: Processamento de Pagamento ===");
    const pagamento = app.paymentService.processPayment(pedido.id, {
      type: "CREDIT_CARD",
      cardNumber: "4111111111111111",
      expiryDate: "12/25",
      cvv: "123",
    });
    console.log("Pagamento processado:", pagamento);

    // 6. Verificar estado final
    console.log("\n\n=== Teste 6: Verificação Final ===");
    const pedidoFinal = app.orderService.getOrder(pedido.id);
    console.log("Estado final do pedido:", pedidoFinal);

    console.log("\n\n=== Teste concluído com sucesso! ===");
  } catch (error) {
    console.error("\n\nErro durante o teste:", error.message);
  }
}

// Executar demo
runDemo();
