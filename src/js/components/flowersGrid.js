import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailsModal from '../components/detailsModal';
import '../../style/components/flowersGrid.scss';
import SaleSVG from '../../assets/Sale';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

const mapStateToProps = state => {
  const { category } = state.category;
  return { category };
};

const FlowersGrid = ({ category }) => {

  const [flowerData, setFlowerData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // The product object is passed to the details modal, containing all the information the modal needs to display
  const [product, setProduct] = useState(null);
  // Used to determine wheter or not to render a message telling the user that the Heroku dynos are waking up.
  const [showHerokuMessage, setShowHerokuMessage] = useState(false);

  // Called from the DetailsModal component to tell FlowersGrid whether or not to display the modal and
  // remove the tooltip timer if necessary.
  const flipModal = (timerID) => {
    setModalIsOpen(!modalIsOpen);
    if (timerID) {
      clearTimeout(timerID);
    }
  };

  // Called when a user selects a grid item - tells the modal to open and 
  // sets a product for it to display information from.
  const newModalData = (product) => {
    flipModal();
    setProduct({
      ...product[0],
      ...product[1]
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => setShowHerokuMessage(true), 1500);
    // Get the current URL in the user's browser
    const env = window.location.href;
    // If a non null category value was passed from props, set the slug to that category in the proper format.
    const parameters = category ? `categories?slug=${category.replace(' ','-').toLowerCase()}` : null;
    let url;
    // Checking to see if the user is online or running locally
    if (env.search(/localhost/i) > 0) {
      url = `http://localhost:8081/${category ? parameters : 'categories'}`;
    }
    else {
      url = `https://bouqs-database.herokuapp.com/${category ? parameters : 'categories'}`;
    }
    // Create a new HTTP request with a method of GET
    const Http = new XMLHttpRequest();
    Http.open('GET', url);
    Http.send();
    // Wait for a response from the HTTP request
    Http.onreadystatechange =() => {
      // Only when the ready state is DONE(4) and the response has a status of 200 should data be set in the application.
      if (Http.readyState==4 && Http.status==200) {
        // Clear out the Heroku message timer, since the data is here and the 
        // message no longer needs to appear when the timer completes.
        clearTimeout(timeOut);
        setFlowerData(JSON.parse(Http.response));
      }
    };
    return () => {
      // This prevents an error when the user goes to the order page before an HTTP response has been received.
      Http.abort();
    };
  }, [category]);

  const loadingStyle = css`
    margin: 0 auto
  `;

  // If it's been 1.5 seconds since the user has been waiting for data, notify them that the application is waiting for a response from Heroku
  if (!flowerData && showHerokuMessage) return <div className="flowergrid__loading"><ClipLoader color="#023440" css={loadingStyle} /><h3>Waiting for Heroku dynos to start...</h3></div>;
  // Initially show only the loading icon for a max of 1.5 seconds while waiting for a response from the HTTP request.
  if (!flowerData) return <div className="flowergrid__loading"><ClipLoader color="#023440" css={loadingStyle} /></div>;
  const products = [];
  // Loop through all the data returned from the HTTP request and push all the products to the products array.
  flowerData.forEach(flower => {
    flower.products.forEach(product => {
      products.push(product);
    });
  });
  return (
    <div className="flowergrid__container">
      <div className="flowergrid">
        {/* Make an grid item for each product */}
        {products.map((product, index) => {
          const regularPrices = [];
          const salePrices = [];
          // Push the regular and sale price for each variant of the product to its respective array.
          product.variants.forEach((variant, index) => {
            regularPrices.push(variant.prices.regular);
            regularPrices[index] = parseFloat(regularPrices[index]);
            salePrices.push(variant.prices.sale);
          });
          let bestPrices = {};
          regularPrices.forEach((price,index) => {
            // Go through the regular prices array and set first item the best prices object
            if (index === 0) {
              bestPrices = {
                regular: Math.ceil(price), 
                sale: Math.ceil(salePrices[index])
              };
            }
            // If it's not the first object in the regular prices array, compare it to the current best prices object.
            // If the current regular price is cheaper than the regular price set in the best price object, replace it.
            else {
              if (bestPrices.regular > price) {
                bestPrices = {
                  regular: Math.ceil(price),
                  sale: Math.ceil(salePrices[index])
                };
              }
            }
          });
          return (
            <div className="flowergrid__item" key={index} onClick={() => newModalData([product, bestPrices])}>
              <img className="flowergrid__item-image" src={product.images[0].url} alt={product.image_alt_tags} />
              {bestPrices.sale > 0 && ( <SaleSVG className="flowergrid__item-badge"/> )}
              <div className="flowergrid__item-content">
                <div className="flowergrid__item-name">{product.name}</div>
                {bestPrices.sale === 0 ? 
                  <div className="flowergrid__item-prices">
                    ${bestPrices.regular}
                  </div>  
                  :
                  <div className="flowergrid__item-prices">
                    <div className="flowergrid__item-sale">${bestPrices.sale}</div>
                    <div className="flowergrid__item-regular">${bestPrices.regular}</div>
                  </div>
                }
              </div>
            </div>
          );
        })}
        {modalIsOpen && ( <DetailsModal modalIsOpen={modalIsOpen} flipModal={(timeOut) => flipModal(timeOut)} product={product} /> )}
      </div>
    </div>
    
  );
};
 
export default connect(mapStateToProps)(FlowersGrid);

FlowersGrid.propTypes = {
  category: PropTypes.oneOfType([
    PropTypes.oneOf(['']),
    PropTypes.string.isRequired
  ])
};