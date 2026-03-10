import { Character, CharactersResponse } from "@/types/character";
import { HTTP_CLIENT } from "./rickAndMorty";

export const getCharacters = async (
  page: number,
): Promise<CharactersResponse> => {
  try {
    const response = await HTTP_CLIENT.get<CharactersResponse>(
      `/character?page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error("Get Characters Error:", error);
    throw error;
  }
};

export const getCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await HTTP_CLIENT.get<Character>(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Character By ID Error:", error);
    throw error;
  }
};
