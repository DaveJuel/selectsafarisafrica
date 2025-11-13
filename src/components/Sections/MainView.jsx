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
import PreBookingConfirmationModal from "../Elements/PreBookingConfirmationModal";
import SetLanguageModal from "../Elements/SetLanguageModal";

export default function MainView() {
  const [itineraries, setItineraries] = useState(null);
  const [allActivities, setAllActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [loadingMainView, setLoadingMainView] = useState(false);
  const [loadingSidebar, setLoadingSidebar] = useState(true);
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState({
    country: null,
    days: 3,
    activities: [],
  });
  const [bookingData, setBookingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSetLanguageModalOpen, setIsSetLanguageModalOpen] = useState(false);
  const [isPreConfirmModalOpen, setIsPreConfirmModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("itiniraries");
  const [hidePlanForm, setHidePlanForm] = useState(false);
  const [isPersisting, setIsPersisting] = useState(false);

  const supportedLanguages = ["en", "fr", "zh", "ar", "es", "pt-pt", "ja", "ko"];

  const { i18n } = useTranslation("common");

  useEffect(() => {
    const savedLang = localStorage.getItem("app_language");

    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setLanguage(savedLang);
    } else {
      const defaultLang = i18n.language || window.navigator.language || "en";
      const normalized = defaultLang.split("-")[0];
      const finalLang = supportedLanguages.includes(normalized) ? normalized : "en";
      i18n.changeLanguage(finalLang);
      localStorage.setItem("app_language", finalLang);
      setLanguage(finalLang);
    }
    // eslint-disable-next-line
  }, []);

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
    setIsPreConfirmModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleSelectLanguage = (langCode) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem("app_language", langCode);
    setIsSetLanguageModalOpen(false);
    window.location.reload();
  }

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
          showLanguageModal={() => setIsSetLanguageModalOpen(true)}
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
        handlePreview={() => setIsPreConfirmModalOpen(true)}
        bookingData={bookingData}
        setBookingData={setBookingData}
        tripData={formData}
        isPersisting={isPersisting}
        language={language}
      />
      <ConfirmBookingModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        itinerary={itinerary}
        bookingData={bookingData}
      />
      <SetLanguageModal
        isOpen={isSetLanguageModalOpen}
        onClose={() => setIsSetLanguageModalOpen(false)}
        onLanguageSelect={handleSelectLanguage}
        language={language}
      />
      <PreBookingConfirmationModal bookingData={bookingData} isOpen={isPreConfirmModalOpen} onClose={() => setIsPreConfirmModalOpen(false)} itinerary={itinerary} bookingFee={50} onPaymentSuccess={handleConfirm} onBookLater={handleConfirm} />
    </MainWrapper>
  );
}
