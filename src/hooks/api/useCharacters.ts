import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ApiResponse, Character } from "../../types";
import { useFetch } from "../useFetch";

/**
 * Custom hook for fetching and managing character data.
 * @returns An object containing characters, info, isLoading, error, and currentPage.
 */

export interface UseCharactersResult {
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
  const { fetchData, isLoading, error } = useFetch<Character[]>();

  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("name") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentGender = searchParams.get("gender") || "";

  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = {
      page: Number(searchParams.get("page")) || 1,
    };

    ["name", "status", "gender"].forEach((param) => {
      const value = searchParams.get(param);
      if (value?.trim()) params[param] = value;
    });

    return params;
  }, [searchParams]);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterData = await fetchData("character", queryParams);
        setCharacters(characterData.results);
        setInfo(characterData.info);
      } catch (error) {
        setCharacters(null);
        setInfo(null);
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterData();
  }, [currentPage, currentSearch, fetchData, currentStatus, currentGender]);

  return { characters, info, isLoading, error, currentPage };
};
