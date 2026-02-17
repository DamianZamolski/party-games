export function pick<Object extends object>(
  obj: Object | undefined,
  keys: (keyof Object)[],
): Partial<Object> | undefined {
  if (!obj) {
    return undefined;
  }

  const result: Partial<Object> = {};

  keys.forEach((key: keyof Object) => {
    result[key] = obj[key];
  });

  return result;
}
