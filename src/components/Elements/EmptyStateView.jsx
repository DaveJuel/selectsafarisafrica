import React from "react";
import styled from "styled-components";

const EmptyStateView = ({ message, actionLabel, action }) => {
  return (
    <EmptyStateWrapper>
      <IconWrapper>
        {/* Inline SVG for the icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B0BEC5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="8" x2="16" y2="16" />
          <line x1="16" y1="8" x2="8" y2="16" />
        </svg>
      </IconWrapper>
      <Message>{message}</Message>
      {action && actionLabel && (
        <ActionButton onClick={action}>{actionLabel}</ActionButton>
      )}
    </EmptyStateWrapper>
  );
};

// Styled Components
const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const IconWrapper = styled.div`
  margin-bottom: 15px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  background-color: #1976d2;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }

  &:focus {
    outline: none;
  }
`;

export default EmptyStateView;
