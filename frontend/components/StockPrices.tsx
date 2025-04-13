"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type StockData = {
  symbol: string;
  price: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
};

const STOCK_SYMBOLS = ["TSLA", "AAPL", "AMZN", "GOOGL"];
const API_KEY = "cvtfmi1r01qjg133r24gcvtfmi1r01qjg133r250";

const StockPrices: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStockData = async () => {
    try {
      const data = await Promise.all(
        STOCK_SYMBOLS.map(async (symbol) => {
          const res = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
          );

          return {
            symbol,
            price: res.data.c,
            high: res.data.h,
            low: res.data.l,
            open: res.data.o,
            prevClose: res.data.pc,
          };
        })
      );

      setStocks(data);
    } catch (err) {
      console.error("Failed fetching stocks:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          📊 Live Stock Prices
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40 text-blue-600">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {stocks.map((stock) => {
              const priceChange = stock.price - stock.prevClose;
              const changeColor =
                priceChange > 0 ? "text-green-600" : priceChange < 0 ? "text-red-600" : "text-gray-600";
              const changeSymbol = priceChange > 0 ? "▲" : priceChange < 0 ? "▼" : "●";

              return (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border border-gray-200 rounded-2xl p-5 bg-white shadow hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold mb-2 text-blue-800">{stock.symbol}</h3>
                  <p className={`text-lg font-bold ${changeColor}`}>
                    💰 Price: ${stock.price.toFixed(2)} <span>{changeSymbol}</span>
                  </p>
                  <p className="text-sm text-gray-600">📈 High: ${stock.high}</p>
                  <p className="text-sm text-gray-600">📉 Low: ${stock.low}</p>
                  <p className="text-sm text-gray-600">🔓 Open: ${stock.open}</p>
                  <p className="text-sm text-gray-600">🕔 Prev Close: ${stock.prevClose}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPrices;
