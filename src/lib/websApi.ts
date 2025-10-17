import { symbolData } from "./restApi";
import { useState, useEffect } from "react";
export interface liveSymbolData extends symbolData {
  priceChangeClass?: string;
  marketCap: number;
}
interface RealTimeTickerData {
  s: string;
  c: string;
  q: string;
}
const WS_BASE_URL = "wss://stream.binance.com:9443/ws/!ticker@arr";

export const useWebSocket = (
  initialData: symbolData[] | undefined
): liveSymbolData[] => {
  const [marketData, setMarketData] = useState<symbolData[]>(initialData || []);
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      if (marketData.length === 0) {
        setMarketData(initialData);
      }
      const initialPrices: Record<string, number> = {};
      initialData.forEach((item) => {
        initialPrices[item.symbol] = parseFloat(item.lastPrice);
      });
      setPrevPrices(initialPrices);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData || initialData.length === 0) return;

    const ws = new WebSocket(WS_BASE_URL);

    ws.onopen = () =>
      console.log(`WebSocket connected to combined stream: ${WS_BASE_URL}`);

    ws.onmessage = (event) => {
      try {
        const updates: RealTimeTickerData[] = JSON.parse(event.data);

        const marketSymbolMap = new Map(marketData.map((d) => [d.symbol, d]));
        let updatesFound = false;

        const updatedData = marketData.map((prevItem) => {
          const update = updates.find((u) => u.s === prevItem.symbol);

          if (update) {
            const newPrice = parseFloat(update.c);
            const priceBeforeUpdate = parseFloat(prevItem.lastPrice);

            if (newPrice !== priceBeforeUpdate) {
              updatesFound = true; //

              setPrevPrices((prev) => ({
                ...prev,
                [update.s]: priceBeforeUpdate,
              }));

              return {
                ...prevItem,
                lastPrice: update.c,
                quoteVolume: update.q,
              };
            }
          }
          return prevItem;
        });
        if (updatesFound) {
          setMarketData(updatedData);
        }
      } catch (error) {}
    };

    ws.onclose = () => console.log("WebSocket Disconnected.");
    return () => ws.close();
  }, [initialData, marketData]);

  const getPriceChangeClass = (
    symbol: string,
    currentPrice: string
  ): string => {
    const current = parseFloat(currentPrice);
    const previous = prevPrices[symbol];

    if (previous === undefined || isNaN(previous) || current === previous) {
      return "";
    }

    return current > previous ? "animate-price-up" : "animate-price-down";
  };

  return marketData.map((item) => ({
    ...item,
    priceChangeClass: getPriceChangeClass(item.symbol, item.lastPrice),
  })) as liveSymbolData[];
};
