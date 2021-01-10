import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import NavbarContainer from "./components/NavBarContainer";
import Home from "./screens/Home";
import ChatBotComponent from "./ChatBotComponent";
import CategoryProductsScreen from "./screens/CategoryProductsScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <NavbarContainer userInfo={userInfo} />

      <main className="main">
        <div>
          <ChatBotComponent />
        </div>
        <div className="content">
          <Route path="/orders" component={OrdersScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/products" component={ProductsScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route
            path="/productList/:product"
            component={CategoryProductsScreen}
          />
          <Route
            exact
            path="/category/:category"
            exact={true}
            component={HomeScreen}
          />
          <Route exact path="/" exact={true} component={Home} />
        </div>
      </main>
      <footer className="footer">All right reserved.</footer>
    </BrowserRouter>
  );
}

export default App;
