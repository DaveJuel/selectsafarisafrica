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
  const [itinerary, setItinerary] = useState(null);
  const [itineraryActivities, setItineraryActivities] = useState([]);
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
  const [hidePlanForm, setHidePlanForm] = useState(false);

  const handleItineraryFiltering = async () => {
    toggleView("itiniraries");
    setHidePlanForm(true);
    const { itineraries, itineraryActivities } = await filterItineraries(
      formData.country,
      formData.days,
      formData.activities,
      setLoadingMainView
    );
    setItineraries(itineraries);
    setItineraryActivities(itineraryActivities);
  };

  const toggleView = (view) => {
    setCurrentView(view);
    if (view === "itiniraries") {
      setItineraries(null);
      setHidePlanForm(false);
    }else{
      setHidePlanForm(true);
    }
  };

  const onBookItinerary = (selectedItinerary, selectedItineraryActivities) => {
    setItinerary(selectedItinerary);
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
