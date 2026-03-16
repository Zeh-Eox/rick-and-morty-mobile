import { getCharactersByIds } from "@/services/characters";
import { Character } from "@/types/character";
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from "./useFavorites";

export const useFavoriteCharacters = () => {
  const { favorites } = useFavorites();

  const { data: characters = [], isLoading } = useQuery<Character[]>({
    queryKey: ["favoriteCharacters", favorites],
    queryFn: () => getCharactersByIds(favorites),
    enabled: favorites.length > 0,
  });

  return { characters, isLoading, total: favorites.length };
};
