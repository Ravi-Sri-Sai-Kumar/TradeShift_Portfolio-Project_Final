package TradeShift.Project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import TradeShift.Project.services.AnalyticsService;
import TradeShift.Project.util.ApiResponse;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/profit-loss")
    public ApiResponse<Double> getProfitLoss(@RequestParam Long portfolioId) {
        double profitLoss = analyticsService.calculateProfitLoss(portfolioId);
        return new ApiResponse<>("success", profitLoss, "Profit/Loss calculated successfully");
    }

    @GetMapping("/asset-allocation")
    public ApiResponse<Map<String, Double>> getAssetAllocation(@RequestParam Long portfolioId) {
        Map<String, Double> allocation = analyticsService.calculateAssetAllocation(portfolioId);
        return new ApiResponse<>("success", allocation, "Asset allocation fetched successfully");
    }

    @GetMapping("/performance")
    public ApiResponse<Double> getPerformance(@RequestParam Long portfolioId,
                                              @RequestParam String period) {
        double performance = analyticsService.calculatePerformance(portfolioId, period);
        return new ApiResponse<>("success", performance, "Performance data calculated successfully");
    }
}
