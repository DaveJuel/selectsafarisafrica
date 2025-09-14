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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
    const element = printRef.current;

    window.scrollTo(0, 0);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      ignoreElements: (el) => el.classList.contains("no-pdf"),
    });

    const imgData = canvas.toDataURL("image/png");

    // PDF setup
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Original canvas dimensions
    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    };

    // Always fit by width, keep aspect ratio
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let position = 0;
    let heightLeft = imgHeight;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("booking.pdf");
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
          <HeaderSectionView goHome={goHome} bookingData={bookingData} />
          {/* Body Section - Itinerary */}
          <BodySectionView
            itinerary={itinerary}
            activities={activities}
            activitiesDetails={activitiesDetails}
            renderedDays={renderedDays}
            getFormattedTripDate={getFormattedTripDate}
            bookingData={bookingData}
          />

          {/* Footer Section */}
          <FooterSectionView
            itinerary={itinerary}
            getEmergencyContacts={getEmergencyContacts}
          />
          <ExportButton className="no-pdf" onClick={handleDownloadPDF}>
            Export as PDF
          </ExportButton>
        </ContentContainer>
      )}
    </>
  );
}
