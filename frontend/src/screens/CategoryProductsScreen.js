import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts, listProductsWithType } from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../Loader";
import Product from "../components/Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./HomeScreen";

const getProductList = (state) => state.productList;

export const CategoryProductsScreen = (props) => {
  const product = props.match.params.product ? props.match.params.product : "";
  const productList = useSelector(getProductList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(product);
    dispatch(listProductsWithType(product));

    return () => {
      //
    };
  }, [product]);

  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.length > 3 ? (
            <Carousel
              swipeable={false}
              draggable={false}
              infinite={true}
              responsive={responsive}
              ssr={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              autoPlay={true}
              autoPlaySpeed={3000}
              deviceType={"desktop"}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-20-px"
            >
              {products.map((product) => (
                <Product product={product} />
              ))}
            </Carousel>
          ) : products.length > 0 ? (
            products.map((product) => <Product product={product} />)
          ) : (
            <div>Sorry, No Items to show</div>
          )}
        </ul>
      )}
    </>
  );
};

export default CategoryProductsScreen;
