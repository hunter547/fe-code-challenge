import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../../style/components/detailsModal.scss';
import * as storage from '../utilities/storage';
import ReactTooltip from 'react-tooltip';

Modal.setAppElement('body');
 
const DetailsModal = (props) => {
  const { product, modalIsOpen, flipModal } = props;
  // Get the manufacturer from the product prop.
  const manufacturer = product.manufacturer;
  // Get the description from the product prop.
  const descr = product.description;
  // Get the name from the product prop.
  const name = product.name;
  // Get the url from the product prop.
  const url = product.images[0].url;

  // Used to determine whether or not to display the tooltip after clicking the "Add to cart" button.
  const [showTooltip, setShowTooltip] = useState(false);
  // Used to store the integer that goes along with setting a timer, can be used later to clear a timer with the clearTimeout() function.
  const [timeOut, setTimeOut] = useState(null);
  // Used to get a difference between when a timer is set and the current time.
  const [timeOutStart, setTimeOutStart] = useState(null);
  // Used to trigger the useEffect by passing its value to the second parameter of useEffect.
  const [addToCartPushed, setAddToCartPushed] = useState(0);

  const updateCart = () => {
    // "Add to cart" button has been pressed, so show the "Successfully added to cart" tooltip.
    setShowTooltip(true);
    // Trigger another useEffect mount
    setAddToCartPushed(addToCartPushed + 1);
    // If there are any items in the users cart, return them, otherwise set it to an empty array.
    const currentCart = storage.getItems() ? storage.getItems() : [];
    // If there is a sale price, set the price to that, otherwise set it to the regular price.
    const price = product.sale === 0 ? product.regular : product.sale;
    // Get a deep copy of the arry for comparison later on.
    const originalArray = JSON.parse(JSON.stringify(currentCart));
    // Use a for each statement instead of a .forEach, so that a break can be used
    for (var i = 0; i < currentCart.length; i++) {
      if (currentCart[i].id === product.id) {
        // Once a matching id is found in the currentCart array, add the quantity by one to that item and call the addQuantity function.
        // Break out when finished to avoid unnecessary iterations.
        currentCart[i].quantity += 1;
        storage.addQuantity(currentCart[i].id, 1);
        break;
      }
    }
    // If the deep copy matches the currentCart array, even after the previous for loop, this means no matching item id was found and 
    // a new item must be added to storage.
    if (JSON.stringify(originalArray) === JSON.stringify(currentCart)) {
      storage.addItem({
        id: product.id,
        name: product.name,
        price,
        url: product.images[0].url,
        quantity: 1
      });
    }
  };

  
  useEffect(() => {
    if (showTooltip) {
      const timeDifference = new Date() - timeOutStart;
      // If it's been less than two seconds since the last time the "Add to cart" button was pressed, clear out the current timer
      if (timeDifference < 2000) {
        clearTimeout(timeOut);
      }
      // If the add to cart button was pressed, show the tooltip, set a new timer, and get the current datetime
      ReactTooltip.show();
      setTimeOut(setTimeout(()=> setShowTooltip(false), 2000));
      setTimeOutStart(new Date());
    }
    else {
      // If two seconds have passed without another add to cart click, close the tooltip and clear out the timer
      setTimeOut(null);
      setTimeOutStart(null);
      ReactTooltip.hide();
    }
  }, [addToCartPushed, showTooltip]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => flipModal(timeOut)}
      className="details-modal"
      contentLabel="Example Modal"
    >
      <div className="details-modal__container">
        <div className="details-modal__exit" onClick={() => flipModal(timeOut)}></div>
        <div className="details-modal__visual">
          <img className="details-modal__image" src={url}></img>  
        </div>
        <div className="details-modal__right-side">
          <div className="details-modal__content">
            <div className="details-modal__header"><h2>{name}</h2></div>
            <div className="details-modal__description"><h3>{descr}</h3></div>
            <div className="details-modal__manufacturer"><h3><span style={{fontWeight:'500'}}>Made by:</span>{` ${manufacturer.name} in ${manufacturer.location}`}</h3></div>
          </div>
          <div className="details-modal__input-wrapper">
            <div className="details-modal__input">
              <div className="details-modal__cart">
                <button data-tip data-for="cart-tip" className="details-modal__cart-button" onMouseUp={() => updateCart()}>Add to cart</button>
                <ReactTooltip event="mouseup" eventOff="mousedown" id="cart-tip" isCapture place="top" type="dark" effect="solid">Success, added to cart!</ReactTooltip>
              </div>
              <div className="details-modal__checkout">
                <Link to="/order">
                  <button className="details-modal__cart-button" onClick={() => flipModal(timeOut)}>Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
 
export default DetailsModal;

DetailsModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    ),
    manufacturer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired
    }),
    sale: PropTypes.number.isRequired,
    regular: PropTypes.number.isRequired
  }),
  flipModal: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired
};