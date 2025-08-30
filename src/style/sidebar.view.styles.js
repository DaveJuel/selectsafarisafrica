import styled, {keyframes} from "styled-components";

export const SidebarSection = styled.div`
  backdrop-filter: blur(3px);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

export const SidebarHeaderSection = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
  flex-direction: column;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 2px solid #0e5033s
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const gradientWave = keyframes`
  0% {
    background-position: 0% 50%;
  }
  62% { /* forward journey (61.8% of cycle) */
    background-position: 200% 50%;
  }
  100% { /* return faster (38.2%) */
    background-position: 0% 50%;
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;

  background: linear-gradient(
    45deg,
    #0e5033 0%,
    #e4bc87 38.2%,
    #7e5b40 61.8%,
    #0e5033 85%,
    #e4bc87 100%
  );
  background-size: 250% 250%; /* smaller = smoother movement */
  
  animation: ${gradientWave} 30s infinite;
  animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);

  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @supports not (background-clip: text) {
    color: #0e5033;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* center on small screens */
  flex-shrink: 0;
  margin-top: 21px;

  @media (max-width: 1024px) {
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    margin-top: 12px;
    justify-content: flex-start; /* or center if navbar collapses */
  }

  @media (max-width: 480px) {
    margin-top: 8px;
    justify-content: center; /* often best for tiny screens */
  }
`;

export const NavigationLinks = styled.nav`
  display: flex;
  gap: 10px;
  margin-bottom: 7px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    padding: 0 8px;
  }
`;

export const NavLink = styled.a`
  color: #e4bc87;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    background: rgba(126, 91, 64, 0.789);
    color: #e4bc87;
  }

  ${(props) =>
    props.active &&
    `
    background: rgba(126, 91, 64, 0.789);
    color: #e4bc87;
    font-weight: 600;
    text-decoration: underline;
  `}

  @media (max-width: 1024px) {
    font-size: 15px;
    padding: 6px 12px;
  }

  @media (max-width: 768px) {
    flex: 1;
    min-width: 0;
    text-align: center;
    font-size: 14px;
    padding: 6px 8px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 4px 6px;
  }
`;
