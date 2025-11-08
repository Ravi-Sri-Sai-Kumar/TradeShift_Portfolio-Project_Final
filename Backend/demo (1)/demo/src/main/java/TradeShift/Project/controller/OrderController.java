package TradeShift.Project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import TradeShift.Project.entity.Order;
import TradeShift.Project.entity.OrderType;
import TradeShift.Project.services.OrderService;
import TradeShift.Project.repository.OrderRepository;
import TradeShift.Project.dto.OrderRequestDTO;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio/{portfolioId}/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    // ---- 1. Original endpoint: portfolio-wise placement ----
    @PostMapping
    public Order placeOrder(
            @PathVariable Long portfolioId,
            @RequestBody Map<String, Object> orderRequest
    ) {
        System.out.println("Done from UI to Represent BUY/SELL: " + orderRequest + " PortfolioID: " + portfolioId);

        String symbol = (String) orderRequest.get("symbol");
        String type = (String) orderRequest.get("type"); // "BUY" or "SELL"
        Double quantity = Double.valueOf(orderRequest.get("quantity").toString());
        Double price = Double.valueOf(orderRequest.get("price").toString());

        return orderService.placeOrder(portfolioId, symbol, OrderType.valueOf(type), quantity, price);
    }

    // ---- 2. Direct dashboard/Public order endpoint (no portfolio needed) ----
    @PostMapping("/public")
    @CrossOrigin(origins = "http://localhost:3000")
    public Order quickOrder(@RequestBody OrderRequestDTO dto) {
        Order order = new Order();
        order.setSymbol(dto.getSymbol());
        order.setType(OrderType.valueOf(dto.getType()));
        order.setQuantity(dto.getQuantity());
        order.setPrice(dto.getPrice());
        order.setOrderTime(java.time.LocalDateTime.now());
        order.setStatus("SUCCESS");
        // (Optional) Link portfolio if you want: order.setPortfolio(...);
        return orderRepository.save(order);
    }

    @GetMapping
    public List<Order> getOrders(@PathVariable Long portfolioId) {
        return orderService.getOrdersByPortfolio(portfolioId);
    }

    // --- NEW: Get top 5 recent orders globally ---
    @GetMapping("/recent/all")
    public List<Order> getAllRecentOrders() {
        return orderRepository.findTop5ByOrderByOrderTimeDesc();
    }

    // --- NEW: Get top 5 recent orders for a portfolio ---
    @GetMapping("/recent")
    public List<Order> getRecentOrdersForPortfolio(@PathVariable Long portfolioId) {
        return orderRepository.findTop5ByPortfolioIdOrderByOrderTimeDesc(portfolioId);
    }
}
