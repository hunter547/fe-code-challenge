import React from 'react';
import '../../style/components/order.scss';
import { connect } from 'react-redux';
import * as storage from '../utilities/storage';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  const { cartItems } = state.cartItems;
  return { cartItems };
};

const Order = ({ cartItems }) => {

  const removeItems = (e, id, quantity) => {
    // Get the quantity the user wants to remove.
    const inputtedQty = parseInt(document.getElementById(id).value);
    document.getElementById(id).value = '1';
    // Prevent the default behavior of the form submitting and causing a refresh.
    e.preventDefault();
    // If the quantity the user inputted matches the total quantity, remove the item entirely.
    if (quantity === inputtedQty) {
      storage.removeItem(id);
    }
    // If the quantity is less than the total quantity, subtract the quantity from the item
    else {
      storage.subtractQuantity(id, inputtedQty);
    } 
  };

  // Calculate the subtotal of the products by summing the product of the price and quantity of all items.
  const subtotal = cartItems.reduce((a,b) => a + (b.price * b.quantity), 0);

  return (
    <div className="order">
      <div className="order__header">
        <h1>Review Order</h1>
        <div className="order__header-underline"></div>
      </div>
      <div className="order__content">
        <div className="order__grid">
          {cartItems.length > 0 ? cartItems.map((item, index) => {
            return (
              <div className="order__grid-item" key={index}>
                <div className="order__grid-item-content">
                  <div className="order__grid-item-left">
                    <div className="order__grid-item-visual">
                      <img src={item.url} className="order__grid-item-image"></img>
                    </div>
                    <div className="order__grid-item-header">
                      <h2>{item.name}</h2>
                      <p>Qty x{item.quantity}</p>
                      <p>@ <span style={{fontWeight:500}}>${item.price}</span> each</p>
                    </div>
                  </div>
                  <div className="order__grid-item-price">
                    <h2>${item.price * item.quantity}</h2>
                    <form className="order__grid-item-form" onSubmit={(e) => {
                      removeItems(e, item.id, item.quantity);
                    }} >
                      <input className="order__grid-item-input"
                        id={item.id}
                        type="number"
                        inputMode="numeric"
                        defaultValue="1" 
                        min="1" 
                        max={item.quantity}
                        onKeyDown={(e) => {if(e.keyCode===13) {e.preventDefault();}}}
                      />
                      <input className="order__grid-item-remove" type="submit" value="Remove" />
                    </form>
                  </div>
                </div>
              </div>
            );
          })
            :
            <div className="order__grid-item">
              <h2>Your cart is empty</h2>
            </div>
          }
        </div>
        {/* No items in the cart? Remove the order summary panel */}
        {cartItems.length > 0 ?
          <div className="order__summary">
            <div className="order__summary-content">
              <div className="order__summary-subtotal">
                <h2>Subtotal:</h2>
                <h2>${subtotal}</h2>
              </div>
              <div className="order__summary-shipping">
                <h2>Estimated shipping:</h2>
                <h2>$11</h2>
              </div>
              <div className="order__summary-total">
                <h2>Order total:</h2>
                <h2>${subtotal + 11}</h2>
              </div>
            </div>
          </div> 
          : 
          null
        }
      </div>
    </div>
  );
};
 
export default connect(mapStateToProps)(Order);

Order.propTypes = {
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
  ]
  )
};