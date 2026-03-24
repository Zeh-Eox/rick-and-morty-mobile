import { File } from "expo-file-system/next";
import * as SecureStore from "expo-secure-store";

export const clearAvatar = async () => {
  const saved = await SecureStore.getItemAsync("user_avatar");

  if (saved) {
    const file = new File(saved);

    if (await file.exists) {
      await file.delete();
    }
  }

  await SecureStore.deleteItemAsync("user_avatar");
};
