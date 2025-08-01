import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../Elements/LoadingSpinner';
import { fetchEntityData } from '../../utils/RequestHandler';

const SideNavbar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const menuRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchCategories = async () => {
      try{
        const response = await fetchEntityData('product_categories');
        if(response.success){
          setCategories(response.result);
        }
      }catch(error){
        console.error(`Failed to fetch categories`, error);
      }finally{
        setLoading(false);
      }
    }
    fetchCategories();
  },[]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <MenuOverlay isOpen={isOpen} onClick={onClose} />
      <SideMenuContainer ref={menuRef} isOpen={isOpen}>
        <SideMenuContent>
          <MenuHeader>
            <MenuTitle>Menu</MenuTitle>
            <CloseButton onClick={onClose}>
              <FaTimes size={20} />
            </CloseButton>
          </MenuHeader>

          <MainMenuLinks>
            <MainLink href="/" isActive={location.pathname === "/"}>
              Home
            </MainLink>
            <MainLink href="/shop" isActive={location.pathname === "/shop"}>
              Shop All
            </MainLink>

            <CategorySection>
              <SectionTitle>Categories</SectionTitle>
              {loading && <LoadingSpinner />}
              {!loading && categories.map((category) => (
                <SubLink key={category.category} href={`/shop/${category.category.toLowerCase()}`} isActive={location.pathname === `/shop/${category.category.toLowerCase()}`}>
                  {category.category}
                </SubLink>
              ))}
            </CategorySection>
          </MainMenuLinks>

          <FooterLinks>
            <FooterLink href="/about-us" isActive={location.pathname === "/about-us"}>
              About
            </FooterLink>
            <FooterLink href="/contact-us" isActive={location.pathname === "/contact-us"}>
              Contact
            </FooterLink>
          </FooterLinks>
        </SideMenuContent>
      </SideMenuContainer>
    </>
  );
};

export default SideNavbar;

// Styled components
const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 998;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const SideMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 30px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const SideMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 30%;
  color: #212121;
  background-color: #ffffff;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 999;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    width: 85vw;
    max-width: 320px;
  }

  @media (max-width: 480px) {
    width: 90vw;
    max-width: 300px;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #000;
  padding-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 25px;
    padding-bottom: 12px;
  }
`;

const MenuTitle = styled.h2`
  margin: 0;
  font-weight: 600;
  color: #000;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 22px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
  color: #000;

  &:hover {
    background-color: #f5f5f5;
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MainMenuLinks = styled.div`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const MainLink = styled.a`
  display: block;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
  color: #212121;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: ${({ isActive }) => (isActive ? '30%' : '0')};
    height: 2px;
    background-color: #000;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #000;
    
    &:after {
      width: 30%;
    }
  }
  
  ${({ isActive }) => isActive && `
    font-weight: 600;
    color: #000;
  `}

  @media (max-width: 768px) {
    padding: 12px 0;
    font-size: 16px;
  }
`;

const CategorySection = styled.div`
  margin-top: 25px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const SectionTitle = styled.h3`
  margin: 25px 0 15px;
  font-size: 14px;
  color: #757575;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;

  @media (max-width: 768px) {
    margin: 20px 0 12px;
    font-size: 13px;
  }
`;

const SubLink = styled.a`
  display: block;
  padding: 10px 0;
  font-size: 16px;
  color: #424242;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  padding-left: 10px;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 0;
    background-color: #000;
    transition: height 0.2s ease, top 0.2s ease;
  }

  &:hover {
    color: #000;
    
    &:before {
      height: 20px;
      top: calc(50% - 10px);
    }
  }
  
  ${({ isActive }) => isActive && `
    color: #000;
    font-weight: 500;
    
    &:before {
      height: 20px;
      top: calc(50% - 10px);
    }
  `}

  @media (max-width: 768px) {
    padding: 8px 0;
    font-size: 15px;
    padding-left: 8px;
  }
`;

const FooterLinks = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 2px solid #000;

  @media (max-width: 768px) {
    padding-top: 15px;
  }
`;

const FooterLink = styled.a`
  display: block;
  padding: 12px 0;
  font-size: 16px;
  color: #424242;
  text-decoration: none;
  transition: color 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 14px;

  &:hover {
    color: #000;
  }
  
  ${({ isActive }) => isActive && `
    color: #000;
    font-weight: 600;
  `}

  @media (max-width: 768px) {
    padding: 10px 0;
    font-size: 13px;
  }
`;