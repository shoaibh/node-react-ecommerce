import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const propTypes = {
  link: PropTypes.string.isRequired,
  sizeBtn: PropTypes.string.isRequired,
  lightOrDark: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

const ButtonInternalLink = ({link, sizeBtn, lightOrDark, content}) => 
  <a href={link} target='_blank'>
    <Button size={sizeBtn} color={lightOrDark}>
      {content}
    </Button>
  </a>;

ButtonInternalLink.propTypes = propTypes;

export default ButtonInternalLink;
