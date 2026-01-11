import { useOutletContext } from "react-router-dom";
import LoadingSpinner from "../Elements/LoadingSpinner";
import MainSectionView from "./MainSectionView";
import { ViewSection } from "../../style/main.view.styles";

export default function MainView() {
  const {
    itineraries,
    itineraryActivities,
    setItineraryActivities,
    loadingMainView,
    allActivities,
    currentView,
    formData,
    toggleView,
    setIsPersisting,
    setItinerary,
    setIsModalOpen,
    language
  } = useOutletContext();

  const onBookItinerary = (activities) => {
    setItineraryActivities(activities);
    setIsModalOpen(true);
  };

  return (
    <ViewSection>
      {loadingMainView && <LoadingSpinner />}

      {!loadingMainView && (
        <MainSectionView
          currentView={currentView}
          formData={formData}
          itineraries={itineraries}
          itineraryActivities={itineraryActivities}
          openBookTripModal={onBookItinerary}
          toggleView={toggleView}
          allActivities={allActivities}
          language={language}
          setIsPersisting={setIsPersisting}
          setItinerary={setItinerary}
        />
      )}
    </ViewSection>
  );
}
