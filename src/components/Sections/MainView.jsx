// MainView.js
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
  const [loading, setLoading] = useState(false);
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
    try {
      toggleView("itiniraries");
      const itineraries = await filterItineraries(
        formData.country,
        formData.days,
        formData.activities,
        setLoading
      );
      setItineraries(itineraries);
    } catch (error) {
      console.error(`Failed to handle form submit`);
    }
  };

  const toggleView = (view) => {
    setCurrentView(view);
    if (view === "itiniraries") {
      setItineraries(null);
    }
  };

  const onBookItinerary = (itinerary, itiniraryActivities) => {
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
          loading={loading}
          currentView={currentView}
          allActivities={allActivities}
          setAllActivities={setAllActivities}
          activities={activities}
          setActivities={setActivities}
        />
        <ViewSection>
          {loading && <LoadingSpinner />}
          {!loading && (
            <MainSectionView
              currentView={currentView}
              formData={formData}
              itineraries={itineraries}
              openBookTripModal={onBookItinerary}
              toggleView={toggleView}
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
