// dataService.ts
import { Item } from './interfaces';
import { getItemFromLocalStorage, setItemInLocalStorage, removeItemFromLocalStorage } from './localStorageUtil';

const STORAGE_KEY = 'items';

export const getAllItems = (): Item[] => {
  const items = getItemFromLocalStorage(STORAGE_KEY);
  return items || [];
};

export const addItem = (item: Item): void => {
  const items = getAllItems();
  items.push(item);
  setItemInLocalStorage(STORAGE_KEY, items);
};

export const updateItem = (updatedItem: Item): void => {
  const items = getAllItems();
  const index = items.findIndex((item) => item.id === updatedItem.id);
  if (index !== -1) {
    items[index] = updatedItem;
    setItemInLocalStorage(STORAGE_KEY, items);
  }
};

export const deleteItem = (itemId: number): void => {
  const items = getAllItems();
  const updatedItems = items.filter((item) => item.id !== itemId);
  setItemInLocalStorage(STORAGE_KEY, updatedItems);
};
