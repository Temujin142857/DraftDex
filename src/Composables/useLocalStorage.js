export const cacheData = async (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getCachedData = (key) => {
  const cachedData = localStorage.getItem(key);
  return cachedData ? JSON.parse(cachedData) : null;
};
