import React from 'react';
import PropTypes from 'prop-types';
import '../../style/components/categoryHeader.scss';

const CategoryHeader = ({ category }) => {

  return (
    <div className="categoryheader">
      <h2>{category}</h2>
    </div>
  );
};
 
export default CategoryHeader;

CategoryHeader.propTypes = {
  category: PropTypes.oneOfType([
    PropTypes.oneOf(['']),
    PropTypes.string.isRequired
  ])
};