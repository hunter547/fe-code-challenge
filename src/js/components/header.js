import React from 'react';
import '../../style/components/header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Flower from '../../assets/Flower';
import ShoppingCart from '../../assets/ShoppingCart';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  const { cartItems } = state.cartItems;
  return { cartItems };
};

const Header = ({ header, cartItems }) => {

  const quantity = cartItems.reduce((a,b) => a + b.quantity, 0);

  return (
    <header>
      <div className="header__title">
        <div className="header__content">
          <Link to="/">
            <Flower className="header__flower" />
            <h1>{header}</h1>
          </Link>
        </div>
      </div>
      <div className="header__cart-container">
        <Link to="/order">
          <ShoppingCart className="header__cart" />
          {quantity > 0 ? <div className="header__cart-count">{quantity}</div> : null}
        </Link>
      </div>
    </header>
  );
};
 
export default connect(mapStateToProps)(Header);

Header.propTypes = {
  cartItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object.isRequired),
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired
      })
    )
  ]),
  header : PropTypes.string.isRequired
};