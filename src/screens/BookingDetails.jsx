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
  const [pdfMode, setPdfMode] = useState(false);
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

  // const handleDownloadPDF = async () => {
  //   if (!printRef.current) return;
  //   setPdfMode(true);
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const addPageWithBg = async (element, isFirstPage = false) => {
  //     // Render element into canvas
  //     const canvas = await html2canvas(element, {
  //       scale: 2,
  //       useCORS: true,
  //       ignoreElements: (el) => el.classList.contains("no-pdf"),
  //     });
  //     const imgData = canvas.toDataURL("image/png");
  //     // Then overlay content
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       0,
  //       0,
  //       pdfWidth,
  //       (canvas.height * pdfWidth) / canvas.width
  //     );

  //     if (!isFirstPage) pdf.addPage();
  //   };

  //   // Find sections
  //   const headerEl = printRef.current.querySelector("#header-section");

  //   // const bodyEl = printRef.current.querySelector("#body-section");
  //   const footerEl = printRef.current.querySelector("#footer-section");

  //   // Add header page
  //   if (headerEl) await addPageWithBg(headerEl);

  //   // Add body page
  //   const dayCards = printRef.current.querySelectorAll(".day-card");
  //   for (let i = 0; i < dayCards.length; i++) {
  //     await addPageWithBg(dayCards[i], i === 0 && !headerEl);
  //   }

  //   // Add footer page
  //   if (footerEl) await addPageWithBg(footerEl);

  //   pdf.save("booking.pdf");
  //   setPdfMode(false);
  // };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setPdfMode(true);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    let isFirstPage = true;

    const addPageWithBg = async (element) => {
      // Add new page before content (except for first page)
      if (!isFirstPage) {
        pdf.addPage();
      }

      // Render element into canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        ignoreElements: (el) => el.classList.contains("no-pdf"),
      });
      const imgData = canvas.toDataURL("image/png");

      // Add content to current page
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        (canvas.height * pdfWidth) / canvas.width
      );

      isFirstPage = false;
    };

    // Find sections
    const headerEl = printRef.current.querySelector("#header-section");
    const footerEl = printRef.current.querySelector("#footer-section");

    // Add header page
    if (headerEl) await addPageWithBg(headerEl);

    // Add body pages (day cards)
    const dayCards = printRef.current.querySelectorAll(".day-card");
    for (let i = 0; i < dayCards.length; i++) {
      await addPageWithBg(dayCards[i]);
    }

    // Add footer page
    if (footerEl) await addPageWithBg(footerEl);

    pdf.save("booking.pdf");
    setPdfMode(false);
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
            showNotes={pdfMode}
          />

          {/* Footer Section */}
          <FooterSectionView
            itinerary={itinerary}
            getEmergencyContacts={getEmergencyContacts}
            id="footer-section"
          />
          <ExportButton className="no-pdf" onClick={handleDownloadPDF}>
            Export as PDF
          </ExportButton>
        </ContentContainer>
      )}
    </>
  );
}
