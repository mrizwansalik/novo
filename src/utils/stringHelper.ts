export function titleCase(str) {
  return str
    ?.split("_")
    .map(
      (word) => (word && word[0]?.toUpperCase()) + word?.slice(1)?.toLowerCase()
    )
    .join(" ");
}
