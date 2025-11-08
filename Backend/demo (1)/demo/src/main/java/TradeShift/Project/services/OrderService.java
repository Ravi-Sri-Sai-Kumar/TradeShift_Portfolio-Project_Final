package TradeShift.Project.services;

import TradeShift.Project.entity.Order;
import TradeShift.Project.entity.Portfolio;
import TradeShift.Project.entity.OrderType;
import TradeShift.Project.repository.OrderRepository;
import TradeShift.Project.repository.PortfolioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    public Order placeOrder(Long portfolioId, String symbol, OrderType type, Double quantity, Double price) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));

        Order order = new Order();
        order.setPortfolio(portfolio);
        order.setSymbol(symbol);
        order.setType(type);
        order.setQuantity(quantity);
        order.setPrice(price);
        order.setStatus("Completed");

        // Logic for updating assets can be added here, now just order save.
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByPortfolio(Long portfolioId) {
        return orderRepository.findByPortfolioId(portfolioId);
    }
}
