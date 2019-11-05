import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 3rem 0;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 90%;
  max-width: 960px;
`;

export default function Section({ withContainer, children }) {
  return (
    <StyledSection>
      {withContainer ? <Container>{children}</Container> : { children }}
    </StyledSection>
  );
}

Section.defaultProps = {
  withContainer: false,
};

Section.propTypes = {
  withContainer: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
