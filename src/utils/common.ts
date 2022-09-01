export function truncateLongNames(name: string, maxLength?: number): string {
  const ending = "...";
  if (!maxLength) {
    maxLength = 30;
  }
  if (name.length <= maxLength) {
    return name;
  }
  return name.substring(0, maxLength - 3) + ending;
}
