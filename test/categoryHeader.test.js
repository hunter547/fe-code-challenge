import React from 'react';
import { mount } from 'enzyme';
import store from '../src/redux/store';
import { Provider } from 'react-redux';
import { setCategory } from '../src/redux/actions';


import CategoryHeader from '../src/js/components/categoryHeader';

describe('Render <CategoryHeader> component', () => {

  let CategoryHeaderWrapper;

  beforeAll(() => {
    store.dispatch(setCategory('hello world'));
    CategoryHeaderWrapper = mount(<Provider store={store}><CategoryHeader /></Provider>);
  });

  test('render the category header div', () => {
    expect(CategoryHeaderWrapper.find('.categoryheader')).toHaveLength(1);
  });

  test('render the category header h2', () => {
    expect(CategoryHeaderWrapper.find('.categoryheader__text')).toHaveLength(1);
  });

  test('render correct category header text of "hello world"', () => {
    expect(CategoryHeaderWrapper.find('.categoryheader__text').text()).toEqual('hello world');
  });

});