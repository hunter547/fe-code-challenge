import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../style/components/filter.scss';
import { connect } from 'react-redux';
import { CATEGORY_NAMES } from '../../../api/apiConstants';
import { setCategory } from '../../redux/actions';

const mapStateToProps = state => {
  const { category } = state.category;
  return { category };
};
 
const Filter = ({ setCategory, category }) => {
  
  const [toggleCategory, setToggleCategory] = useState(false);
  const filterRef = useRef();
  const buttonRef = useRef();

  // Responsible for showing or hiding the category list
  const flipCategory = () => {
    setToggleCategory(!toggleCategory);
  };

  // Clears the category when the filter clear button is clicked.
  const clearCategory = () => {
    setCategory(null);
  };

  const setNewCategory = (newCategory) => {
    setToggleCategory(false);
    setCategory(newCategory);
  };

  // This function is used to determine whether or not the user has clicked 
  // outside of either the category list or the filter button. If they have
  // clicked outside of the list or button, close the list if it is open.
  const handleClickOutside = e => {
    if (filterRef.current) {
      if (!filterRef.current.contains(e.target) && !buttonRef.current.contains(e.target) && toggleCategory) {
        setToggleCategory(false);
      }
    }
  };

  // Add a listener to the document and remove it when unmounting
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
        {toggleCategory && (
          <ul className="filter__list" ref={filterRef}>
            {CATEGORY_NAMES.map((category, index) => {
              return (
                <li className="filter__list-item" key={index} onClick={() => setNewCategory(category)}>{category}</li>
              );
            })}
          </ul> )}
        {category && (
          <div className="filter__clear" onClick={() => clearCategory()}>&times;</div>
        )}
      </div>
    </div>
  );
};
 
export default connect(mapStateToProps, { setCategory })(Filter);

Filter.propTypes = {
  setCategory: PropTypes.func.isRequired,
  category: PropTypes.oneOfType([
    PropTypes.oneOf(['']),
    PropTypes.string.isRequired
  ])
};