import TouristForm from "./TouristForm";
import LogoComponent from "../../assets/svg/Logo";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { useTranslation } from "react-i18next";
import {
  LogoContainer,
  NavigationLinks,
  NavLink,
  SidebarHeaderSection,
  SidebarSection,
  SidebarTitle,
} from "../../style/sidebar.view.styles";

export default function SidebarView({
  formData,
  setFormData,
  handleItineraryFiltering,
  toggleView,
  currentView,
  loading,
  allActivities,
  setAllActivities,
  activities,
  setActivities,
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
          allActivities={allActivities}
          setAllActivities={setAllActivities}
          activities={activities}
          setActivities={setActivities}
        />
      )}
    </SidebarSection>
  );
}
