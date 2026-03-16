import { EpisodesResponse } from "@/types/episodes";
import { HTTP_CLIENT } from "./rickAndMorty";

export const getEpisodes = async (page: number): Promise<EpisodesResponse> => {
  const response = await HTTP_CLIENT.get<EpisodesResponse>(
    `/episode?page=${page}`,
  );
  return response.data;
};
