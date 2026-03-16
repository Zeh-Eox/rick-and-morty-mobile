import { Character, CharactersResponse } from "@/types/character";
import { HTTP_CLIENT } from "./rickAndMorty";

export const getCharacters = async (
  page: number,
): Promise<CharactersResponse> => {
  const response = await HTTP_CLIENT.get<CharactersResponse>(
    `/character?page=${page}`,
  );
  return response.data;
};

export const getCharactersByIds = async (
  ids: number[],
): Promise<Character[]> => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(",")}`,
  );
  if (!res.ok) return [];
  const data = await res.json();

  return Array.isArray(data) ? data : [data];
};
