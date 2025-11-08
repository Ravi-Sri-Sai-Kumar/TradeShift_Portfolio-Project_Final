import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import axios from "axios";

interface Transaction {
  id: string;
  symbol: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  orderTime: string;
  status?: "Completed" | "Pending" | "Cancelled";
}

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [orders, setOrders] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      // NOTE: For production, get correct portfolioId by calling /api/portfolio and using first/selected id
      const portfolioId = 1;
      try {
        const res = await axios.get(
          `http://localhost:8080/api/portfolio/${portfolioId}/orders`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Convert API data to correct format if needed
        const withExtras = res.data.map((o: any, idx: number) => ({
          id: o.id || idx,
          symbol: o.symbol,
          type: o.type,
          quantity: o.quantity,
          price: o.price,
          // orderTime from backend: parse for date/time split
          orderTime: o.orderTime,
          status: o.status ? o.status : "Completed",
        }));
        setOrders(withExtras);
      } catch {
        setOrders([]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);
  
  // Parse date/time helpers
  const parseDate = (orderTime: string) => {
    if (!orderTime) return "";
    // Split for date/time
    const [date, time] = orderTime.split("T");
    return { date, time: time?.slice(0, 8) || "" };
  };

  const filteredTransactions = orders.filter((txn) => {
    const { date, time } = parseDate(txn.orderTime);
    const matchesSearch =
      txn.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || txn.type.toLowerCase() === filterType;
    const matchesStatus =
      filterStatus === "all" || (txn.status?.toLowerCase() === filterStatus);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Transaction History
        </h1>
        <p className="text-muted-foreground">View your trading history</p>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by symbol or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="p-6 bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-12 text-center">Loading...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Date/Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Type
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Quantity
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Price
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Total
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => {
                  const { date, time } = parseDate(txn.orderTime);
                  return (
                    <tr
                      key={txn.id}
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {date}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {time}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{txn.symbol}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            txn.type === "BUY"
                              ? "bg-success/20 text-success"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-sm font-medium text-foreground">
                        {txn.quantity}
                      </td>
                      <td className="py-4 px-4 text-right text-sm font-medium text-foreground">
                        ${txn.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right text-sm font-bold text-foreground">
                        ${(txn.quantity * txn.price).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            txn.status === "Completed"
                              ? "bg-success/20 text-success"
                              : txn.status === "Pending"
                              ? "bg-secondary/20 text-secondary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {!loading && filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No transactions found matching your filters.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default History;
