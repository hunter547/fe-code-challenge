import React from 'react';
import { mount } from 'enzyme';

import Header from '../src/js/components/header';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { setCart, addCartItem, removeCartItem, addItemQuantity, subtractItemQuantity } from '../src/redux/actions';

// Have to mount the component for all tests because the Header component is 
// wrapped with react router and the provider component.

let mockItems = [
  {
    id: '123',
    name: 'Red Flower',
    price: 20,
    quantity: 10,
    url: 'https://www.google.com/search?q=red+flower'
  },
  {
    id: '1234',
    name: 'Blue Flower',
    price: 15,
    quantity: 3,
    url: 'https://www.google.com/search?q=blue+flower'
  }
];

let mockItemToAdd =
  {
    id: '12345',
    name: 'Green Flower',
    price: 20,
    quantity: 4,
    url: 'https://www.google.com/search?q=green+flower'
  };

describe('Render <Header> mount testing', () => {

  let HeaderWrapper;

  beforeEach(() => {
    store.dispatch(setCart(mockItems));
    HeaderWrapper = mount(
      <Provider store={store}>
        <Router>
          <Header header={'The Bouqs'} />
        </Router>
      </Provider>
    );
    
  });

  afterEach(() => {
    HeaderWrapper.unmount();
  });

  test('render the main header div', () => {
    expect(HeaderWrapper.find('header')).toHaveLength(1);
  });

  test('render the header title div', () => {
    expect(HeaderWrapper.find('.header__title')).toHaveLength(1);
  });

  test('render the header flower svg', () => {
    expect(HeaderWrapper.find('.header__flower')).toHaveLength(2);
  });

  test('render the h2 tag', () => {
    expect(HeaderWrapper.find('h1')).toHaveLength(1);
  });

  test('render the header cart container div', () => {
    expect(HeaderWrapper.find('.header__cart-container')).toHaveLength(1);
  });

  test('render the header cart container div', () => {
    expect(HeaderWrapper.find('.header__cart-container')).toHaveLength(1);
  });

  test('ensure the cart item count div is rendered when items are passed to the component', () => {
    expect(HeaderWrapper.find('.header__cart-count')).toHaveLength(1);
  });

  test('ensure the correct cart item count is shown based on the mock items combined quantities', () => {
    expect(HeaderWrapper.find('.header__cart-count').text()).toEqual('13');
  });

  test('ensure adding quantity to an item causes the item cart count to increase by that same number', () => {
    let oldQuantity = mockItems.reduce((a,b) => a + b.quantity, 0);
    let quantityToAdd = 5;
    store.dispatch(addItemQuantity(mockItems[0].id, quantityToAdd));
    HeaderWrapper.update();
    expect(HeaderWrapper.find('.header__cart-count').text()).toEqual((oldQuantity + quantityToAdd).toString());
  });

  test('ensure subtracting quantity from an item causes the item cart count to decrease by that same number', () => {
    let oldQuantity = mockItems.reduce((a,b) => a + b.quantity, 0);
    let quantityToSubtract = 5;
    store.dispatch(subtractItemQuantity(mockItems[0].id, quantityToSubtract));
    HeaderWrapper.update();
    expect(HeaderWrapper.find('.header__cart-count').text()).toEqual((oldQuantity - quantityToSubtract).toString());
  });

  test('ensure adding an item increases the quantity by the added item\'s quantity', () => {
    store.dispatch(addCartItem(mockItemToAdd));
    HeaderWrapper.update();
    expect(HeaderWrapper.find('.header__cart-count').text()).toEqual(
      (mockItems.reduce((a,b) => a + b.quantity, 0) + mockItemToAdd.quantity).toString()
    );
  });

  test('ensure removing an item decreases the quantity by the removed item\'s quantity', () => {
    store.dispatch(removeCartItem(mockItemToAdd));
    HeaderWrapper.update();
    expect(HeaderWrapper.find('.header__cart-count').text()).toEqual(
      mockItems.reduce((a,b) => a + b.quantity, 0).toString()
    );
  });

  test('ensure sending an empty array for cartItems will not render the cart item count div', () => {
    store.dispatch(setCart([]));
    HeaderWrapper.update();
    expect(HeaderWrapper.find('.header__cart-count')).toHaveLength(0);
  });

});