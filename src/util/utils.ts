function sessionStorageSet(
  key: string | number,
  value: Record<string, unknown>
) {
  sessionStorage.setItem(String(key), JSON.stringify(value));
  return null;
}

export { sessionStorageSet };
