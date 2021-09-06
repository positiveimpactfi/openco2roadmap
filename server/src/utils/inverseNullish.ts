export const inverseNullish = <B, T>(value: B, fallback: T): undefined | T => {
  if (value === undefined || value === null) {
    return undefined;
  }
  return fallback;
};
