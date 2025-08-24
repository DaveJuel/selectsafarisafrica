import { useState } from "react";
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

export default function MainView() {
  const [itineraries, setItineraries] = useState(null);
  const [allActivities, setAllActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [loadingMainView, setLoadingMainView] = useState(false);
  const [loadingSidebar, setLoadingSidebar] = useState(true);
  const [formData, setFormData] = useState({
    country: null,
    days: 3,
    activities: [],
  });
  const [bookingData, setBookingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("itiniraries");

  const handleItineraryFiltering = async () => {
    toggleView("itiniraries");
    const itineraries = await filterItineraries(
      formData.country,
      formData.days,
      formData.activities,
      setLoadingMainView
    );
    setItineraries(itineraries);
  };

  const toggleView = (view) => {
    setCurrentView(view);
    if (view === "itiniraries") {
      setItineraries(null);
    }
  };

  const onBookItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
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
        />
        <ViewSection>
          {loadingMainView && <LoadingSpinner />}
          {!loadingMainView && (
            <MainSectionView
              currentView={currentView}
              formData={formData}
              itineraries={itineraries}
              openBookTripModal={onBookItinerary}
              toggleView={toggleView}
              allActivities={allActivities}
            />
          )}
        </ViewSection>
      </ContentContainer>
      <BookTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itinerary={selectedItinerary}
        handlePreview={() => handleConfirm()}
        bookingData={bookingData}
        setBookingData={setBookingData}
        tripData={formData}
      />
      <ConfirmBookingModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        itinerary={selectedItinerary}
        bookingData={bookingData}
      />
    </MainWrapper>
  );
}
