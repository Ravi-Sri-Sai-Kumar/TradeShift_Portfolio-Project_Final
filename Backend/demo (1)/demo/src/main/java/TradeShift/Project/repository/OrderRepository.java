package TradeShift.Project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import TradeShift.Project.entity.Order;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByPortfolioId(Long portfolioId);
    List<Order> findTop5ByPortfolioIdOrderByOrderTimeDesc(Long portfolioId);
    List<Order> findTop5ByOrderByOrderTimeDesc();
}
