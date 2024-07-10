import React from "react";
import { useSearchParams } from "react-router-dom";
import { ApiResponse, Character } from "../types";
import "./Pagination.css";

interface PaginationProps {
  info: ApiResponse<Character[]>["info"] | null;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ info, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams, "searchParams");

  const getPageFromUrl = (url: string | null): number => {
    if (!url) return currentPage;
    const parsedUrl = new URL(url);
    return Number(parsedUrl.searchParams.get("page")) || currentPage;
  };

  if (!info) return null;

  const nextPage = getPageFromUrl(info.next);
  const prevPage = getPageFromUrl(info.prev);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const name = prev.get("name");
      prev.set("page", String(page));
      if (name !== null) prev.set("name", name);
      return prev;
    });
  };

  return (
    <div className='pagination-container'>
      <button
        className='pagination-button'
        onClick={() => handlePageChange(prevPage)}
        disabled={!info?.prev}
      >
        Previous
      </button>

      <span>{`Page ${currentPage} of ${info?.pages}`}</span>

      <button
        className='pagination-button'
        onClick={() => handlePageChange(nextPage)}
        disabled={!info?.next}
      >
        Next
      </button>

      {info.pages > 1 && (
        <div className='page-jumper'>
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {[...Array(info?.pages)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
