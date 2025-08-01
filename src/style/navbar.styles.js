import styled from "styled-components";

// Styled Components
export const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 70px;
  
  @media (min-width: 768px) {
    height: 80px;
  }
`;

export const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  @media (min-width: 860px) {
    width: auto;
  }
`;

export const UlWrapper = styled.ul`
  display: none;
  margin: 0;
  padding: 0;
  
  @media (min-width: 860px) {
    display: flex;
    margin-left: 20px;
  }
  
  @media (min-width: 1024px) {
    margin-left: 40px;
  }
`;

export const NavLinkItem = styled.li`
  list-style: none;
  padding: 0;
  margin: 0 5px;
  
  a {
    display: block;
    padding: 10px 15px;
    color: #333;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
    
    &:hover {
      color: #000000;
    }
    
    &.active {
      color: #000000;
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 15px;
        right: 15px;
        height: 3px;
        background-color: #3C8C3C;
        border-radius: 1.5px;
      }
    }
  }
  
  @media (min-width: 1024px) {
    margin: 0 10px;
  }
`;

export const ProfileLink = styled.li`
  list-style: none;
  
  a {
    display: block;
    padding: 8px 16px;
    background-color: #f8f8f8;
    color: #000000;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #3C8C3C;
      color: white;
    }
  }
`;

// Updated dropdown components
export const DropdownItem = styled.li`
  position: relative;
  list-style: none;
  margin: 0 5px;
  
  > a {
    display: block;
    padding: 10px 15px;
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #000000;
    }
    
    &.active {
      color: #000000;
      
      &:after {
        content: '';
        position: static;
        bottom: 0;
        left: 15px;
        right: 15px;
        height: 3px;
        background-color: #000000;
        border-radius: 1.5px;
      }
    }
  }
  
  &:hover .mega-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  @media (min-width: 1024px) {
    margin: 0 10px;
  }
`;

// New MegaMenu component
export const MegaMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  width: auto;
  max-width: 1200px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 10px;
  
  @media (max-width: 860px) {
    display: none;
  }

  @media (max-width: 1200px) {
    max-width: calc(100vw - 40px);
    margin-left: calc(-50vw + 20px);
  }
`;

export const MegaMenuColumn = styled.div`
  flex: 1;
  min-width: 180px;
  padding: 0 15px;
`;

export const MenuColumnTitle = styled.h4`
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 15px 0;
  padding-bottom: 15px;
`;

export const MenuItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  
  li {
    margin-bottom: 15px;
    
    a {
      color: #000000;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: color 0.2s ease;
      display: block;
      
      &:hover {
        color: #3C8C3C;
      }
      
      &.active {
        color: #3C8C3C;
      }
    }
  }
`;

export const UlWrapperRight = styled.ul`
  display: none;
  align-items: center;
  margin: 0;
  padding: 0;
  
  li {
    list-style: none;
    margin-left: 20px;
    
    a {
      color: #000000;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #3C8C3C;
      }
    }
  }
  
  @media (min-width: 860px) {
    display: flex;
  }
`;

export const BtnWrapper = styled.div`
  width: 140px;
  height: 42px;
  
  @media (min-width: 1024px) {
    width: 160px;
  }
`;

export const MobileIconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (min-width: 860px) {
    display: none;
  }
`;

export const MobileCartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: ${({ isScrolled }) => (isScrolled ? "#000000" : "#ffffff")};
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  @media (min-width: 860px) {
    display: none;
  }
`;

export const MobileMenuIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  cursor: pointer;
  
  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: ${({ isScrolled }) => (isScrolled ? "#000000" : "#ffffff")};
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  
  @media (min-width: 860px) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 320px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  z-index: 1000;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  
  .mobile-auth {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
  
  .mobile-btn-wrapper {
    margin-top: 20px;
    padding: 0 10px;
  }
  
  .profile-link {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #f8f8f8;
    color: #000000;
    border-radius: 8px;
    width: auto;
    
    &:hover {
      background-color: #3C8C3C;
      color: white;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #000000;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const MobileNavLink = styled.div`
  margin: 10px 0;
  
  a {
    display: block;
    padding: 12px 10px;
    color: #333;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover, &.active {
      background-color: rgba(238, 167, 70, 0.1);
      color: #000000;
    }
  }
`;

export const MobileDropdownToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  cursor: pointer;
  border-radius: 8px;
  color: #000000;
  
  span {
    font-size: 18px;
  }
  
  &:hover {
    background-color: rgba(238, 167, 70, 0.05);
    color: #000000;
  }
`;

export const MobileDropdownMenu = styled.ul`
  list-style: none;
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding-left: 20px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  
  li {
    margin: 0;
    
    a {
      display: block;
      padding: 12px 20px;
      color: #333;
      text-decoration: none;
      font-size: 15px;
      transition: all 0.2s ease;
      
      &:hover, &.active {
        color: #000000;
      }
    }
  }
`;
