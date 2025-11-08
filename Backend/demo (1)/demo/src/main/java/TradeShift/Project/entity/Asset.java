package TradeShift.Project.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Entity
@Table(name = "assets")
@Data
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;
    private Double quantity;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonIgnore // Prevent cyclic reference
    private Portfolio portfolio;
}
