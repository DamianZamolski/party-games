export function getTopStackItem() {
  return new Error().stack?.[1];
}
