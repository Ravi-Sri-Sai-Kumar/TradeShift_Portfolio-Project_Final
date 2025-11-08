import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthsMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const genRandomValue = (last: number) => Number((last + Math.random() * 650 - 320).toFixed(2));

const Analytics = () => {
  // Moving chart data
  const [portfolioData, setPortfolioData] = useState([
    { month: "Jan", value: 95000 },
    { month: "Feb", value: 98000 },
    { month: "Mar", value: 102000 },
    { month: "Apr", value: 108000 },
    { month: "May", value: 112000 },
    { month: "Jun", value: 115000 },
    { month: "Jul", value: 118000 },
    { month: "Aug", value: 121000 },
    { month: "Sep", value: 119000 },
    { month: "Oct", value: 123000 },
    { month: "Nov", value: 124589 },
  ]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPortfolioData(old => {
        const lastMonthIdx = monthsMap.indexOf(old[old.length - 1].month);
        const nextMonth = monthsMap[(lastMonthIdx + 1) % monthsMap.length];
        const lastValue = old[old.length - 1].value;
        const newValue = genRandomValue(lastValue);
        return [...old.slice(1), { month: nextMonth, value: newValue }];
      });
    }, 1500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // The rest: no change, your original code
  const volumeData = [
    { day: "Mon", buy: 12000, sell: 8000 },
    { day: "Tue", buy: 15000, sell: 10000 },
    { day: "Wed", buy: 10000, sell: 12000 },
    { day: "Thu", buy: 18000, sell: 9000 },
    { day: "Fri", buy: 14000, sell: 11000 },
  ];
  const allocationData = [
    { name: "AAPL", value: 27378, color: "#3b82f6" },
    { name: "MSFT", value: 45469, color: "#06b6d4" },
    { name: "GOOGL", value: 10635, color: "#10b981" },
    { name: "AMZN", value: 9116, color: "#f59e0b" },
    { name: "TSLA", value: 21855, color: "#ef4444" },
    { name: "NVDA", value: 22285, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Visualize your portfolio performance
        </p>
      </div>

      {/* Portfolio Growth - moving animation */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Portfolio Growth Over Time (Moving Map)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={portfolioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number) =>
                `$${value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              activeDot={{ r: 6 }}
              name="Portfolio Value"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Trading Volume Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Weekly Trading Volume
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) =>
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                }
              />
              <Legend />
              <Bar
                dataKey="buy"
                fill="hsl(var(--success))"
                name="Buy Volume"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="sell"
                fill="hsl(var(--destructive))"
                name="Sell Volume"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        {/* Asset Allocation Chart */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Asset Allocation
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) =>
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Performance Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Total Return</p>
            <p className="text-2xl font-bold text-success">+31.1%</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Best Performing</p>
            <p className="text-2xl font-bold text-foreground">NVDA</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Total Trades</p>
            <p className="text-2xl font-bold text-foreground">127</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
            <p className="text-2xl font-bold text-foreground">68%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
