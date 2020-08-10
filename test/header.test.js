import React from 'react';
import { mount } from 'enzyme';

import Header from '../src/js/components/header';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

// Have to mount the component for all tests because the Header component is 
// wrapped with react router and the provider component.

describe('Render <Header> mount testing', () => {

  let HeaderWrapper;

  beforeEach(() => {
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

});