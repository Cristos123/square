const getLocalStorageValue = (key) => {
  try {
    const value = globalThis.window?.localStorage.getItem(key);
    return value !== null ? value : null;
  } catch (error) {
    console.error(`Error accessing localStorage for key "${key}":`, error);
    return null;
  }
};
export { getLocalStorageValue };
// Usage example:
const token = getLocalStorageValue("accessToken");
const getCarownerId = getLocalStorageValue("car_owner_user");
