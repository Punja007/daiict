// app/stocks/page.tsx
import StockPrices from "@/components/StockPrices";

export default function StockPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        📊 Live Stock Market Prices
      </h1>
      <StockPrices />
    </div>
  );
}
