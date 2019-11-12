import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 1em 2rem;
  display: inline-block;
  border: none;
  border-radius: 4px;
  background-color: #aaa;
  color: #fff;
  outline: none;
  cursor: pointer;
`;

const Button = ({ type, as, href, disabled, onClick, children }) => {
  return (
    <StyledButton
      type={type}
      as={as}
      href={href}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string,
  as: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
