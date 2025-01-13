import { Item } from "../types/estimates";

export const calculateCategoryTotal = (items: Item[], category: string) => {
  return items
    .filter((item) => item.category === category)
    .reduce((total, item) => total + item.price * item.quantity + (item.price * item.quantity * item.margin) / 100, 0);
};

export const calculateTotalMargin = (items: Item[]) => {
  return items.reduce((total, item) => total + (item.price * item.quantity * item.margin) / 100, 0);
};

export const calculateGrandTotal = (items: Item[]) => {
  return items.reduce(
    (total, item) => total + item.price * item.quantity + (item.price * item.quantity * item.margin) / 100,
    0
  );
};
