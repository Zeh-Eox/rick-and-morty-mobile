import { getLocations } from "@/services/locations";
import { LocationsResponse } from "@/types/locations";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export const useLocations = () => {
  return useInfiniteQuery<
    LocationsResponse,
    Error,
    InfiniteData<LocationsResponse>,
    ["locations"],
    number
  >({
    queryKey: ["locations"],

    queryFn: ({ pageParam }) => getLocations(pageParam),

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
