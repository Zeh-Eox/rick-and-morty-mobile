import {
  confirmSignUp,
  fetchUserAttributes,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";

export async function register(
  email: string,
  password: string,
  givenName: string,
  familyName: string,
) {
  return await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
        given_name: givenName,
        family_name: familyName,
      },
    },
  });
}

export async function confirmRegistration(email: string, code: string) {
  return await confirmSignUp({
    username: email,
    confirmationCode: code,
  });
}

export async function login(email: string, password: string) {
  return await signIn({
    username: email,
    password,
  });
}

export async function getUser() {
  return await getCurrentUser();
}

export async function getUserFull() {
  const user = await getCurrentUser();
  const attributes = await fetchUserAttributes();

  return {
    ...user,
    ...attributes,
  };
}

export async function logoutService() {
  await signOut();
}
