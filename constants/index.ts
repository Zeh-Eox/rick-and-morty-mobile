export const SEASON_COLORS: Record<number, string> = {
  1: "#818cf8",
  2: "#34d399",
  3: "#f472b6",
  4: "#fbbf24",
  5: "#4ECDC4",
};

export const DIMENSION_COLORS: Record<string, string> = {
  "Dimension C-137": "#818cf8",
  "Replacement Dimension": "#f472b6",
  "Cronenberg Dimension": "#34d399",
  "Fantasy Dimension": "#fbbf24",
  unknown: "#64748b",
};

export const CATEGORIES = [
  {
    label: "Personnages",
    description: "Explore tous les habitants de l'univers",
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.35)",
    route: "/(characters)/tabs",
  },
  {
    label: "Lieux",
    description: "Découvre les planètes et dimensions",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.35)",
    route: "/(locations)",
  },
  {
    label: "Épisodes",
    description: "Retrouve chaque aventure de la série",
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.35)",
    route: "/(episodes)",
  },
];
