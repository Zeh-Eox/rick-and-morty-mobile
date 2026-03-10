export const parseEpisodeCode = (code: string) => {
  const match = code.match(/S(\d+)E(\d+)/);
  if (!match) return { season: null, ep: null };
  return { season: parseInt(match[1]), ep: parseInt(match[2]) };
};
