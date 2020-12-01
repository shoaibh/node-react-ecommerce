import PropTypes from 'prop-types';
import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const propTypes = {
  option: PropTypes.string.isRequired, 
  ItemList: PropTypes.array.isRequired, 
  handleSubMenuExit: PropTypes.func.isRequired
}


const styles = {
  subMenu: {
    width: '100%',
    height: '250px',
    backgroundColor:'rgba(255, 255, 255, 0.9)',
    position: 'absolute', 
    top:'0', 
    left:'0', 
    zIndex:'2'
  },
  subMenuImage: {
    width: '100%',
    maxHeight: '300px',
    padding:'70px'
  },
  subMenuCategories: {
    paddingTop:'70px'
  },
  subMenuCategoriesUl: {
    listStyleType: 'none',
    fontSize: '15px'
  },
  subMenuCategory: {
    color: '#343a40'
  }
}

const Submenu = ({
  option, 
  ItemList, 
  handleSubMenuExit
}) => {
  console.log("===",{option})
    return(
  <div style={styles.subMenu} onMouseLeave={handleSubMenuExit}>
    <Row>
      <Col md="3">
        <img alt={option} style={styles.subMenuImage} src={option === 'energy' ? 
        '/images/Energy.jpeg' :
        option === 'essentials'?
        '/images/Essentials.jpeg': '/images/others.jpeg'} />
        </Col>
        <Col style={styles.subMenuCategories}>
          <p><strong>Categories</strong></p>
          <div style={styles.subMenuCategoriesUl}>
            {
                ItemList
                .map(x => <div key={x} ><Link to={`/productslist/${option}`} style={styles.subMenuCategory}> {x}</Link></div>) 
            }
          </div>
        </Col>
    </Row>
  </div>
)};

Submenu.propTypes = propTypes;

export default Submenu;
