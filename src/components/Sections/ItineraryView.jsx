// ItineraryView.js
import ItinerariesListView from "./ItinerariesListView";
import AdventuresView from "./AdventuresView";
import { useTranslation } from "react-i18next";
import {
  Header,
  HeaderSubtitle,
  HeaderTitle,
  ViewWrapper,
} from "../../style/itinerary.view.styles";
import { useEffect } from "react";

export default function ItineraryView({
  formData,
  itineraries,
  itineraryActivities,
  openBookTripModal,
  allActivities,
  toggleView
}) {
  // const { t } = useTranslation("itineraries");

  const { t, i18n } = useTranslation("itineraries");
  useEffect(() => {
    const detectedLang = i18n.language || window.navigator.language;
    console.log(`Detected language: ${detectedLang}`);
  }, [i18n.language]);
  
  if (!itineraries) {
    return <AdventuresView formData={formData} />;
  }

  return (
    <ViewWrapper>
      <Header>
        <HeaderTitle>
          {t("lets_go_to")} {formData.country}!
        </HeaderTitle>
        <HeaderSubtitle>
          {formData.days} {t("incredible_days")}
        </HeaderSubtitle>
      </Header>
      <ItinerariesListView
        inItineraries={itineraries}
        inItinerariesActivities={itineraryActivities}
        openBookTripModal={openBookTripModal}
        formData={formData}
        allActivities={allActivities}
        toggleView={toggleView}
      />
    </ViewWrapper>
  );
}
