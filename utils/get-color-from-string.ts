export const getColorFromString = (str?: string): string => {
  if (!str) return "hsl(220, 15%, 50%)";

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs(hash) % 360;

  return `hsl(${h}, 60%, 50%)`;
};
