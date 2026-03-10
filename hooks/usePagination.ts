import { useState } from "react";

export const usePagination = <T>(
  fetchFunction: (page: number) => Promise<any>,
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadResources = async (page: number) => {
    const response = await fetchFunction(page);
    if (response) {
      setData((prev) =>
        page === 1 ? response.results : [...prev, ...response.results],
      );
      setHasNextPage(!!response.info.next);
    }
  };

  const init = async () => {
    await loadResources(1);
    setLoading(false);
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasNextPage) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    await loadResources(nextPage);
    setCurrentPage(nextPage);
    setLoadingMore(false);
  };

  return {
    data,
    loading,
    loadingMore,
    init,
    handleLoadMore,
  };
};
