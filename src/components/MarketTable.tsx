"use client";
import { getSymbolData, getMarketCapData } from "@/lib/restApi";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  formatPrice,
  formatVolume,
  formatPercent,
  formatMarketCap,
} from "@/utils/format";
import { useWebSocket, liveSymbolData } from "@/lib/websApi";
import PagePagination from "./PagePagination";
import PageSkeleton from "./PageSkeleton";
import PriceFlashCell from "./PriceFlashCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DetailedSymbolDrawer from "./DetailedSymbolDrawer";

const SearchInput: React.FC<{
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search coins (e.g., BTCUSDT)"
    value={value}
    onChange={onChange}
    className="w-full sm:w-80 p-3 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400  transition duration-150"
  />
);

const ITEM_PER_PAGE = 20;

const MarketTable = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<liveSymbolData | null>(
    null
  );
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = useCallback((item: liveSymbolData) => {
    setSelectedSymbol(item);
    setIsDrawOpen(true);
  }, []);

  const {
    data: initialData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["binanceMarketdata", "usdtPairs"],
    queryFn: getSymbolData,
    refetchInterval: 60000,
  });

  const {
    data: marketCapData,
    isLoading: isMarketCapLoading,
    isError: isMarketCapError,
  } = useQuery({
    queryKey: ["coingeckoMarketdata"],
    queryFn: getMarketCapData,
    refetchInterval: 300000,
  });

  const liveData = useWebSocket(initialData);

  const marketCapMap = useMemo(() => {
    if (!marketCapData) return new Map<string, number>();
    const map = new Map<string, number>();
    marketCapData.forEach((coin) => {
      map.set(coin.symbol.toLowerCase(), coin.market_cap);
    });
    return map;
  }, [marketCapData]);

  const marketRows = useMemo(() => {
    if (!liveData) return [];

    return liveData.map((item) => {
      const baseSymbol = item.symbol.replace("USDT", "").toLowerCase();
      const marketCap = marketCapMap.get(baseSymbol);

      return {
        ...item,
        marketCap: marketCap,
      } as liveSymbolData;
    });
  }, [liveData, marketCapMap]);

  const filteredRows = useMemo(() => {
    if (!searchQuery) {
      return marketRows;
    }

    const query = searchQuery.toUpperCase();
    return marketRows.filter((item) => item.symbol.includes(query));
  }, [marketRows, searchQuery]);

  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);

  const paginationRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
    const endIndex = startIndex + ITEM_PER_PAGE;
    return filteredRows.slice(startIndex, endIndex);
  }, [filteredRows, currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
      window.scroll(0, 0);
    },
    [totalPages]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, totalPages]);

  const getChangeColor = (percent: string): string => {
    const value = parseFloat(percent);
    if (isNaN(value) || value === 0) return "text-gray-500";
    return value > 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="flex flex-col gap-4 py-10 px-4 sm:px-14 min-h-screen">
      <div className="flex justify-start">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="title">Coin</TableHead>
            <TableHead className="title">Price</TableHead>
            <TableHead className="title">24h change</TableHead>
            <TableHead className="title">24h volume</TableHead>
            <TableHead className="title">Market cap</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <PageSkeleton rows={ITEM_PER_PAGE} />
        ) : (
          <TableBody>
            {paginationRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-red-400 text-3xl"
                >
                  "{searchQuery}"-S COIN NOT FOUND.
                </TableCell>
              </TableRow>
            ) : (
              paginationRows.map((item) => {
                const changeColor = getChangeColor(item.priceChangePercent);
                const marketCapValue = item.marketCap;

                return (
                  <TableRow
                    key={item.symbol}
                    onClick={() => handleClick(item)}
                    className="cursor-pointer hover:bg-gray-800/50 transition-colors border-b border-gray-800"
                  >
                    <TableCell className="text-amber-50 font-semibold">
                      {item.symbol}
                    </TableCell>
                    <PriceFlashCell
                      value={item.lastPrice}
                      formatter={formatPrice}
                    />
                    <TableCell className={`${changeColor} not-[]:font-medium`}>
                      {formatPercent(item.priceChangePercent)}
                    </TableCell>
                    <PriceFlashCell
                      value={item.quoteVolume}
                      formatter={formatVolume}
                    />
                    <TableCell className="text-gray-200">
                      {marketCapValue ? formatMarketCap(marketCapValue) : "N/A"}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        )}
      </Table>
      {filteredRows.length > 0 && (
        <PagePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <DetailedSymbolDrawer
        data={selectedSymbol}
        isOpen={isDrawOpen}
        onClose={() => setIsDrawOpen(false)}
      />
    </div>
  );
};
export default MarketTable;
