export const ZONAS = {
  zona_1: {
    name: "Zona 1",
    label: "Uso diário",
    description: "Horta, composteira, ervas, alimentação d'água",
    color: "#16A34A",
    icon: "🌱",
  },
  zona_2: {
    name: "Zona 2",
    label: "Uso frequente",
    description: "Pomar, galinheiro, apiário, pequenos animais",
    color: "#65A30D",
    icon: "🌿",
  },
  zona_3: {
    name: "Zona 3",
    label: "Uso menos frequente",
    description: "Cultivos maiores, pastagem, irrigação por gotejo",
    color: "#CA8A04",
    icon: "🌾",
  },
  zona_4: {
    name: "Zona 4",
    label: "Uso sazonal / coleta",
    description: "Silvicultura, melíferas, fibras",
    color: "#EA580C",
    icon: "🌳",
  },
  zona_5: {
    name: "Zona 5",
    label: "Natureza intocada",
    description: "Conservação, observação, regeneração",
    color: "#0284C7",
    icon: "🦋",
  },
} as const;

export type ZonaKey = keyof typeof ZONAS;

export const ZONA_OPTIONS = [
  { value: "zona_1", label: "Zona 1 — Uso diário" },
  { value: "zona_2", label: "Zona 2 — Uso frequente" },
  { value: "zona_3", label: "Zona 3 — Uso menos frequente" },
  { value: "zona_4", label: "Zona 4 — Uso sazonal" },
  { value: "zona_5", label: "Zona 5 — Natureza intocada" },
];

export const LIMITES = {
  GLEBAS_POR_PROPRIEDADE: 3,
  TALHOES_POR_GLEBA: 10,
} as const;
