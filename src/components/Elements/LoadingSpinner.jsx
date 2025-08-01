import React from "react";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <LoadingDot delay="0s" />
      <LoadingDot delay="0.2s" />
      <LoadingDot delay="0.4s" />
    </LoadingContainer>
  );
};

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: rgba(248, 248, 247, 0.82);
  backdrop-filter: blur(15px);
`;

const LoadingDot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #656565;
  margin: 0 5px;
  animation: bounce 1.5s infinite ease-in-out;
  animation-delay: ${(props) => props.delay || "0s"};

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
`;
export default LoadingSpinner;
