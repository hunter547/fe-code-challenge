import React from 'react';
import { shallow } from 'enzyme';

import CategoryHeader from '../src/js/components/categoryHeader';

describe('Render <CategoryHeader> component', () => {
  test('render correct the category header', () => {
    const category = 'hello world';
    const CategoryHeaderWrapper = shallow(<CategoryHeader category={category} />);
    console.log(CategoryHeaderWrapper.find(<h2></h2>));
    expect(CategoryHeaderWrapper.find(<h2 />).text()).toEqual(category);
  });
});