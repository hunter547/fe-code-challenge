import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../style/components/categoryHeader.scss';

const mapStateToProps = state => {
  const { category } = state.category;
  return { category };
};

const CategoryHeader = ({ category }) => {

  return (
    <div className="categoryheader">
      <h2 className="categoryheader__text">{category}</h2>
    </div>
  );
};
 
export default connect(mapStateToProps)(CategoryHeader);

CategoryHeader.propTypes = {
  category: PropTypes.oneOfType([
    PropTypes.oneOf(['']),
    PropTypes.string.isRequired
  ])
};