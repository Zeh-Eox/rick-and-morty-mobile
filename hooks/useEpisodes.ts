import { getEpisodes } from "@/services/episodes";
import { EpisodesResponse } from "@/types/episodes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export const useEpisodes = () => {
  return useInfiniteQuery<
    EpisodesResponse,
    Error,
    InfiniteData<EpisodesResponse>,
    ["episodes"],
    number
  >({
    queryKey: ["episodes"],

    queryFn: ({ pageParam }) => getEpisodes(pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.info.next) {
        const nextPage = new URL(lastPage.info.next).searchParams.get("page");
        return Number(nextPage);
      }
      return undefined;
    },
  });
};
