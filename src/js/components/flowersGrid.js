import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DetailsModal from '../components/detailsModal';
import '../../style/components/flowersGrid.scss';
import SaleSVG from '../../assets/Sale';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';



const FlowersGrid = ({ category }) => {

  const [flowerData, setFlowerData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [showHerokuMessage, setShowHerokuMessage] = useState(false);
  const timeOut = setTimeout(() => setShowHerokuMessage(true), 1500);

  const flipModal = (timerID) => {
    setModalIsOpen(!modalIsOpen);
    if (timerID) {
      clearTimeout(timerID);
    }
  };

  const newModalData = (product) => {
    flipModal();
    setProduct({
      ...product[0],
      ...product[1][0]
    });
  };

  useEffect(() => {
    const env = window.location.href;
    let url;
    if (env.search(/localhost/i) > 0) {
      url = `http://localhost:8081/${category ? parameters : 'categories'}`;
    }
    else {
      url = `https://bouqs-database.herokuapp.com/${category ? parameters : 'categories'}`;
    }
    const Http = new XMLHttpRequest();
    const parameters = category ? `categories?slug=${category.replace(' ','-').toLowerCase()}` : null;
    Http.open('GET', url);
    Http.send();
    Http.onreadystatechange =() => {
      if (Http.readyState==4 && Http.status==200) {
        clearTimeout(timeOut);
        setFlowerData(JSON.parse(Http.response));
      }
    };
  }, [category]);

  const loadingStyle = css`
    margin: 0 auto
  `;

  if (!flowerData && showHerokuMessage) return <div className="flowergrid__loading"><ClipLoader color="#023440" css={loadingStyle} /><h3>Waiting for Heroku dynos to start...</h3></div>; 
  if (!flowerData) return <div className="flowergrid__loading"><ClipLoader color="#023440" css={loadingStyle} /></div>;
  const products = [];
  flowerData.forEach(flower => {
    flower.products.forEach(product => {
      products.push(product);
    });
  });
  return (
    <div className="flowergrid__container">
      <div className="flowergrid">
        {products.map((product, index) => {
          const regularPrices = [];
          const salePrices = [];
          product.variants.forEach((variant, index) => {
            regularPrices.push(variant.prices.regular);
            regularPrices[index] = parseFloat(regularPrices[index]);
            salePrices.push(variant.prices.sale);
          });
          const bestPrices =[];
          regularPrices.forEach((price,index) => {
            if (index === 0) {
              bestPrices.push({
                regular: Math.ceil(price), 
                sale: Math.ceil(salePrices[index])
              });
            }
            else {
              if (bestPrices[0].regular > price) {
                bestPrices[0] = {
                  regular: Math.ceil(price),
                  sale: Math.ceil(salePrices[index])
                };
              }
            }
          });
          return (
            <div className="flowergrid__item" key={index} onClick={() => newModalData([product, bestPrices])}>
              <img className="flowergrid__item-image" src={product.images[0].url} alt={product.image_alt_tags} />
              {bestPrices[0].sale ? <SaleSVG className="flowergrid__item-badge"/> : null}
              <div className="flowergrid__item-content">
                <div className="flowergrid__item-name">{product.name}</div>
                {bestPrices[0].sale === 0 ? 
                  <div className="flowergrid__item-prices">
                    ${bestPrices[0].regular}
                  </div>  
                  :
                  <div className="flowergrid__item-prices">
                    <div className="flowergrid__item-sale">${bestPrices[0].sale}</div>
                    <div className="flowergrid__item-regular">${bestPrices[0].regular}</div>
                  </div>
                }
              </div>
            </div>
          );
        })}
        {modalIsOpen ? <DetailsModal modalIsOpen={modalIsOpen} flipModal={(timeOut) => flipModal(timeOut)} product={product} /> : null}
      </div>
    </div>
    
  );
};
 
export default FlowersGrid;

FlowersGrid.propTypes = {
  category: PropTypes.oneOfType([
    PropTypes.oneOf(['']),
    PropTypes.string.isRequired
  ])
};