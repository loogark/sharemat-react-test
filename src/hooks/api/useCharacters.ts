import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ApiResponse, Character } from "../../types";
import { fetchData } from "../../utils/api";

interface UseCharactersResult {
  characters: Character[] | null;
  info: ApiResponse<Character[]>["info"] | null;
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
}

export const UseCharacters = (): UseCharactersResult => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [info, setInfo] = useState<ApiResponse<Character[]>["info"] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("name") || "";

  useEffect(() => {
    const fetchCharacterData = async (pageNumber: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const params: { page: number; name?: string } = { page: pageNumber };

        if (currentSearch.trim() !== "") {
          params.name = currentSearch;
        }

        const characterData = await fetchData<Character>("character", params);
        setCharacters(characterData.results);
        setInfo(characterData.info);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching character data:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacterData(currentPage);
  }, [currentPage, currentSearch]);

  return { characters, info, isLoading, error, currentPage };
};
