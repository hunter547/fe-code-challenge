import React from 'react';
import { shallow, mount } from 'enzyme';

import Filter from '../src/js/components/filter';
import { CATEGORY_NAMES } from '../api/apiConstants';

describe('Render <Filter> shallow testing', () => {

  let FilterWrapper;

  beforeAll(() => {
    FilterWrapper = shallow(<Filter setCategory={jest.fn()}/>);
  });

  test('render the main filter div', () => {
    expect(FilterWrapper.find('.filter')).toHaveLength(1);
  });

  test('render the filter header div', () => {
    expect(FilterWrapper.find('.filter__header')).toHaveLength(1);
  });

  test('render the filter category div', () => {
    expect(FilterWrapper.find('.filter__category')).toHaveLength(1);
  });

  test('render the filter button', () => {
    expect(FilterWrapper.find('.filter__button')).toHaveLength(1);
  });

  // The list and list items should not be shown by default
  test('ensure the filter list isn\'t shown by default', () => {
    expect(FilterWrapper.find('.filter__list')).toHaveLength(0);
  });

  test('ensure any filter list items aren\'t shown by default', () => {
    expect(FilterWrapper.find('.filter__list-item')).toHaveLength(0);
  });

  test('ensure the filter list shows after clicking the category button', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    expect(FilterWrapper.find('.filter__list')).toHaveLength(1);
  });

});

describe('Render <Filter> mounted testing', () => {
  
  let FilterWrapper;
  let setCategory = jest.fn();

  beforeEach(() => {
    FilterWrapper = mount(<Filter setCategory={setCategory} />);
  });

  afterEach(() => {
    FilterWrapper.unmount();
  });

  test('ensure filter list items show after clicking the category button', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    expect(FilterWrapper.find('.filter__list-item')).toHaveLength(17);
  });

  test('ensure filter list items have the correct value', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    CATEGORY_NAMES.forEach((category, index) => {
      expect(FilterWrapper.find('.filter__list-item').at(index).text()).toEqual(category);
    });
  });

  test('ensure the setCategory function is called when a list item is clicked', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    FilterWrapper.find('.filter__list-item').at(0).simulate('click');
    expect(setCategory).toHaveBeenCalledTimes(1);
  });
  
  test('ensure clicking a list item triggers the list go away', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    FilterWrapper.find('.filter__list-item').at(0).simulate('click');
    expect(FilterWrapper.find('.filter__list')).toHaveLength(0);
  });

  test('ensure clicking anywhere other than the list will cause an open list to collapse', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    expect(FilterWrapper.find('.filter__list')).toHaveLength(1);
    FilterWrapper.find('.filter__header').simulate('click');
    expect(FilterWrapper.find('.filter__list')).toHaveLength(1);
  });
});