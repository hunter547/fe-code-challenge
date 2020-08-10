import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/components/filter.scss';
import { CATEGORY_NAMES } from '../../../api/apiConstants';
 
const Filter = ({ setCategory }) => {
  
  const [toggleCategory, setToggleCategory] = useState(false);

  const flipCategory = () => {
    setToggleCategory(!toggleCategory);
  };

  const setNewCategory = (newCategory) => {
    setToggleCategory(false);
    setCategory(newCategory);
  };

  return (
    <div className="filter">
      <div className="filter__header">FILTER</div>
      <div className="filter__category">
        <button className="filter__button" onClick={() => flipCategory()}>Category &#8595;</button>
        {toggleCategory ? <ul className="filter__list">
          {CATEGORY_NAMES.map((category, index) => {
            return (
              <li className="filter__list-item" key={index} onClick={() => setNewCategory(category)}>{category}</li>
            );
          })}
        </ul>
          :
          ''}
        
      </div>
    </div>
  );
};
 
export default Filter;

Filter.propTypes = {
  setCategory: PropTypes.func.isRequired
};