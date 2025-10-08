import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEntityData } from "../utils/RequestHandler";
import { getEmergencyContacts } from "../data/emergency.contacts";
import LoadingSpinner from "../components/Elements/LoadingSpinner";

export default function InvoiceDownloadPage() {
  const { bookingCode } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [activitiesDetails, setActivitiesDetails] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // 1️⃣ Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingCode]);

   // 3️⃣ Handle invoice download
  const handleDownloadInvoice = async () => {
    try {
      setIsDownloading(true);

      const payload = {
        bookingData,
        itinerary,
        activities: itineraryActivities,
        activitiesDetails,
        emergencyContacts: getEmergencyContacts(itinerary.country),
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

      // Optional: navigate away after a few seconds
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Invoice generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // 2️⃣ Automatically trigger invoice download after data is ready
  useEffect(() => {
    if (!loading && bookingData && itinerary) {
      handleDownloadInvoice();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, bookingData, itinerary]);

  // 4️⃣ Show loading or downloading state
  if (loading || isDownloading) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <LoadingSpinner />
        <p style={{ marginLeft: 10 }}>
          {isDownloading ? "Preparing your invoice..." : "Fetching booking details..."}
        </p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <p>Invoice downloaded successfully. You can close this page.</p>
    </div>
  );
}
