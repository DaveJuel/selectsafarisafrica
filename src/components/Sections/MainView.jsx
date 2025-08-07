// MainView.js
import React, { useState } from "react";
import styled from "styled-components";
import { fetchEntityData } from "../../utils/RequestHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import BookTripModal from "../Elements/BookTripModal";
import SidebarView from "./SidebarView";
import MainSectionView from "./MainSectionView";
import ConfirmBookingModal from "../Elements/ConfirmBookingModal";

export default function MainView() {
  const [itineraries, setItineraries] = useState(null);
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

  const fetchItineraries = async () => {
    setLoading(true);
    try {
      const response = await fetchEntityData("itineraries");
      if (response.success) {
        const results = response.result?.filter(
          (item) =>
            item.country === formData.country &&
            parseInt(item.days) === formData.days
        );
        return results;
      }
      return [];
    } catch (error) {
      console.error(`Failed to load itineraries`);
    } finally {
      setLoading(false);
    }
  };

  const handleItineraryFiltering = async () => {
    try {
      toggleView("itiniraries");
      const itineraries = await fetchItineraries();
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

// Styled Components for MainView

const MainWrapper = styled.div`
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  background-image: url("/bg_image2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
   background-attachment: fixed;
  padding: 20px;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 10px;
  height: calc(80vh - 20px);
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
    height: auto;
  }
`;

const ViewSection = styled.div`
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: 100%; /* Take full height of grid cell */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Hide horizontal overflow */

  /* Custom scrollbar styling (optional) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1024px) {
    height: auto; /* Natural height on mobile */
    overflow-y: visible; /* Disable scroll on mobile */
  }
`;
