// localStorageUtil.ts
export const getItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItemInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
