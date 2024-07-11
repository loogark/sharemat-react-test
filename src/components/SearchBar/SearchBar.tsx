import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks";
import "./SearchBar.css";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("name") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery !== initialQuery && trimmedQuery !== "") {
      // Update search params: remove 'page' and set 'name' if query changed and not empty
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("name", trimmedQuery);
        return prev;
      });
    } else if (trimmedQuery === "" && initialQuery !== "") {
      // Reset to page 1 and remove 'name' if query cleared
      setSearchParams((prev) => {
        prev.set("page", String(1));
        prev.delete("name");
        return prev;
      });
    }
  }, [debouncedQuery, setSearchParams, initialQuery]);

  return (
    <div className='search-bar'>
      <input
        type='text'
        className='search-input'
        placeholder='Search characters...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
