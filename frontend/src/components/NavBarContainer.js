import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { isBrowser } from "react-device-detect";
import Submenu from "./Submenu";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Badge,
} from "reactstrap";

const styles = {
  itemMenu: {
    padding: "10px",
    listStyleType: "none",
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "30px 18px 0 18px",
    borderColor: " #072a48 transparent transparent transparent",
    position: "absolute",
    zIndex: "3",
  },
  navbarBackground: {
    backgroundColor: "#072a48",
    zIndex: 3,
  },
};

const ListItem = {
  essentials: [
    "Solar Cooker",
    "Reusable Grocery Bag",
    "Reusable Water Bottle",
    "Coffee Mug",
  ],
  energy: [
    "Solar Panel",
    "LED Bulbs",
    "Rechargable Batteries",
    "Solar Water Heater",
  ],
  others: ["Solar Candles", "Shower Timer", "Recycled Fabric Clothes"],
};

const arrowStyleSubmenu = (subMenuCategorySelected, id, arrowDown) =>
  subMenuCategorySelected === id && <div style={arrowDown}></div>;

class NavbarContainer extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      subMenuOpen: false,
      subMenuCategorySelected: "",
      openCartPreview: false,
    };
    this.handleSubMenuExit = this.handleSubMenuExit.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleSubMenuEnter = (x) => {
    this.setState({
      subMenuOpen: true,
      subMenuCategorySelected: x,
    });
  };

  handleSubMenuExit = () => {
    this.setState({
      subMenuOpen: false,
      subMenuCategorySelected: "",
    });
  };

  render() {
    const { isOpen, subMenuCategorySelected, subMenuOpen } = this.state;
    const { itemMenu, arrowDown, navbarBackground } = styles;

    const categoriesNavItems = (id) =>
      isBrowser ? (
        <NavItem
          style={itemMenu}
          onMouseEnter={() => this.handleSubMenuEnter(id)}
        >
          <NavLink to={`/${id}`} className="text-white">
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </NavLink>{" "}
          {arrowStyleSubmenu(subMenuCategorySelected, id, arrowDown)}
        </NavItem>
      ) : (
        <NavItem style={itemMenu}>
          <NavLink to={`/${id}`} className="text-white">
            {id}
          </NavLink>
        </NavItem>
      );

    const subMenuHoverBrowser = subMenuOpen && isBrowser && (
      <Submenu
        option={subMenuCategorySelected}
        ItemList={ListItem[subMenuCategorySelected]}
        handleSubMenuExit={this.handleSubMenuExit}
      />
    );

    return (
      <div className="sticky-top">
        <Navbar light expand="md" style={navbarBackground}>
          <Link to="/" style={itemMenu} className="text-white">
            {" "}
            Home
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            {categoriesNavItems("energy")}
            {categoriesNavItems("essentials")}
            {categoriesNavItems("others")}
          </Collapse>

          <NavItem style={itemMenu}>
            <NavLink to="/cart" className="text-white mr-5">
              cart
            </NavLink>
            {this.props.userInfo ? (
              <NavLink to="/profile" className="text-white mr-5">
                {this.props.userInfo.name}
              </NavLink>
            ) : (
              <NavLink to="/signin" className="text-white mr-5">
                Sign In
              </NavLink>
            )}
            {this.props.userInfo && this.props.userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#" className="text-white mr-5">
                  Admin
                </a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders" className="text-white mr-3">
                      Orders
                    </Link>
                    <Link to="/products" className="text-white mr-3">
                      Products
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </NavItem>
        </Navbar>
        {subMenuHoverBrowser}
      </div>
    );
  }
}

export default NavbarContainer;
