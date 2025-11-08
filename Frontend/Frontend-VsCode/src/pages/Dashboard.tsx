import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";

const FINNHUB_API_KEY = "d40fev1r01qqo3qhocfgd40fev1r01qqo3qhocg0";
const BACKEND_ORDERS_API = "http://localhost:8080/api/portfolio";

const MARQUEE_NEWS = [
  "Welcome to TradeShift! India's best modern trading platform.",
  "NSE: NIFTY 50 ↑ 0.12% | SENSEX ↑ 0.15% | GOLD steady today.",
  "Check live stock & commodity prices in search!",
  "Safe, Secure, Lightning Fast ⚡"
];

const DUMMY_COMPANIES = [
  { symbol: "AAPL", name: "Apple Inc.", type: "BUY" },
  { symbol: "GOOGL", name: "Alphabet Inc.", type: "SELL" },
  { symbol: "MSFT", name: "Microsoft Corp.", type: "BUY" },
  { symbol: "TCS", name: "Tata Consultancy", type: "BUY" },
  { symbol: "INFY", name: "Infosys Ltd.", type: "SELL" },
];

const companyBasePrice: Record<string, number> = {
  AAPL: 182.52,
  GOOGL: 141.80,
  MSFT: 378.91,
  TCS: 3452.31,
  INFY: 1513.22,
};

function getRandomPrice(base: number) {
  const variance = Math.random() * 8 - 4;
  return +(base + variance).toFixed(2);
}
function getRandomPercent() {
  const val = Math.random() * 2 - 1;
  return `${val > 0 ? "+" : ""}${val.toFixed(2)}%`;
}

const Dashboard = () => {
  const portfolioId = 1;

  const [tradeData, setTradeData] = useState(() =>
    DUMMY_COMPANIES.map((c) => ({
      ...c,
      price: companyBasePrice[c.symbol],
      quantity: Math.floor(Math.random() * 100) + 10,
      percent: getRandomPercent(),
      time: "Now",
    }))
  );
  const [marqueeIdx, setMarqueeIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);

  // -- Real-time update addition --
  useEffect(() => {
    const interval = setInterval(() => {
      setTradeData((oldData) =>
        oldData.map((trade) => ({
          ...trade,
          price: getRandomPrice(companyBasePrice[trade.symbol]),
          percent: getRandomPercent(),
        }))
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  // -- End addition --

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchResult(null);

    let symbol = searchTerm.trim().toUpperCase();
    if (symbol.endsWith(".NSE")) symbol = symbol.replace(".NSE", "");
    if (symbol.endsWith(".NS")) symbol = symbol.replace(".NS", "");

    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
      );
      if (res.data && typeof res.data.c === "number" && res.data.c > 0) {
        setSearchResult(`Live price for ${symbol}: ₹${res.data.c}`);
      } else {
        setSearchResult(`Symbol not found or no price data (try AAPL, MSFT, etc.)`);
      }
    } catch (err) {
      setSearchResult("API error, please try later.");
    }
    setIsLoading(false);
  };

  const handleOrder = async (action: string, symbol: string, quantity: number, price: number) => {
    const orderPayload = {
      symbol,
      type: action,
      quantity,
      price,
    };
    try {
      const res = await axios.post(`${BACKEND_ORDERS_API}/${portfolioId}/orders`, orderPayload);
      if (res.status === 200 || res.status === 201) {
        setOrderMessage(`Order (${action}) for ${symbol} - Quantity: ${quantity} placed successfully!`);
        setTimeout(() => setOrderMessage(null), 4000);
      } else {
        setOrderMessage("Order failed (backend error).");
        setTimeout(() => setOrderMessage(null), 4000);
      }
    } catch (err: any) {
      setOrderMessage("Order could not be placed (network/server error).");
      setTimeout(() => setOrderMessage(null), 4000);
    }
  };

  const bgStyle = {
    background: "linear-gradient(120deg, #23272F 0%, #353941 100%)",
    minHeight: "100vh"
  };

  return (
    <div style={bgStyle} className="relative min-h-screen px-0 sm:px-4 py-2">
      <div className="w-full py-2 px-2 mb-4 bg-gradient-to-r from-indigo-700 to-blue-500 text-white font-medium text-[1.05em] rounded-md animate-pulse">
        <marquee>
          {MARQUEE_NEWS[marqueeIdx]}
        </marquee>
      </div>
      {orderMessage && (
        <div style={{
          position: "fixed", top: 10, left: "50%", transform: "translateX(-50%)",
          background: "#2fef90", color: "#222", fontWeight: "bold", fontSize: "1.2em",
          borderRadius: 14, zIndex: 99, padding: "12px 32px", boxShadow: "0 2px 12px #0006"
        }}>
          {orderMessage}
        </div>
      )}
      <Card className="mb-6 p-6 flex flex-col md:flex-row md:items-center bg-[#323846] shadow-lg border-0">
        <form onSubmit={handleSearch} className="flex flex-1 space-x-4 items-center">
          <input
            type="text"
            placeholder="Search: GOLD or Stock Symbol (e.g. TCS.NSE, INFY.NSE, AAPL...)"
            className="flex-1 rounded-lg bg-[#262b34] text-white px-4 py-2 outline-none text-base border border-blue-600 focus:border-green-400 transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="rounded bg-gradient-to-tr from-blue-600 to-teal-400 text-white font-bold px-5 py-2 hover:from-teal-400 hover:to-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </form>
        <div className="md:ml-8 mt-4 md:mt-0 font-medium text-xl text-white min-h-[32px] flex items-center">
          {searchResult && (
            <span className="animate-pulse">{searchResult}</span>
          )}
        </div>
      </Card>
      <Card className="p-6 bg-[#303445] border-none shadow-xl">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Trades (Live)</h2>
        <div className="space-y-4">
          {tradeData.map((trade, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg bg-[#22252c] hover:bg-[#23272f] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="font-bold text-white text-lg">{trade.symbol}</span>
                  <span className="text-xs text-gray-400">{trade.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-8">
                <div className="text-right">
                  <p className="text-xs text-gray-300">Quantity</p>
                  <p className="font-medium text-white">{trade.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-300">Price</p>
                  <span className="font-bold text-lg text-[#82ea61] animate-blink">{`₹${trade.price}`}</span>
                </div>
                <button
                  onClick={() => handleOrder(trade.type, trade.symbol, trade.quantity, trade.price)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm transition-colors
                    ${trade.type === "BUY"
                      ? "bg-green-400/20 text-green-400 ring-1 ring-green-500/30 hover:bg-green-500/70 hover:text-white"
                      : "bg-red-400/20 text-red-400 ring-1 ring-red-500/30 hover:bg-red-500/70 hover:text-white"
                    }`}
                >{trade.type}</button>
                <span className="text-xs text-gray-400 min-w-[60px] text-right">{trade.percent}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <style>{`
        .animate-blink {
          animation: blink 0.8s steps(2, start) infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        body {
          background: #23272F !important;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
