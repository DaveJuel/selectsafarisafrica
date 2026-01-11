import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BookTripModal from "../Elements/BookTripModal";
import ConfirmBookingModal from "../Elements/ConfirmBookingModal";
import PreBookingConfirmationModal from "../Elements/PreBookingConfirmationModal";
import SetLanguageModal from "../Elements/SetLanguageModal";
import { ContentContainer, MainWrapper } from "../../style/main.view.styles";
import { filterItineraries } from "../../utils/DataHandler";
import SidebarView from "../Sections/SidebarView";

export default function MainLayout() {
  const { i18n } = useTranslation("common");

  const [itineraries, setItineraries] = useState(null);
  const [allActivities, setAllActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [loadingMainView, setLoadingMainView] = useState(false);
  const [loadingSidebar, setLoadingSidebar] = useState(true);
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState({ country: null, days: 3, activities: [] });
  const [bookingData, setBookingData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSetLanguageModalOpen, setIsSetLanguageModalOpen] = useState(false);
  const [isPreConfirmModalOpen, setIsPreConfirmModalOpen] = useState(false);

  const [currentView, setCurrentView] = useState("itiniraries");
  const [hidePlanForm, setHidePlanForm] = useState(false);
  const [isPersisting, setIsPersisting] = useState(false);

  const toggleView = (view) => {
    setCurrentView(view);
    setHidePlanForm(view !== "itiniraries");
  };

  const handleItineraryFiltering = async () => {
    toggleView("itiniraries");
    const result = await filterItineraries(
      formData.country,
      formData.days,
      formData.activities,
      setLoadingMainView,
      language
    );
    setItineraries(result.itineraries);
    setItineraryActivities(result.itineraryActivities);
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
          showLanguageModal={() => setIsSetLanguageModalOpen(true)}
        />

        <Outlet
          context={{
            itineraries,
            itinerary,
            setItinerary,
            itineraryActivities,
            setItineraryActivities,
            loadingMainView,
            allActivities,
            currentView,
            formData,
            toggleView,
            setIsPersisting,
            setIsModalOpen,
            language
          }}
        />
      </ContentContainer>

      {/* Modals */}
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

      <PreBookingConfirmationModal
        bookingData={bookingData}
        isOpen={isPreConfirmModalOpen}
        onClose={() => setIsPreConfirmModalOpen(false)}
        itinerary={itinerary}
        bookingFee={50}
        onPaymentSuccess={handleConfirm}
        onBookLater={handleConfirm}
      />
    </MainWrapper>
  );
}
