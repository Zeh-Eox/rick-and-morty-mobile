import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const ONBOARDING_KEY = "onboarding_done";

export const useOnboarding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    const check = async () => {
      const value = await SecureStore.getItemAsync(ONBOARDING_KEY);
      setOnboardingDone(value === "true");
      setIsLoading(false);
    };
    check();
  }, []);

  const completeOnboarding = async () => {
    await SecureStore.setItemAsync(ONBOARDING_KEY, "true");
    setOnboardingDone(true);
  };

  return { isLoading, onboardingDone, completeOnboarding };
};