export const LIMITES = {
  TALHOES_POR_PROPRIEDADE: 10,
} as const;

export interface AreaValidationResult {
  valid: boolean;
  warning?: string;
}

export function validateAreaFilhos(
  areaPai: number | null,
  areasFilhos: (number | null)[]
): AreaValidationResult {
  if (areaPai === null || areaPai === undefined) {
    return { valid: true };
  }

  const somaFilhos = areasFilhos
    .filter((a): a is number => a !== null && a !== undefined)
    .reduce((acc, a) => acc + a, 0);

  if (somaFilhos > areaPai) {
    return {
      valid: false,
      warning: `A área total dos filhos (${somaFilhos} m²) excede a área do pai (${areaPai} m²)`,
    };
  }

  return { valid: true };
}
