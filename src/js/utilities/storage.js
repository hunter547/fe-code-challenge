import store from '../../redux/store';
import { setCart, removeCartItem, addCartItem, addItemQuantity, subtractItemQuantity } from '../../redux/actions';

const setItems = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  if (cartItems) {
    store.dispatch(setCart(cartItems));
  }
};

const getItems = () => {
  return JSON.parse(localStorage.getItem('cartItems'));
};

const addItem = (cartItem) => {
  const currentCart = JSON.parse(localStorage.getItem('cartItems'));
  if (currentCart) {
    currentCart.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(currentCart));
  }
  else {
    const firstItem = [cartItem];
    localStorage.setItem('cartItems', JSON.stringify(firstItem));
  }
  store.dispatch(addCartItem(cartItem));
};

const removeItem = (itemID) => {
  const currentCart = JSON.parse(localStorage.getItem('cartItems'));
  const newCart = currentCart.filter(item => item.id !== itemID);
  localStorage.setItem('cartItems', JSON.stringify(newCart));
  store.dispatch(removeCartItem(itemID));
};

const addQuantity = (itemID, quantity) => {
  const currentCart = JSON.parse(localStorage.getItem('cartItems'));
  for (var i = 0; i < currentCart.length; i++) {
    if (itemID === currentCart[i].id) {
      currentCart[i].quantity += quantity;
      break;
    }
  }
  localStorage.setItem('cartItems', JSON.stringify(currentCart));
  store.dispatch(addItemQuantity(itemID, quantity));
};

const subtractQuantity = (itemID, quantity) => {
  const currentCart = JSON.parse(localStorage.getItem('cartItems'));
  for (var i = 0; i < currentCart.length; i++) {
    if (itemID === currentCart[i].id) {
      currentCart[i].quantity -= quantity;
      break;
    }
  }
  localStorage.setItem('cartItems', JSON.stringify(currentCart));
  store.dispatch(subtractItemQuantity(itemID, quantity));
};

export {
  setItems,
  getItems,
  addItem,
  removeItem,
  addQuantity,
  subtractQuantity
};