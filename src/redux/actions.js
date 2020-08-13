export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const SET_CART = 'SET_CART';
export const ADD_ITEM_QUANTITY = 'ADD_ITEM_QUANTITY';
export const SUBTRACT_ITEM_QUANTITY = 'SUBTRACT_ITEM_QUANTITY';
export const SET_CATEGORY = 'SET_CATEGORY';

export function addCartItem(value) {
  return {type: ADD_CART_ITEM, value};
}

export function removeCartItem(id) {
  return {type: REMOVE_CART_ITEM, id};
}

export function setCart(value) {
  return {type: SET_CART, value};
}

export function addItemQuantity(id, quantity) {
  return {type: ADD_ITEM_QUANTITY, id, quantity};
}

export function subtractItemQuantity(id, quantity) {
  return {type: SUBTRACT_ITEM_QUANTITY, id, quantity};
}

export function setCategory(category) {
  return {type: SET_CATEGORY, category};
}