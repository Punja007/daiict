'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type StockData = {
  symbol: string;
  price: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  volume: number;
};

const STOCK_SYMBOLS = ['TSLA', 'AAPL', 'AMZN'];
const API_KEY = 'cvtfmi1r01qjg133r24gcvtfmi1r01qjg133r250';

const StockPrices: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);

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
            volume: res.data.t,
          };
        })
      );

      setStocks(data);
    } catch (err) {
      console.error('Failed fetching stocks:', err);
    }
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Live Stock Prices</h2>
      {stocks.map((stock) => (
        <div
          key={stock.symbol}
          className="border-b border-gray-200 py-3 text-gray-800"
        >
          <h3 className="text-xl font-semibold">{stock.symbol}</h3>
          <p>💰 Price: ${stock.price}</p>
          <p>📈 High: ${stock.high}</p>
          <p>📉 Low: ${stock.low}</p>
          <p>🔓 Open: ${stock.open}</p>
          <p>🕔 Previous Close: ${stock.prevClose}</p>
        </div>
      ))}
    </div>
  );
};

export default StockPrices;
