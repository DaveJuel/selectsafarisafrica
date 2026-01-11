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
import { useIsSmallScreen } from "../../utils/UseIsSmallScreen";
import { useNavigate } from "react-router-dom";

export default function SidebarView({
  formData,
  setFormData,
  handleItineraryFiltering,
  loading,
  allActivities,
  setAllActivities,
  activities,
  setActivities,
  loadingSidebar,
  setLoadingSidebar,
  language,
  showLanguageModal
}) {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const isSmallScreen = useIsSmallScreen();
  const shouldHideForm = isSmallScreen;

  const menuItems = [
    {
      menuKey: "home",
      key: "home",
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
              onClick={() => navigate(`/${item.key}`)}
            >
              {t(item.menuKey)}
            </NavLink>
          ))}
        </NavigationLinks>
      </SidebarHeaderSection>
      {loading && <LoadingSpinner />}
      {!loading && !shouldHideForm && language && (
        <TouristForm
          formData={formData}
          setFormData={setFormData}
          onFilterItineraries={handleItineraryFiltering}
          allActivities={allActivities}
          setAllActivities={setAllActivities}
          activities={activities}
          setActivities={setActivities}
          loadingSidebar={loadingSidebar}
          setLoadingSidebar={setLoadingSidebar}
          language={language}
          showLanguageModal={showLanguageModal}
        />
      )}
    </SidebarSection>
  );
}
