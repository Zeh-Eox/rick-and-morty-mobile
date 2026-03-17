import { AuthUser, deleteUser, getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    checkUser();

    const unsubscribe = Hub.listen("auth", () => {
      checkUser();
    });

    return () => unsubscribe();
  }, []);

  const deleteAccount = async () => {
    try {
      await deleteUser();

      setUser(null);

      router.replace("/(auth)/login");
    } catch (error) {
      console.log("Erreur suppression :", error);
    }
  };

  return { user, deleteAccount };
}
