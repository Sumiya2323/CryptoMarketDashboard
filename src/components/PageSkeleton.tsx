import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
const PageSkeleton = ({ rows = 20 }: { rows?: number }) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index} className="h-[52px]">
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[80px] ml-auto" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[60px] ml-auto" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[100px] ml-auto" />
          </TableCell>
          <TableCell className="text-right hidden sm:table-cell">
            <Skeleton className="h-4 w-[120px] ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
export default PageSkeleton;
