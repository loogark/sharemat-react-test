import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Character } from "../../types";
import { createSearchParams } from "../../utils";
import { useFetch } from "../useFetch";

/**
 * Custom hook for fetching and managing character profile data.
 * @returns An object containing the character profile data, loading state, error state, and back link parameters.
 */

interface UseCharacterProfileResult {
  character: Character | null;
  isLoading: boolean;
  error: Error | null;
  backLinkParams: string;
}

export const useCharacterProfile = (): UseCharacterProfileResult => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const { fetchData, isLoading, error } = useFetch<Character>();

  const location = useLocation();
  const page = location.state?.page;
  const name = location.state?.name;

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = (await fetchData(
          `character/${id}`
        )) as unknown as Character;
        setCharacter(data);
      } catch (error) {
        setCharacter(null);
        console.error("Failed to fetch character:", error);
      }
    };

    loadCharacter();
  }, [id, fetchData]);

  const searchParams = createSearchParams({ page, name });

  const backLinkParams = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  return { character, isLoading, error, backLinkParams };
};
