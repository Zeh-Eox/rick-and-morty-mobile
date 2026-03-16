import { getCharacters } from "@/services/characters";
import { CharactersResponse } from "@/types/character";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export const useCharacters = () => {
  return useInfiniteQuery<
    CharactersResponse,
    Error,
    InfiniteData<CharactersResponse>,
    ["characters"],
    number
  >({
    queryKey: ["characters"],

    queryFn: ({ pageParam }) => getCharacters(pageParam),

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
