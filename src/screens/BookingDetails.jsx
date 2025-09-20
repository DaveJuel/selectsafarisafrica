import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEntityData } from "../utils/RequestHandler";
import {
  getFormattedTripDate,
  sortItineraryActivities,
} from "../utils/DataHandler";
import EmptyStateView from "../components/Elements/EmptyStateView";
import LoadingSpinner from "../components/Elements/LoadingSpinner";
import { getEmergencyContacts } from "../data/emergency.contacts";
import {
  ContentContainer,
  ExportButton,
} from "../style/booking.details.styles";
import HeaderSectionView from "../components/Sections/BookingDetails.js/HeaderSectionView";
import BodySectionView from "../components/Sections/BookingDetails.js/BodySectionView";
import FooterSectionView from "../components/Sections/BookingDetails.js/FooterSection";

export default function BookingDetails() {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState(null);
  const [itiniraryActivities, setItineraryActivities] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const [activitiesDetails, setActivitiesDetails] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const { bookingCode } = useParams();
  const printRef = useRef();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bookingResponse = await fetchEntityData("bookings");
        if (!bookingResponse.success) return;

        const booking = bookingResponse.result?.find(
          (b) => b.booking_code === bookingCode
        );
        if (!booking) return;

        setBookingData(booking);

        const itineraryName = booking.itinerary;

        const [
          itineraryResponse,
          itineraryActivitiesResponse,
          activitiesResponse,
        ] = await Promise.all([
          fetchEntityData("itineraries"),
          fetchEntityData("itinirary_activities"),
          fetchEntityData("activities"),
        ]);

        if (itineraryResponse.success) {
          const itineraryData = itineraryResponse.result?.find(
            (item) => item.name === itineraryName
          );
          setItinerary(itineraryData);
        }

        if (itineraryActivitiesResponse.success) {
          const itineraryActivitiesData =
            itineraryActivitiesResponse.result?.filter(
              (item) => item.itinerary === itineraryName
            );
          setItineraryActivities(itineraryActivitiesData);
        }

        if (activitiesResponse.success) {
          setActivitiesDetails(activitiesResponse.result);
        }
      } catch (error) {
        console.error("Failed fetching booking or itinerary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingCode]);

  const activities = sortItineraryActivities(itinerary, itiniraryActivities);

  const renderedDays = [];

  const handleDownloadPDF = async () => {
    if (!bookingData || !itinerary) return;

    try {
      setIsPrinting(true);
      const payload = {
        bookingData,
        itinerary,
        activities: itiniraryActivities,
        activitiesDetails,
        emergencyContacts: getEmergencyContacts(itinerary.country),
      };

      const response = await fetch(
        `${process.env.REACT_APP_INTELLIGENCE_URL}/api/reports/generate-pdf/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "booking.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }finally{
      setIsPrinting(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && !bookingData && (
        <EmptyStateView message={"Invalid booking code"} />
      )}
      {!loading && bookingData && (
        <ContentContainer ref={printRef}>
          {/* Header Section */}
          <HeaderSectionView
            itinerary={itinerary}
            goHome={goHome}
            bookingData={bookingData}
            id="header-section"
          />
          {/* Body Section - Itinerary */}
          <BodySectionView
            itinerary={itinerary}
            activities={activities}
            activitiesDetails={activitiesDetails}
            renderedDays={renderedDays}
            getFormattedTripDate={getFormattedTripDate}
            bookingData={bookingData}
            id="body-section"
          />

          {/* Footer Section */}
          <FooterSectionView
            itinerary={itinerary}
            getEmergencyContacts={getEmergencyContacts}
            id="footer-section"
          />
          <ExportButton className="no-pdf" onClick={handleDownloadPDF} disabled={isPrinting}>
            {isPrinting? `Printing ...`: `Export as PDF`}
          </ExportButton>
        </ContentContainer>
      )}
    </>
  );
}
