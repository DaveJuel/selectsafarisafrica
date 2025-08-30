import styled from "styled-components";

// Wrapper
export const ViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

// Header
export const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
    padding-bottom: 16px;
  }

  @media (max-width: 480px) {
    margin-bottom: 18px;
    padding-bottom: 12px;
  }
`;

// Title
export const HeaderTitle = styled.h2`
  color: #0e5033;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #0e5033, #0e5033, #0e5033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #e4bc87;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

// Subtitle
export const HeaderSubtitle = styled.p`
  color: #e4bc87;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
