import { getFavorites, toggleFavorite } from "@/services/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  const mutation = useMutation({
    mutationFn: toggleFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },

    onError: (error) => {
      console.error("toggleFavorite error:", error);
    },
  });

  return {
    favorites,
    toggleFavorite: mutation.mutate,
  };
};
