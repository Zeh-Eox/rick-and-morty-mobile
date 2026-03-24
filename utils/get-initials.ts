export const getInitials = (
  email?: string,
  givenName?: string,
  familyName?: string,
): string => {
  if (givenName && familyName) {
    return `${givenName[0]}${familyName[0]}`.toUpperCase();
  }

  if (givenName) {
    return givenName.slice(0, 2).toUpperCase();
  }

  if (email) {
    return email.slice(0, 2).toUpperCase();
  }

  return "??";
};
