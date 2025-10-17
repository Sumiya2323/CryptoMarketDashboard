import axios from "axios";
export interface symbolData {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  lastPrice: string;
  lastQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

interface CoinGeckoItem {
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
}

const REST_BASE_URL = "https://api1.binance.com/api/v3/ticker/24hr";
const MARKETCAP_BASE_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

export const getSymbolData = async (): Promise<symbolData[]> => {
  try {
    const response = await axios.get<symbolData[]>(REST_BASE_URL);
    const usdtPairs = response.data
      .filter((d) => d.symbol.endsWith("USDT"))
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume));
    return usdtPairs;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export const getMarketCapData = async (): Promise<CoinData[]> => {
  try {
    const response = await axios.get<CoinGeckoItem[]>(MARKETCAP_BASE_URL);
    return response.data.map((item) => ({
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      market_cap: item.market_cap,
    }));
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};
