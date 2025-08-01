import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

export default function MobileLogo({ isScrolled }) {
  return (
    <LogoWrapper>
      <LogoContainer href="/" aria-label="Revolution Workshop">
        <LogoIconWrapper>
          <Logo logo="black" scale={1.5}/>
        </LogoIconWrapper>
      </LogoContainer>
    </LogoWrapper>
  );
}

// Styled Components with enhanced aesthetics
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  gap: 12px;

  &:hover {
    transform: scale(1.03);
  }
`;

const LogoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: auto;
`;
