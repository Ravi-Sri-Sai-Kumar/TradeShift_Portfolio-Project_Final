package TradeShift.Project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    private String symbol;
    private String type; // "BUY" or "SELL"
    private Double quantity;
    private Double price;
}
