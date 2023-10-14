export function getLocalStorageValue(key) {
  try {
    const value = globalThis.window?.localStorage.getItem(key);
    return value !== null ? value : null;
  } catch (error) {
    console.error(`Error accessing localStorage for key "${key}":`, error);
    return null;
  }
}
