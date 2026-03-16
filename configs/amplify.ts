import { Amplify } from "aws-amplify";
import "react-native-get-random-values";

const userPool = process.env.EXPO_PUBLIC_USER_POOL_ID;
const userPoolClient = process.env.EXPO_PUBLIC_USER_POOL_CLIENT_ID;

if (!userPool || !userPoolClient) {
  throw new Error("Environment variables required");
}

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: userPool,
      userPoolClientId: userPoolClient,
      loginWith: {
        email: true,
      },
    },
  },
});
