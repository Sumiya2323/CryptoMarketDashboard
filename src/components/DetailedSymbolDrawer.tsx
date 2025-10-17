import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { formatPrice, formatVolume } from "@/utils/format";
interface DetailedSymbolData {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  highPrice: string;
  lowPrice: string;
  quoteVolume: string;
  volume: string;
}

interface DetailedSymbolDrawerProps {
  data: DetailedSymbolData | null;
  isOpen: boolean;
  onClose: () => void;
}
const DetailedSymbolDrawer: React.FC<DetailedSymbolDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  if (!data) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <div />
      </Drawer>
    );
  }
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{data.symbol}</DrawerTitle>
        </DrawerHeader>
        <div>
          <div className="flex justify-between space-x-4">
            <div className="flex-1 p-3 bg-gray-100 rounded-lg shadow-sm text-center">
              <p className="font-medium text-xl text-gray-500">24h Volume</p>
              <div className="text-2xl font-semibold text-gray-800">
                {formatVolume(data.volume)}
              </div>
            </div>

            <div className="flex-1 p-3 bg-gray-100 rounded-lg shadow-sm text-center">
              <p className="font-medium text-xl text-gray-500">
                24h High Price
              </p>
              <div className="text-2xl font-semibold text-green-600">
                {formatPrice(data.highPrice)}
              </div>
            </div>

            <div className="flex-1 p-3 bg-gray-100 rounded-lg shadow-sm text-center">
              <p className="font-medium text-xl text-gray-500">24h Low Price</p>
              <div className="text-2xl font-semibold text-red-600">
                {formatPrice(data.lowPrice)}
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild onClick={onClose} className="self-center">
            <Button variant="outline" className="text-center">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default DetailedSymbolDrawer;
