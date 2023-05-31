import PropTypes from 'prop-types';

function Button({type, version, isDisabled, children}) {
  return (
    <button type={type} className={`btn btn-${version}`} disabled={isDisabled}>
        {children}
    </button>
  );
}

Button.propTypes = {
    type: PropTypes.string,
    version: PropTypes.string,
    isDisabled: PropTypes.bool,
    children: PropTypes.node.isRequired
};

Button.defaultProps = {
    type: 'button',
    version: 'primary',
    isDisabled: true
};

export default Button;