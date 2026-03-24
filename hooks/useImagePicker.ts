import { File, Paths } from "expo-file-system/next";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const AVATAR_KEY = "user_avatar";

const saveAvatarPermanently = async (uri: string): Promise<string> => {
  const filename = uri.split("/").pop() ?? "avatar.jpg";
  const dest = new File(Paths.document, filename);
  const source = new File(uri);
  await source.copy(dest);
  return dest.uri;
};

export const useImagePicker = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAvatar = async () => {
      const saved = await SecureStore.getItemAsync(AVATAR_KEY);
      if (saved) setAvatar(saved);
    };
    loadAvatar();
  }, []);

  const pickImage = async (type: "camera" | "gallery") => {
    let result;
    if (type === "camera") {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return;
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.7,
      });
    } else {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return;
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.7,
      });
    }

    if (!result.canceled) {
      setLoading(true);
      try {
        const permanentUri = await saveAvatarPermanently(result.assets[0].uri);
        await SecureStore.setItemAsync(AVATAR_KEY, permanentUri);
        setAvatar(permanentUri);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeAvatar = async () => {
    const saved = await SecureStore.getItemAsync(AVATAR_KEY);
    if (saved) {
      const file = new File(saved);
      if (await file.exists) await file.delete();
    }
    await SecureStore.deleteItemAsync(AVATAR_KEY);
    setAvatar(null);
  };

  return { avatar, pickImage, removeAvatar, loading };
};
