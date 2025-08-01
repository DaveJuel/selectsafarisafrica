
import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  padding: 80px 0;
  background: linear-gradient(to bottom, #f9f9f9, #fff);
`;

export const CallToActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  position: relative;
  height:100%;

  @media (max-width: 960px) {
    display: none;
  }
`;

export const ImageWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 560px;
  object-fit: fill;
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
  }
`;

export const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    color: #656565;
    font-size: 30px;
  }
`;

export const Heading = styled.div`
  margin-bottom: 25px;
`;

export const Subheading = styled.h4`
  font-size: 18px;
  color: #656565;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const MainTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  line-height: 1.3;
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 600px;

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 30px;
  background-color: #656565;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(160, 136, 40, 0.2);

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: #FF9A0A;
    transform: translateY(-3px);

    svg {
      transform: translateX(5px);
    }
  }
`;