// hooks/useCharacterProfile.ts
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Character } from "../../types";
import { fetchData } from "../../utils/api";

interface UseCharacterProfileResult {
  character: Character | null;
  isLoading: boolean;
  error: Error | null;
  backLinkParams: string;
}

export const useCharacterProfile = (): UseCharacterProfileResult => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const location = useLocation();
  const page = location.state?.page;
  const name = location.state?.name;

  useEffect(() => {
    const loadCharacter = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchData<Character>(`character/${id}`);
        setCharacter(data);
      } catch (error) {
        console.error("Failed to fetch character:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacter();
  }, [id]);

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
