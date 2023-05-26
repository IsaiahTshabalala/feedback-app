import React from 'react';
import PropTypes from 'prop-types';

function Header({text, bgColor, txtColor}) {
  let headerStyle = {
    backgroundColor: bgColor,
    color: txtColor
  };

  return (
    <div style={headerStyle}><h3>{text}</h3></div>
  );
}

Header.defaultProps = {
                        text: "Feedback UI",
                        bgColor: "Navy",
                        txtColor: "Red"
                      };

Header.propTypes = {
                      text: PropTypes.string.isRequired,
                      bgColor: PropTypes.string.isRequired,
                      txtColor: PropTypes.string.isRequired
                    };

export default Header;