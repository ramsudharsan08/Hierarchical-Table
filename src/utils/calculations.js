export function calculateVariance(original, current) {
  if (original === 0) return 0;
  return ((current - original) / original) * 100;
}
