import React from 'react';
import PropTypes from 'prop-types';

function Card({children, cardReverse}) {
  return (
    <div className={`card ${cardReverse && 'reverse'}`}>
        {children}
    </div>
  );
}

Card.propTypes = {
    cardReverse: PropTypes.bool,
    children: PropTypes.node.isRequired
};

Card.defaultProps = {
    cardReverse: false
};

export default Card;
