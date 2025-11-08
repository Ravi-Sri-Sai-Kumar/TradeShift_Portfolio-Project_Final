import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  change: number;
}

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const assets: Asset[] = [
    { symbol: "AAPL", name: "Apple Inc.", quantity: 150, price: 182.52, change: 2.3 },
    { symbol: "GOOGL", name: "Alphabet Inc.", quantity: 75, price: 141.80, change: -1.2 },
    { symbol: "MSFT", name: "Microsoft Corp.", quantity: 120, price: 378.91, change: 1.8 },
    { symbol: "AMZN", name: "Amazon.com Inc.", quantity: 60, price: 151.94, change: 3.1 },
    { symbol: "TSLA", name: "Tesla Inc.", quantity: 90, price: 242.84, change: -2.5 },
    { symbol: "NVDA", name: "NVIDIA Corp.", quantity: 45, price: 495.22, change: 5.7 },
  ];

  const filteredAssets = assets.filter(
    (asset) =>
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValue = filteredAssets.reduce(
    (sum, asset) => sum + asset.quantity * asset.price,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-foreground">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by symbol or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const totalAssetValue = asset.quantity * asset.price;
          const isPositive = asset.change >= 0;

          return (
            <Card
              key={asset.symbol}
              className="p-6 bg-card border-border hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {asset.symbol}
                    </h3>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isPositive
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(asset.change)}%
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <span className="font-medium text-foreground">{asset.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-medium text-foreground">
                      ${asset.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        Total Value
                      </span>
                      <span className="text-lg font-bold text-primary">
                        ${totalAssetValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No assets found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
