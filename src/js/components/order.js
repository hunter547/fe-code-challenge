import React from 'react';
import '../../style/components/order.scss';
import { connect } from 'react-redux';
import * as storage from '../utilities/storage';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const mapStateToProps = state => {
  const { cartItems } = state.cartItems;
  return { cartItems };
};

const Order = ({ cartItems }) => {

  const updateItems = (e, id, quantity) => {
    // Get the quantity the user wants to update.
    const inputtedQty = parseInt(document.getElementById(id).value);
    // Prevent the default behavior of the form submitting and causing a refresh.
    e.preventDefault();
    // If the quantity the user inputted is greater than the current quantity, call the add quantity storage function.
    if (inputtedQty > quantity) {
      const addQuantityBy = inputtedQty - quantity;
      storage.addQuantity(id, addQuantityBy);
    }
    // If the quantity is less than the current quantity, call the subtract quantity storage function
    else if (inputtedQty < quantity) {
      storage.subtractQuantity(id, quantity - inputtedQty);
    } 
  };

  const removeItem = (id) => {
    // For some reason, the quantity value of the item being removed would be applied to all
    // items below it. The rerender didn't set the values to the correct quantity, so
    // I had to do it manually with the for loop below. The for loop was key in order to 
    // break out and prevent further changes to quantity values.
    if (cartItems.length > 1) {
      for (var i = 0; i < cartItems.length; i++) {
        // Start making changes when hitting the matching element being removed.
        if (cartItems[i].id === id) {
          // Is this the first element, or any other element other than the last, proceed.
          if (i === 0 || i!== cartItems.length -1) {
            // Go into another for loop, so that each element after the matching element
            // has the quantity set to the row below it. In the rerender, the row below will
            // be shifted up, thus matching the item information it goes with.
            for (var j = i; j < cartItems.length; j++) {
              if (j < cartItems.length - 1) {
                document.getElementById(cartItems[j].id).value = cartItems[j+1].quantity;
              }
            }
          }
          // If it's the last element, set the quantity to the row above / element before it.
          // In the rerender the row will be shifted down, thus matching the item information
          // it goes with.
          else {
            document.getElementById(id).value = cartItems[i-1].quantity;
          }
          break;
        }
      }
    }
    storage.removeItem(id);
    ReactTooltip.hide();
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
                    <div className="order__grid-item-information">
                      <h2>{item.name}</h2>
                      <div className="order__grid-item-numbers">
                        <p>Qty x{item.quantity}</p>
                        <p>@ <span style={{fontWeight:500}}>${item.price}</span> each</p>
                      </div>
                    </div>
                  </div>
                  <div className="order__grid-item-right">
                    <div className="order__grid-item-price">
                      <h2>${item.price * item.quantity}</h2>
                      <form className="order__grid-item-form" onSubmit={(e) => {
                        updateItems(e, item.id, item.quantity);
                      }} >
                        <input className="order__grid-item-input"
                          id={item.id}
                          type="number"
                          inputMode="numeric"
                          defaultValue={item.quantity}
                          min="1"
                          max="99"
                          onKeyDown={(e) => {if(e.keyCode===13) {e.preventDefault();}}}
                        />
                        <input className="order__grid-item-update" type="submit" value="Update Qty" />
                      </form>
                      <div className="order__grid-item-remove-container">
                        <div data-tip data-for="remove-tip" className="order__grid-item-remove" onClick={() => removeItem(item.id)}>&times;</div>
                        <ReactTooltip id="remove-tip" isCapture place="top" type="warning" effect="solid">Remove item</ReactTooltip>
                      </div>
                    </div>
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