import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Character } from "../../types";
import { createSearchParams } from "../../utils";
import { useFetch } from "../useFetch";

export interface UseCharacterProfileResult {
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
  const { page, name, status, gender } = location.state || {};

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

  const backLinkParams = useMemo(() => {
    const searchParams = createSearchParams({ page, name, status, gender });
    return searchParams.toString() ? `?${searchParams.toString()}` : "";
  }, [page, name, status, gender]);

  return { character, isLoading, error, backLinkParams };
};
