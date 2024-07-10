import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useHooks";
import "./SearchBar.css";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  console.log(onSearch, "onSearch");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("name") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 300); // 300ms delay

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery !== initialQuery && trimmedQuery !== "") {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.set("name", trimmedQuery);
        return prev;
      });
    } else if (trimmedQuery === "" && initialQuery !== "") {
      setSearchParams((prev) => {
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

export default SearchBar;
