import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import truncate from 'html-truncate';

const Content = styled.div`
  padding: 8px;
  word-break: break-word;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const StyledLongText = ({ label, value, maxLength = 100 }) => {
  const cleanHTML = DOMPurify.sanitize(value || '');
  const truncatedHTML = truncate(cleanHTML, maxLength);

  return (
      <Content dangerouslySetInnerHTML={{ __html: truncatedHTML }} />
  );
};

StyledLongText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};

export default StyledLongText;
