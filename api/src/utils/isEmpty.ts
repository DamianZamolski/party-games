export function isEmpty(x: unknown): boolean {
  return (
    !x ||
    (Array.isArray(x) && x.length === 0) ||
    (typeof x === 'object' && Object.keys(x).length === 0)
  );
}
