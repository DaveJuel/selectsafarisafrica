import styled from "styled-components";

// Media query breakpoints
const sizes = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1200px"
};

// Styled Components
export const PageContainer = styled.div`
  background-color: white;
  width: 100%;
  padding-bottom: 60px;
  
  @media (max-width: 1023px) {
    padding-bottom: 80px; // Enough space for sticky button
  }
`;

export const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px; /* narrower padding for mobile */

  @media (min-width: 768px) {
    padding: 0 40px; /* restore full padding for larger screens */
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export const FormContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 100%;
  background: rgba(255, 255, 255, 0.92);
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  
  /* Responsive adjustments */
  @media (min-width: ${sizes.mobile}) {
    padding: 30px;
    max-width: 90%;
  }
  
  @media (min-width: ${sizes.tablet}) {
    padding: 40px;
    max-width: 420px;
  }
  
  @media (min-width: ${sizes.laptop}) {
    padding: 50px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  
  /* Responsive font size */
  @media (min-width: ${sizes.tablet}) {
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  @media (min-width: ${sizes.laptop}) {
    font-size: 32px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  
  @media (min-width: ${sizes.tablet}) {
    gap: 20px;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #000;
  background-color: transparent;
  transition: all 0.3s ease;
  margin: 0;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #333;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: #666;
  }
  
  @media (min-width: ${sizes.tablet}) {
    padding: 14px 16px;
    font-size: 15px;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 5px;
  font-size: 12px;
  
  @media (min-width: ${sizes.tablet}) {
    font-size: 14px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-sizing: border-box;
  
  &:hover {
    background-color: #333;
  }
  
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
  
  @media (min-width: ${sizes.tablet}) {
    padding: 14px;
    font-size: 16px;
  }
`;

export const GoogleButton = styled(Button)`
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 0;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  @media (min-width: ${sizes.tablet}) {
    gap: 10px;
  }
`;

export const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
    
    @media (min-width: ${sizes.tablet}) {
      width: 18px;
      height: 18px;
    }
  }
`;

export const ViewButton = styled.button`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 12px 24px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: #222;
    transform: translateY(-2px);
    font-weight: 600;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const ArrowIcon = styled.span`
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
  animation: slideIn 0.3s ease forwards;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  width: 100%;
  
  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  
  span {
    padding: 0 10px;
    color: #666;
    font-size: 12px;
    
    @media (min-width: ${sizes.tablet}) {
      padding: 0 15px;
      font-size: 14px;
    }
  }
  
  @media (min-width: ${sizes.tablet}) {
    margin: 20px 0;
  }
`;

export const StatusDisplay = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px 16px;
  border-radius: 6px;
  min-height: 44px;
  transition: all 0.3s ease;

  ${(props) =>
    props.hasError
      ? `
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    opacity: 1;
    transform: translateY(0);
  `
      : `
    background-color: transparent;
    border: 1px solid transparent;
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
  `}
`;

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  color: #dc2626;
  flex-shrink: 0;
`;

export const StatusText = styled.span`
  font-size: 0.9rem;
  color: #dc2626;
  font-weight: 500;
  line-height: 1.4;
`;

export const LoginLink = styled.p`
  margin-top: 15px;
  font-size: 13px;
  color: #333;
  text-align: center;
  
  a {
    color: #000;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (min-width: ${sizes.tablet}) {
    margin-top: 20px;
    font-size: 14px;
  }
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) =>
    show ? "translateX(-50%)" : "translateX(-50%) translateY(20px)"};
  transition: opacity 0.5s ease, transform 0.5s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ScrollArrow = styled.div`
  width: 30px;
  height: 30px;
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  transform: rotate(45deg);
  animation: pulse 2s infinite ease-in-out;

  @keyframes pulse {
    0%,
    100% {
      transform: rotate(45deg) scale(1);
    }
    50% {
      transform: rotate(45deg) scale(1.3);
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FullWidthImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const HeroSection = styled.div`
  height: 30vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  padding-top: 80px;
  @media (max-width: 768px) {
    padding-top: 80px;
    margin-bottom: 20px;
  }
`;

export const HeroTitle = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: 12px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 6px;
  }
`;

export const HeroSubtitle = styled.h2`
  color: white;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 6px;
  margin-top: 16px;
`;

export const SectionSubHeading = styled.h3`
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 24px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SectionDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 32px;
  max-width: 700px;
`;