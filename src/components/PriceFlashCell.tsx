import { useEffect, useState } from "react";
import { useRef } from "react";
import { TableCell } from "./ui/table";

interface PriceFlashCellProps {
  value: string;
  formatter: (value: string) => string;
}
const PriceFlashCell = ({ value, formatter }: PriceFlashCellProps) => {
  const [flashClass, setFlashClass] = useState("");
  const prevValueRef = useRef<number | null>(null);

  useEffect(() => {
    const currentValueNum = parseFloat(value);
    if (isNaN(currentValueNum)) return;
    const prevValueNum = prevValueRef.current;
    prevValueRef.current = currentValueNum;

    if (prevValueNum === null || prevValueNum === currentValueNum) {
      setFlashClass("");
      return;
    }

    let newClass = "";
    if (currentValueNum > prevValueNum) {
      newClass = "bg-green-400/30";
    } else if (currentValueNum < prevValueNum) {
      newClass = "bg-red-400/30";
    }

    if (newClass) {
      setFlashClass(newClass);
      const timer = setTimeout(() => {
        setFlashClass("");
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <TableCell
      className={`text-amber-50 transition-colors duration-200 ${flashClass}`}
    >
      {formatter(value)}
    </TableCell>
  );
};
export default PriceFlashCell;
