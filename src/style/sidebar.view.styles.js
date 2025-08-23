import styled from "styled-components";

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
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

export const SidebarTitle = styled.h2`
  color: #0e5033;
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 21px;
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
  color: #0e5033;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    background: rgba(14, 80, 51, 0.1);
    color: #0e5033;
  }

  ${(props) =>
    props.active &&
    `
    background: rgba(18, 45, 34, 0.15);
    color: #e4bc87;
    font-weight: 600;
  `}

  @media (max-width: 768px) {
    flex: 1;
    min-width: 0;
    text-align: center;
  }
`;
