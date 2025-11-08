package TradeShift.Project.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;

    @Enumerated(EnumType.STRING)
    private OrderType type; // BUY or SELL

    private Double quantity;

    private Double price;

    private LocalDateTime orderTime = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @Column(name = "status")
    private String status;
}
