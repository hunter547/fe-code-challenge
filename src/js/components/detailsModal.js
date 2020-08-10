import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../../style/components/detailsModal.scss';
import * as storage from '../utilities/storage';

Modal.setAppElement('body');
 
const DetailsModal = (props) => {
  const { product, modalIsOpen, flipModal } = props;
  const manufacturer = product.manufacturer;
  const descr = product.description;
  const name = product.name;
  const url = product.images[0].url;

  const updateCart = () => {
    const currentCart = storage.getItems() ? storage.getItems() : [];
    const price = product.sale === 0 ? product.regular : product.sale;
    const originalArray = JSON.parse(JSON.stringify(currentCart));
    for (var i = 0; i < currentCart.length; i++) {
      if (currentCart[i].id === product.id) {
        currentCart[i].quantity += 1;
        storage.addQuantity(currentCart[i].id, 1);
        break;
      }
    }
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

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={flipModal}
      className="details-modal"
      contentLabel="Example Modal"
    >
      <div className="details-modal__container">
        <div className="details-modal__visual">
          <img className="details-modal__image" src={url}></img>  
        </div>
        <div className="details-modal__right-side">
          <div className="details-modal__content">
            <div className="details-modal__header"><h2>{name}</h2></div>
            <div className="details-modal__description"><h3>{descr}</h3></div>
            <div className="details-modal__manufacturer"><h3><span style={{fontWeight:'500'}}>Made by:</span>{` ${manufacturer.name} in ${manufacturer.location}`}</h3></div>
          </div>
          <div className="details-modal__input">
            <div className="details-modal__cart">
              <button className="details-modal__cart-button" onClick={() => updateCart()}>Add to cart</button>
            </div>
            <div className="details-modal__checkout">
              <Link to="/order">
                <button className="details-modal__cart-button">Checkout</button>
              </Link>
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