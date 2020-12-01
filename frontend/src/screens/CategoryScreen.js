import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';


const category = {
    'energy': [
        {
            name: 'solar panel',
            src: '/images/solar.jpeg'
        },
        {
            name: 'LED Bulbs',
            src: '/images/LED.jpeg'
        },
        {
            name: 'Rechargable Batteries',
            src: '/images/battery.jpeg'
        },
        {
            name: 'Solar Water Heater',
            src: '/images/solarheater.jpeg'
        }
    ],
    'essentials': [
        {
            name: 'solar cooker',
            src: '/images/solar-cooker.jpeg'
        },
        {
            name: 'Reusable Grocery Bag',
            src: '/images/Reusable-Grocery-Bag.jpeg'
        },
        {
            name: 'Reusable Water Bottle',
            src: '/images/Reusable-Water-Bottle.jpeg'
        },
        {
            name: 'Coffee Mug',
            src: '/images/Coffee-Mug.jpeg'
        }
    ],
    'others': [
        {
            name: 'solar candles',
            src: '/images/solar-candles.jpeg'
        },
        {
            name: 'shower timer',
            src: '/images/shower-timer.jpeg'
        },
        {
            name: 'Recycled Fabric Clothes',
            src: '/images/Recycled-Fabric-Clothes.jpeg'
        }
    ]
}
function CategoryScreen(props) {
    

  return (
    <>
      {category && <h2 style={{textAlign:'center'}}>{category}</h2>}

        <ul className="products">
          {
            products.length>0?
          products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
              </div>
            </li>
          )): <div>Sorry, No Items to show</div>}
        </ul>
     
    </>
  );
}
export default CategoryScreen;
