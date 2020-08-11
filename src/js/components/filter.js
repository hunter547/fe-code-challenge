import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../style/components/filter.scss';
import { CATEGORY_NAMES } from '../../../api/apiConstants';
 
const Filter = ({ setCategory }) => {
  
  const [toggleCategory, setToggleCategory] = useState(false);
  const filterRef = useRef();
  const buttonRef = useRef();

  const flipCategory = () => {
    setToggleCategory(!toggleCategory);
  };

  const setNewCategory = (newCategory) => {
    setToggleCategory(false);
    setCategory(newCategory);
  };

  const handleClickOutside = e => {
    if (filterRef.current) {
      if (!filterRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setToggleCategory(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => document.removeEventListener('mouseup', handleClickOutside);
  });

  return (
    <div className="filter">
      <div className="filter__header">FILTER</div>
      <div className="filter__category">
        {toggleCategory ? 
          <button className="filter__button" ref={buttonRef} onClick={() => flipCategory()}>Category &#8593;</button>
          :
          <button className="filter__button" ref={buttonRef} onClick={() => flipCategory()}>Category &#8595;</button>
        }
        {toggleCategory ? <ul className="filter__list" ref={filterRef}>
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