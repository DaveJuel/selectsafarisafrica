import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Header,
  HeaderSubtitle,
  HeaderTitle,
  ViewWrapper,
} from "../style/itinerary.view.styles";
import ItinerariesListView from "../components/Sections/ItinerariesListView";
import LoadingSpinner from "../components/Elements/LoadingSpinner";

export default function Itineraries() {
  const { t } = useTranslation("itineraries");

  const {
    formData,
    itineraries,
    itineraryActivities,
    allActivities,
    toggleView,
    language,
    setIsPersisting,
    setItinerary,
    setIsModalOpen,
    loadingMainView
  } = useOutletContext();

  const openBookTripModal = (activities) => {
    setIsModalOpen(true);
  };

  // If user accessed page directly without data
  if (!itineraries) {
    return (
      <ViewWrapper>
        <p>{t("no_itineraries_yet")}</p>
      </ViewWrapper>
    );
  }

  if (loadingMainView) return <LoadingSpinner />;

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
        language={language}
        setIsPersisting={setIsPersisting}
        setItinerary={setItinerary}
      />
    </ViewWrapper>
  );
}
