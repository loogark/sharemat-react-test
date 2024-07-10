import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Character } from "../../types";
import { useFetch } from "../useFetch";

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
        console.error("Failed to fetch character:", error);
      }
    };

    loadCharacter();
  }, [id, fetchData]);

  const searchParams = new URLSearchParams(
    Object.entries({ page, name })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== null && value !== "")
      .map(([key, value]) => [key, key === "name" ? value.trim() : value])
  );

  const backLinkParams = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  return { character, isLoading, error, backLinkParams };
};
