import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export const Product = ({ product }) => {
  return (
    <li key={product._id}>
      <div className="product">
        <Link to={"/product/" + product._id}>
          <img className="product-image" src={product.image} alt="product" />
        </Link>
        <div className="product-details">
          <div className="product-rating">
            <Rating
              value={product.rating}
              text={product.numReviews + " reviews"}
            />
          </div>
          <div className="product-name">
            <Link to={"/product/" + product._id}>{product.name}</Link>
          </div>
          <div className="product-brand">By {product.brand}</div>
          <div className="product-price">Price: ₹{product.price}</div>
        </div>
      </div>
    </li>
  );
};

export default Product;
