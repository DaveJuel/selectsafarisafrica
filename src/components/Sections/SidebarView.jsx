import styled from "styled-components";
import TouristForm from "./TouristForm";
import LogoComponent from "../../assets/svg/Logo";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { useTranslation } from "react-i18next";

export default function SidebarView({
  formData,
  setFormData,
  handleItineraryFiltering,
  toggleView,
  currentView,
  loading,
}) {
  const { t } = useTranslation("common");

  const menuItems = [
    {
      menuKey: "home",
      key: "itiniraries",
    },
    {
      menuKey: "about_us",
      key: "about-us",
    },
    {
      menuKey: "contact_us",
      key: "contact-us",
    },
  ];

  return (
    <SidebarSection>
      <SidebarHeaderSection>
        <LogoContainer>
          <LogoComponent />
        </LogoContainer>
        <SidebarTitle>SELECT SAFARIS AFRICA</SidebarTitle>
        <NavigationLinks>
          {menuItems.map((item) => (
            <NavLink
              key={item.key}
              onClick={() => toggleView(item.key)}
              active={item.key === currentView}
            >
              {t(item.menuKey)}
            </NavLink>
          ))}
        </NavigationLinks>
      </SidebarHeaderSection>
      {loading && <LoadingSpinner />}
      {!loading && (
        <TouristForm
          formData={formData}
          setFormData={setFormData}
          onFilterItineraries={handleItineraryFiltering}
        />
      )}
    </SidebarSection>
  );
}

const SidebarSection = styled.div`
  backdrop-filter: blur(3px);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

const SidebarHeaderSection = styled.div`
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
  border-bottom: 2px solid #0e5033;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const SidebarTitle = styled.h2`
  color: #0e5033;
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 21px;
`;

const NavigationLinks = styled.nav`
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

const NavLink = styled.a`
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
