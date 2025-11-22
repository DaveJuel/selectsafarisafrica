import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEntityTranslatedData, supportedLanguages } from "../utils/RequestHandler";
import { getEmergencyContacts } from "../data/emergency.contacts";
import LoadingSpinner from "../components/Elements/LoadingSpinner";
import { useTranslation } from "react-i18next";

export default function InvoiceDownloadPage() {
  const { bookingCode } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [activitiesDetails, setActivitiesDetails] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [language, setLanguage] = useState(null);

  const { t , i18n} = useTranslation("common");

  useEffect(() => {
    const savedLang = localStorage.getItem("app_language");

    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setLanguage(savedLang);
    } else {
      const defaultLang = i18n.language || window.navigator.language || "en";
      const finalLang = supportedLanguages.includes(defaultLang) ? defaultLang : "en";
      i18n.changeLanguage(finalLang);
      localStorage.setItem("app_language", finalLang);
      setLanguage(finalLang);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingResponse = await fetchEntityTranslatedData("bookings", language);
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
          fetchEntityTranslatedData("itineraries", language),
          fetchEntityTranslatedData("itinirary_activities", language),
          fetchEntityTranslatedData("activities", language),
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
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingCode, language]);

  const handleDownloadInvoice = async () => {
    try {
      setIsDownloading(true);

      const payload = {
        bookingData,
        itinerary,
        activities: itineraryActivities,
        activitiesDetails,
        emergencyContacts: getEmergencyContacts(itinerary.country),
        language: language
      };

      const response = await fetch(
        `${process.env.REACT_APP_INTELLIGENCE_URL}/api/reports/generate-invoice/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to generate invoice");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${bookingCode}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Invoice generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (!loading && bookingData && itinerary) {
      handleDownloadInvoice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, bookingData, itinerary]);

  if (loading || isDownloading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinner />
        <p style={{ marginLeft: 10 }}>
          {isDownloading
            ? t("invoice_preparing")
            : t("fetching_booking_details")}...
        </p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <p>{t("invoice_downloaded")}</p>
    </div>
  );
}
