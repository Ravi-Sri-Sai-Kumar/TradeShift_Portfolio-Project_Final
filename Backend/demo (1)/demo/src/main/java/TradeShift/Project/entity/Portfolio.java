package TradeShift.Project.entity;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "portfolios")
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Double totalValue = 0.0;

    // Many portfolios belong to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore // Prevent cyclic reference during JSON serialization
    private User user;

    // One portfolio has many assets
    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Asset> assets;

    // Optional: convenience method to keep both sides in sync
    public void addAsset(Asset asset) {
        assets.add(asset);
        asset.setPortfolio(this);
    }

    public void removeAsset(Asset asset) {
        assets.remove(asset);
        asset.setPortfolio(null);
    }
}
