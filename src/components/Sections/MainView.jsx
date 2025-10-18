import { useEffect, useState } from "react";
import LoadingSpinner from "../Elements/LoadingSpinner";
import BookTripModal from "../Elements/BookTripModal";
import SidebarView from "./SidebarView";
import MainSectionView from "./MainSectionView";
import ConfirmBookingModal from "../Elements/ConfirmBookingModal";
import {
  ContentContainer,
  MainWrapper,
  ViewSection,
} from "../../style/main.view.styles";
import { filterItineraries } from "../../utils/DataHandler";
import { useTranslation } from "react-i18next";

export default function MainView() {
  const [itineraries, setItineraries] = useState(null);
  const [allActivities, setAllActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [loadingMainView, setLoadingMainView] = useState(false);
  const [loadingSidebar, setLoadingSidebar] = useState(true);
  const [language, setLanguage] = useState(null);
  const [formData, setFormData] = useState({
    country: null,
    days: 3,
    activities: [],
  });
  const [bookingData, setBookingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("itiniraries");
  const [hidePlanForm, setHidePlanForm] = useState(false);
  const [isPersisting, setIsPersisting] = useState(false);

  const { i18n } = useTranslation("common");

  useEffect(() => {
    if (i18n.isInitialized) {
      const detectedLang = i18n.language || window.navigator.language;
      setLanguage(detectedLang);
    } else {
      i18n.on("initialized", () => {
        const detectedLang = i18n.language || window.navigator.language;
        setLanguage(detectedLang);
      });
    }
  }, [i18n]);

  const handleItineraryFiltering = async () => {
    toggleView("itiniraries");
    setHidePlanForm(true);
    const { itineraries, itineraryActivities } = await filterItineraries(
      formData.country,
      formData.days,
      formData.activities,
      setLoadingMainView,
      language
    );
    setItineraries(itineraries);
    setItineraryActivities(itineraryActivities);
  };

  const toggleView = (view) => {
    setCurrentView(view);
    if (view === "itiniraries") {
      setItineraries(null);
      setHidePlanForm(false);
    } else {
      setHidePlanForm(true);
    }
  };



  const onBookItinerary = (selectedItineraryActivities) => {
    setItineraryActivities(selectedItineraryActivities);
    setIsModalOpen(true);
  };


  const handleConfirm = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <MainWrapper>
      <ContentContainer>
        <SidebarView
          formData={formData}
          setFormData={setFormData}
          handleItineraryFiltering={handleItineraryFiltering}
          toggleView={toggleView}
          loadingSidebar={loadingSidebar}
          setLoadingSidebar={setLoadingSidebar}
          currentView={currentView}
          allActivities={allActivities}
          setAllActivities={setAllActivities}
          activities={activities}
          setActivities={setActivities}
          hidePlanForm={hidePlanForm}
          language={language}
        />
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
      </ContentContainer>
      <BookTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itinerary={itinerary}
        itineraryActivities={itineraryActivities}
        allActivities={allActivities}
        handlePreview={() => handleConfirm()}
        bookingData={bookingData}
        setBookingData={setBookingData}
        tripData={formData}
        isPersisting={isPersisting}
      />
      <ConfirmBookingModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        itinerary={itinerary}
        bookingData={bookingData}
      />
    </MainWrapper>
  );
}
