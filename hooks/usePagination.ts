import { useRef, useState } from "react";

export const usePagination = <T>(
  fetchFunction: (page: number) => Promise<any>,
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const loadingRef = useRef<boolean>(false);

  const loadResources = async (page: number) => {
    const response = await fetchFunction(page);

    if (response) {
      setData((prev) => {
        const merged =
          page === 1 ? response.results : [...prev, ...response.results];

        const map = new Map();
        merged.forEach((item: any) => map.set(item.id, item));

        return Array.from(map.values());
      });

      setHasNextPage(!!response.info.next);
    }
  };

  const init = async () => {
    await loadResources(1);
    setLoading(false);
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasNextPage) return;

    loadingRef.current = true;
    setLoadingMore(true);

    const nextPage = currentPage + 1;
    await loadResources(nextPage);

    setCurrentPage((prev) => prev + 1);

    setLoadingMore(false);
    loadingRef.current = false;
  };

  return {
    data,
    loading,
    loadingMore,
    init,
    handleLoadMore,
  };
};
