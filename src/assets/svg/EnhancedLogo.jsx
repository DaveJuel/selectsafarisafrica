import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

export default function EnhancedLogo({ isScrolled = false }) {
  return (
    <LogoWrapper isScrolled={isScrolled}>
      <LogoContainer href="/" aria-label="Revolution Workshop Home">
        <LogoIconWrapper>
          <Logo logo="black" scale={1.7} />
        </LogoIconWrapper>
      </LogoContainer>
    </LogoWrapper>
  );
}

// Styled Components with enhanced aesthetics
const LogoWrapper = styled.div`
  display: ${({ isScrolled }) => (isScrolled ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 8px 0;
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  gap: 16px;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const LogoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: auto;
`;