import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Filter from '../src/js/components/filter';
import { CATEGORY_NAMES } from '../api/apiConstants';

// Source and explaination: https://webman.pro/blog/how-to-detect-and-test-click-outside-in-react/#testing-enzyme-vs-react-testing-library
export const createDocumentListenersMock = () => {
  const listeners = {};
  const handler = (domEl, event) => listeners?.[event]?.({ target: domEl });
  document.addEventListener = jest.fn((event, cb) => {
    listeners[event] = cb;
  });
  document.removeEventListener = jest.fn(event => {
    delete listeners[event];
  });
  return {
    mouseUp: domEl => handler(domEl, 'mouseup'),
    click: domEl => handler(domEl, 'click'),
  };
};

describe('Render <Filter> shallow testing', () => {

  let FilterWrapper;

  beforeEach(() => {
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

  test('ensure the category down arrow turns to an up arrow after being clicked', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    expect(FilterWrapper.find('.filter__button').text()).toEqual('Category ↑');
  });

  test('ensure clicking the category button twice causes the list to go away', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    expect(FilterWrapper.find('.filter__list')).toHaveLength(1);
    FilterWrapper.find('.filter__button').simulate('click');
    expect(FilterWrapper.find('.filter__list')).toHaveLength(0);
  });

});

describe('Render <Filter> mounted testing', () => {
  
  let FilterWrapper;
  let setCategory = jest.fn();
  const fireEvent = createDocumentListenersMock();

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

  test ('ensure clicking on the document causes the list to collapse', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    expect(FilterWrapper.find('.filter__list')).toHaveLength(1);
    act(() => fireEvent.mouseUp(document.body));
    FilterWrapper.update();
    expect(FilterWrapper.find('.filter__list')).toHaveLength(0);
  });

  test ('ensure firing a click event on a list item checks the target value as containing the list, which then closes the list', () => {
    FilterWrapper.find('.filter__button').simulate('click');
    expect(FilterWrapper.find('.filter__list-item')).toHaveLength(17);
    act(() => fireEvent.mouseUp(document.getElementsByClassName('filter__list-item')[0]));
    FilterWrapper.update();
    expect(FilterWrapper.find('.filter__list')).toHaveLength(0);
  });
});