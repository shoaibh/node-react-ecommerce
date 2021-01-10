import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../Loader";
import Product from "../components/Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const responsive = {
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const getProductList = (state) => state.productList;
function HomeScreen(props) {
  const category = props.match.params.category
    ? props.match.params.category
    : "";
  const productList = useSelector(getProductList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

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
}
export default HomeScreen;
