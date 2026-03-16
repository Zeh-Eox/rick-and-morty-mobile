import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorite_characters";

export const getFavorites = async (): Promise<number[]> => {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = async (id: number) => {
  const favorites = await getFavorites();

  if (favorites.includes(id)) {
    const updated = favorites.filter((fav) => fav !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  }

  const updated = [...favorites, id];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
};
