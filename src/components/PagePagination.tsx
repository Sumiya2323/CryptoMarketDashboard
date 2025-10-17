"use client";
import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PagePagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const getPageNumbers = useCallback(() => {
    const pages: (number | "ellipsis")[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (startPage > 2) pages.push("ellipsis");

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }

      if (endPage < totalPages - 1) pages.push("ellipsis");

      if (totalPages > 1) pages.push(totalPages);
    }
    return Array.from(
      new Set(
        pages.filter(
          (val, index, self) =>
            val !== "ellipsis" || self[index - 1] !== "ellipsis"
        )
      )
    );
  }, [totalPages, currentPage]);

  if (totalPages <= 1) return null;

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="text-amber-50">
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index} className="text-gray-500">
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(page as number)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem className="text-amber-50">
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PagePagination;
