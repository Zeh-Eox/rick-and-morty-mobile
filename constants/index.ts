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

export const MENU_ITEMS = [
  { name: "index", title: "Accueil" },
  { name: "(characters)", title: "Personnages" },
  { name: "(episodes)", title: "Épisodes" },
  { name: "(locations)", title: "Lieux" },
];

export const STEPS = [
  {
    emoji: "🛸",
    title: "Bienvenue dans l'univers",
    subtitle: "Rick & Morty",
    description:
      "Explore l'univers infini de Rick & Morty — personnages, lieux et épisodes réunis en une seule app.",
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.15)",
  },
  {
    emoji: "🧑‍🚀",
    title: "Des centaines de",
    subtitle: "Personnages",
    description:
      "Parcours tous les personnages de la série, consulte leur statut, leur espèce et leur origine.",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.15)",
  },
  {
    emoji: "🌍",
    title: "Lieux & Épisodes",
    subtitle: "À découvrir",
    description:
      "Explore toutes les dimensions, planètes et épisodes qui composent cet univers délirant.",
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.15)",
  },
  {
    emoji: "⭐",
    title: "Crée ton compte",
    subtitle: "& sauvegarde tes favoris",
    description:
      "Inscris-toi pour retrouver tes personnages préférés à tout moment, sur tous tes appareils.",
    color: "#fb923c",
    glow: "rgba(251, 146, 60, 0.15)",
  },
];
