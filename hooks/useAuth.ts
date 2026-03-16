import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

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

  return { user };
}
