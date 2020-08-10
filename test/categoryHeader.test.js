import React from 'react';
import { shallow } from 'enzyme';

import CategoryHeader from '../src/js/components/categoryHeader';

describe('Render <CategoryHeader> component', () => {

  let CategoryHeaderWrapper;

  beforeAll(() => {
    CategoryHeaderWrapper = shallow(<CategoryHeader category='hello world'/>);
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