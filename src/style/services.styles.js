
import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  background-color: #f9f9f9;
`;

export const HeaderInfo = styled.div`
  margin-bottom: 50px;
  text-align: center;
  position: relative;

  h1 {
    margin-bottom: 20px;
    font-size: 2.5rem;
  }

  p {
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 860px) {
    text-align: center;
  }
`;

export const HeadingUnderline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #A2A3B0, #656565);
  margin: 0 auto 25px;
  border-radius: 2px;
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
`;

export const ServiceCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: ${(props) =>
    props.active
      ? `0 15px 30px rgba(0, 0, 0, 0.15), 0 0 0 2px ${props.accentColor}`
      : "0 8px 20px rgba(0, 0, 0, 0.08)"};
  padding: 30px 25px;
  text-align: center;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  h3 {
    font-size: 20px;
    margin: 20px 0 15px;
    color: #333;
    font-weight: 600;
    transition: color 0.3s ease;
    color: ${(props) => (props.active ? props.accentColor : "#333")};
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    flex-grow: 1;
    margin-bottom: 20px;
  }

  &:hover {
    transform: translateY(-8px);
  }
`;

export const LogoWrapper = styled.div`
  width: 90px;
  height: 90px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => ( props.accentColor)};
  border-radius: 50%;
  transition: all 0.3s ease;

  svg {
    width: 45px;
    height: 45px;
    color: ${(props) => (props.active ? "#fff" : "#555")};
    transition: all 0.3s ease;
  }
`;

export const LearnMoreButton = styled.button`
  background: ${(props) => (props.active ? props.accentColor : "transparent")};
  color: ${(props) => (props.active ? "#fff" : props.accentColor)};
  border: 2px solid ${(props) => props.accentColor};
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: ${(props) => props.accentColor};
    color: white;
  }
`;
