import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const useImagePicker = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

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
      setAvatar(result.assets[0].uri);
    }
  };

  return { avatar, pickImage };
};
