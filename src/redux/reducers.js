import { combineReducers } from 'redux';

import { ADD_CART_ITEM, REMOVE_CART_ITEM, SET_CART, ADD_ITEM_QUANTITY, SUBTRACT_ITEM_QUANTITY, SET_CATEGORY } from './actions';

const initialCartState = { cartItems: [] };
const initialCategoryState = { category: '' };

function cartItems(state = initialCartState, action) {
  switch (action.type) {
  case ADD_CART_ITEM:
    return Object.assign({}, state, {
      cartItems: [
        ...state.cartItems,
        action.value
      ]
    });
  case REMOVE_CART_ITEM:
    return Object.assign({}, state, {
      cartItems: [
        ...state.cartItems.filter(item => item.id !== action.id)
      ]
    });
  case SET_CART:
    return Object.assign({}, state, {
      cartItems: action.value
    });
  case ADD_ITEM_QUANTITY:
    return Object.assign({}, state, {
      cartItems: [
        ...state.cartItems.map(item => {
          if (item.id === action.id) {
            return Object.assign({}, item, {
              quantity: item.quantity + action.quantity
            });
          }
          return item;
        })
      ]
    });
  case SUBTRACT_ITEM_QUANTITY:
    return Object.assign({}, state, {
      cartItems: [
        ...state.cartItems.map(item => {
          if (item.id === action.id) {
            return Object.assign({}, item, {
              quantity: item.quantity - action.quantity
            });
          }
          return item;
        })
      ]
    });  
  default:
    return state;
  }
}

function category(state = initialCategoryState, action) {
  switch (action.type) {
  case SET_CATEGORY:
    return Object.assign({}, state, {
      category: action.category
    });
  default:
    return state;
  }
  
}

const flowersApp = combineReducers({
  cartItems,
  category
});

export default flowersApp;