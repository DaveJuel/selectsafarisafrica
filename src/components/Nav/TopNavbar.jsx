import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Wrapper,
  NavInner,
  UlWrapper,
  UlWrapperRight,
  NavLinkItem,
  LogoWrapper,
  MobileMenuIcon,
  MobileCartIcon,
  MobileIconGroup,
} from "../../style/navbar.styles";
import EnhancedLogo from "../../assets/svg/EnhancedLogo";
// import NavbarContact from "../Elements/NavbarContact";
import { defaultMenu } from "../../data/navbar.links";
import SideNavbar from "./SideNavbar";
// import ShoppingCart from "../Elements/ShoppingCart";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuItems, setMenuItems] = useState(defaultMenu);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSideMenuOpen, setDesktopSideMenuOpen] = useState(false);

  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const desktopSideMenuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const isHomepage = location.pathname === "/" || location.pathname === "/home" || location.pathname === "/about-us";
  const isScrolled = y > 30 || !isHomepage;

  // Handle user authentication status
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  // Set menu based on user role
  useEffect(() => {
    setMenuItems(defaultMenu);
  }, [isLoggedIn, userRole]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        desktopSideMenuRef.current &&
        !desktopSideMenuRef.current.contains(event.target)
      ) {
        setDesktopSideMenuOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [desktopSideMenuRef, mobileMenuRef]);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopSideMenuOpen(false);
  }, [location]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (desktopSideMenuOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [desktopSideMenuOpen, mobileMenuOpen]);

  // Handle scroll appearance
  const navbarStyle = {
    backgroundColor: isScrolled ? "#fff" : "transparent",
    boxShadow: isScrolled ? "0px 2px 10px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.3s ease-in-out",
    color: isScrolled ? "#000" : "#fff",
  };


  return (
    <>
      <Wrapper className="flexCenter" style={navbarStyle}>
        <NavInner className="container flexSpaceCenter">
          <LogoWrapper>
            {/* <NavbarContact isScrolled={isScrolled} /> */}
            <MobileIconGroup >
              <MobileCartIcon isScrolled={isScrolled}>
                <ShoppingBagIcon />
              </MobileCartIcon>
              <MobileMenuIcon onClick={openMenu} isScrolled={isScrolled}>
                <span></span>
                <span></span>
                <span></span>
              </MobileMenuIcon>
            </MobileIconGroup>
          </LogoWrapper>

          {/* Desktop Navigation */}
          <UlWrapper className="flexCenter">
            <EnhancedLogo isScrolled={isScrolled} />
          </UlWrapper>

          {/* Right side menu (desktop) */}
          <SideNavbar isOpen={isMenuOpen} onClose={closeMenu} />
          {/* <ShoppingCart isOpen={isCartOpen} onClose={closeCart} /> */}
          <UlWrapperRight className="flexNullCenter">
            {menuItems.map((item, index) => (
              <NavLinkItem key={index} className="semiBold font15 pointer">
                <a
                  href={item.href === "#" ? null : item.href}
                  className={location.pathname === item.href ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.label === "Menu") {
                      openMenu()
                    }
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: isScrolled ? "#333" : "white",
                    }}
                  >
                    {item.icon}
                  </span>
                </a>
              </NavLinkItem>
            ))}
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const ShoppingBagIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);