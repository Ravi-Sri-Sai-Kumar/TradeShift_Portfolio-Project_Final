import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TrendingUp, TrendingDown, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const Trade = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [stockName, setStockName] = useState("");

  // Uses Finnhub for price or mock - you can update as you wish
  const fetchStockPrice = async () => {
    if (!stockSymbol.trim()) {
      toast.error("Please enter a stock symbol");
      return;
    }
    setLoading(true);
    try {
      // Replace this with Finnhub API (if you want real price)
      const mockPrices: Record<string, { price: number; name: string }> = {
        AAPL: { price: 182.52, name: "Apple Inc." },
        GOOGL: { price: 141.80, name: "Alphabet Inc." },
        MSFT: { price: 378.91, name: "Microsoft Corp." },
        AMZN: { price: 151.94, name: "Amazon.com Inc." },
        TSLA: { price: 242.84, name: "Tesla Inc." },
        NVDA: { price: 495.22, name: "NVIDIA Corp." },
      };
      await new Promise((resolve) => setTimeout(resolve, 600)); // fast mock
      const symbol = stockSymbol.toUpperCase();
      const stockData = mockPrices[symbol] || {
        price: Math.random() * 500 + 50,
        name: `${symbol} Company`,
      };
      setStockPrice(stockData.price);
      setStockName(stockData.name);
      toast.success(`Price fetched: $${stockData.price.toFixed(2)}`);
    } catch (error) {
      toast.error("Failed to fetch stock price");
    } finally {
      setLoading(false);
    }
  };

  // BACKEND ORDER PLACEMENT (REAL!)
  const handleTrade = async () => {
    if (!stockPrice || !quantity) {
      toast.error("Please fetch stock price and enter quantity");
      return;
    }
    const token = localStorage.getItem("token");
    const portfolioId = 1; // (use dynamic fetch for prod!)
    try {
      await axios.post(
        `http://localhost:8080/api/portfolio/${portfolioId}/orders`,
        {
          symbol: stockSymbol.toUpperCase(),
          type: tradeType.toUpperCase(), // "BUY" or "SELL"
          quantity: Number(quantity),
          price: stockPrice
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const totalValue = stockPrice * parseFloat(quantity);
      toast.success(
        `${tradeType === "buy" ? "Buy" : "Sell"} order placed: ${quantity} shares of ${stockSymbol.toUpperCase()} at $${stockPrice.toFixed(2)} (Total: $${totalValue.toFixed(2)})`
      );
      // Reset form
      setStockSymbol("");
      setQuantity("");
      setStockPrice(null);
      setStockName("");
    } catch (err) {
      toast.error("Order failed! See network/server error.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Trade</h1>
        <p className="text-muted-foreground">Execute buy and sell orders</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Form */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Place Order</h2>
          <div className="space-y-6">
            {/* Trade Type */}
            <div className="space-y-3">
              <Label>Order Type</Label>
              <RadioGroup
                value={tradeType}
                onValueChange={(value) => setTradeType(value as "buy" | "sell")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buy" id="buy" />
                  <Label htmlFor="buy" className="cursor-pointer flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    Buy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sell" id="sell" />
                  <Label htmlFor="sell" className="cursor-pointer flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-destructive" />
                    Sell
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {/* Stock Symbol */}
            <div className="space-y-2">
              <Label htmlFor="symbol">Stock Symbol</Label>
              <div className="flex gap-2">
                <Input
                  id="symbol"
                  placeholder="e.g., AAPL, GOOGL, MSFT"
                  value={stockSymbol}
                  onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button
                  onClick={fetchStockPrice}
                  disabled={loading}
                  variant="outline"
                  size="icon"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {/* Current Price Display */}
            {stockPrice && (
              <Card className="p-4 bg-muted border-border">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-primary">
                      ${stockPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">{stockName}</p>
                  </div>
                </div>
              </Card>
            )}
            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Number of shares"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </div>
            {/* Total Value */}
            {stockPrice && quantity && (
              <div className="p-4 rounded-lg bg-muted border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Value</span>
                  <span className="text-xl font-bold text-foreground">
                    ${(stockPrice * parseFloat(quantity || "0")).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                onClick={handleTrade}
                className={
                  tradeType === "buy"
                    ? "bg-success hover:bg-success/90 text-success-foreground"
                    : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                }
                size="lg"
              >
                {tradeType === "buy" ? "Buy" : "Sell"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setStockSymbol("");
                  setQuantity("");
                  setStockPrice(null);
                  setStockName("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>
        {/* Quick Info */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Quick Info</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Popular Symbols</h3>
              <div className="flex flex-wrap gap-2">
                {["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "NVDA"].map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => {
                      setStockSymbol(symbol);
                      setStockPrice(null);
                    }}
                    className="px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Trading Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Always verify the stock price before placing orders</li>
                <li>• Consider setting stop-loss limits for risk management</li>
                <li>• Review your portfolio regularly</li>
                <li>• Stay informed about market trends</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Trade;
