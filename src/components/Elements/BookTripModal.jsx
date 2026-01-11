import { useEffect, useState } from "react";
import {
  apiKey,
  fetchEntityTranslatedData,
  intelligenceUrl,
  makeApiRequest,
  refreshTranslatedData,
} from "../../utils/RequestHandler";
import LoadingSpinner from "./LoadingSpinner";
import EmptyStateView from "./EmptyStateView";
import {
  CloseButton,
  HeaderContent,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  StatusIcon,
  StatusMessage,
} from "../../style/book.trip.modal.styles";
import { useTranslation } from "react-i18next";
import BookingWizard from "../Sections/BookingWizard";

const BookTripModal = ({
  isOpen,
  onClose,
  itinerary,
  handlePreview,
  setBookingData,
  isPersisting,
  language
}) => {
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [defaultBookingStatus, setDefaultBookingStatus] = useState(null);
  const [formData, setFormData] = useState({
    client_name: "",
    client_contact: "",
    trip_start_date: "",
    country_of_origin: "",
    preferred_language: "",
    notes: "",
    booking_code: "",
    accomodation_type: "",
    meal_plan: [],
    transport_mode: "",
  });

  const { t } = useTranslation("booking_form");

  useEffect(() => {
    const fetchBookingStatus = async () => {
      try {
        const response = await fetchEntityTranslatedData("booking_statuses", language);
        if (response.success) {
          const defaultStatus = response.result?.find(
            (item) => item.status.toLowerCase() === t("pending").toLowerCase()
          );
          setDefaultBookingStatus(defaultStatus);
        }
      } catch (error) {
        console.error("Failed to fetch default booking status", error);
      } finally {
        setLoading(false);
      }
    };

    setFormStatus({ message: "", type: "" });
    fetchBookingStatus();
    // eslint-disable-next-line
  }, [itinerary?.id]);

  function generateBookingCode(formData) {
    const namePart = formData.client_name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    const datePart = formData.trip_start_date?.replaceAll("-", "");

    const countryPart = formData.country_of_origin?.slice(0, 3).toUpperCase();

    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return `${namePart}-${datePart}-${countryPart}${randomPart}`;
  }

  const notifyCustomerSuccess = async (booking, isPosted = true) => {
    try {
      const appUrl = process.env.REACT_APP_APP_URL;
      let bookingRequest = {
        booking_code: booking.booking_code,
        itinerary: itinerary.name,
        names: booking.client_name,
        contact: booking.client_contact,
        is_posted: isPosted
      };

      if (isPosted) {
        bookingRequest = {
          ...bookingRequest,
          preview_link: `${appUrl}/booking/${booking.booking_code}`,
          invoice_link: `${appUrl}/invoice/${booking.booking_code}`,
        }
      } else {
        bookingRequest = {
          ...bookingRequest,
          error: 'An error occured: Booking not posted in the database. But you can follow up with the customer.',
        }
      }

      const requestData = {
        chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
        api_key: apiKey,
        message: {
          booking: bookingRequest,
        },
      };
      await makeApiRequest("/notification/notify/telegram", "POST", requestData);
    } catch (error) {
      console.error("Failed to submit notification", error);
    }
  };

  const handleBookTrip = async (e) => {
    const requestData = {
      ...formData,
      status: defaultBookingStatus?.id,
      itinerary: itinerary?.id,
      booking_code: generateBookingCode(formData),
    };
    let isPosted = false;
    try {
        const response = await fetch(`${intelligenceUrl}/api/entity/save/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "entity_name": "bookings",
            "details": requestData
          }),
        });

        const data = await response.json();
        if (data.success) {
          setBookingData(requestData);
          isPosted = true;
          refreshTranslatedData("bookings", language);
        }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      await notifyCustomerSuccess(requestData, isPosted);
      setFormData({
        client_name: "",
        client_contact: "",
        trip_start_date: "",
        country_of_origin: "",
        preferred_language: "",
        notes: "",
        booking_code: "",
      });
      onClose();
      handlePreview();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleBackdropClick}>

      <ModalContainer>
        {isPersisting && (
          <LoadingSpinner />
        )}

        {!isPersisting && (
          <>
            {!itinerary && (
              <EmptyStateView message={t("select_itinerary")} />
            )}
            {itinerary && (
              <>
                <ModalHeader>
                  <HeaderContent>
                    <ModalTitle>
                      {`${t("form_title")} - ${itinerary.name}`}
                    </ModalTitle>
                    {formStatus.message && (
                      <StatusMessage type={formStatus.type}>
                        <StatusIcon type={formStatus.type}>
                          {formStatus.type === "success"
                            ? "✓"
                            : formStatus.type === "error"
                              ? "⚠"
                              : "ℹ"}
                        </StatusIcon>
                        {t(formStatus.message)}
                      </StatusMessage>
                    )}
                  </HeaderContent>
                  <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>
                <ModalContent>
                  {loading && <LoadingSpinner />}
                  {!loading && (
                    <BookingWizard
                      formData={formData}
                      setFormData={setFormData}
                      onSubmit={handleBookTrip}
                      isPersisting={isPersisting}
                      itinerary={itinerary}
                      onClose={onClose}
                    />
                  )}
                </ModalContent>
              </>
            )}
          </>
        )
        }
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BookTripModal;
