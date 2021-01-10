import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";

const getProductList = (state) => state.productList;

export const CategoryProductsScreen = (props) => {
  const product = props.match.params.product
    ? props.match.params.product.split("_").join(" ")
    : "";
  console.log(product);
  const productList = useSelector(getProductList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(product));

    return () => {
      //
    };
  }, [product]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <Link to={"/product/" + product._id}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt="product"
                    />
                  </Link>
                  <div className="product-name">
                    <Link to={"/product/" + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + " reviews"}
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div>Sorry, No Items to show</div>
          )}
        </ul>
      )}
    </>
  );
};

export default CategoryProductsScreen;
