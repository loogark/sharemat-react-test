import { useCallback, useState } from "react";
import { ApiResponse, QueryParams } from "../types";
import { createSearchParams } from "../utils";

/**
 * Custom hook for fetching data from an API.
 *
 * @returns An object containing the `fetchData` function, `isLoading` flag, and `error` object.
 * @template T - The type of data returned by the API.
 */

const BASE_URL = "https://rickandmortyapi.com/api";

interface UseFetchResult<T> {
  fetchData: (
    endpoint: string,
    queries?: QueryParams
  ) => Promise<ApiResponse<T>>;
  isLoading: boolean;
  error: Error | null;
}

export function useFetch<T>(): UseFetchResult<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (
      endpoint: string,
      queries: QueryParams = {}
    ): Promise<ApiResponse<T>> => {
      setError(null);
      setIsLoading(true);

      try {
        let url = `${BASE_URL}/${endpoint}`;
        const allQueries = { ...queries };

        const searchParams = createSearchParams(allQueries);

        url += `?${searchParams.toString()}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json as ApiResponse<T>;
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { fetchData, isLoading, error };
}
