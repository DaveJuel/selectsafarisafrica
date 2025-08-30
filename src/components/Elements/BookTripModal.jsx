import { useEffect, useState } from "react";
import {
  apiKey,
  fetchEntityData,
  makeApiRequest,
  publicPass,
  publicUser,
  saveEntityData,
} from "../../utils/RequestHandler";
import LoadingSpinner from "./LoadingSpinner";
import {
  getLoggedInUser,
  isUserLoggedIn,
  loginUser,
  logoutUser,
} from "../../utils/AuthHandler";
import EmptyStateView from "./EmptyStateView";
import { getTodayDateISO } from "../../utils/DataHandler";
import { FiCalendar, FiMail, FiMap, FiUser } from "react-icons/fi";
import { BiChat } from "react-icons/bi";
import {
  ButtonGroup,
  CancelButton,
  CloseButton,
  ErrorMessage,
  FormGroup,
  HeaderContent,
  Input,
  InputWrapper,
  LabelWithIcon,
  Loader,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  Select,
  StatusIcon,
  StatusMessage,
  SubmitButton,
  ToggleButton,
  ToggleContainer,
} from "../../style/book.trip.modal.styles";
import { logger } from "../../utils/logger";
import { persistItinerary } from "../../utils/DataPersistenceHandler";

const BookTripModal = ({
  isOpen,
  onClose,
  itinerary,
  itineraryActivities,
  allActivities,
  handlePreview,
  setBookingData,
  tripData,
}) => {
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [defaultBookingStatus, setDefaultBookingStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");
  const [isPersisting, setIsPersisting] = useState(false);
  const [persistedItinerary, setPersistedItinerary] = useState(itinerary);
  const [formData, setFormData] = useState({
    client_name: "",
    client_contact: "",
    trip_start_date: "",
    country_of_origin: "",
    preferred_language: "",
    notes: "",
    booking_code: "",
  });

  useEffect(() => {
    const loginStatus = isUserLoggedIn();
    if (loginStatus) {
      const currentUser = getLoggedInUser();
      setFormData((prev) => ({
        ...prev,
        client_contact: currentUser.username || "",
        client_name: currentUser.user_names || "",
      }));
    }
  }, []);

  useEffect(() => {
    if (!itinerary?.id && isOpen) {
      const persistData = async () => {
        try {
          setIsPersisting(true);
          const persisted = await persistItinerary(
            { ...itinerary, country: tripData.country },
            itineraryActivities,
            allActivities
          );
          setPersistedItinerary(persisted);
        } catch (error) {
          logger.error("Failed to persist itinerary", error);
        } finally {
          setIsPersisting(false);
        }
      };
      persistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinerary]);

  useEffect(() => {
    const fetchBookingStatus = async () => {
      try {
        const response = await fetchEntityData("booking_statuses");
        if (response.success) {
          const defaultStatus = response.result?.find(
            (item) => item.status.toLowerCase() === "pending"
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
  }, []);

  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.client_name?.trim()) {
      newErrors.client_name = "Name is required";
    }

    if (!formData.client_contact.trim()) {
      newErrors.client_contact =
        contactMethod === "email"
          ? "Email is required"
          : "WhatsApp number is required";
    } else if (contactMethod === "email") {
      if (!/\S+@\S+\.\S+/.test(formData.client_contact)) {
        newErrors.client_contact = "Please enter a valid email";
      }
    } else if (contactMethod === "whatsapp") {
      if (!/^\+?[0-9]{7,15}$/.test(formData.client_contact)) {
        newErrors.client_contact =
          "Please enter a valid WhatsApp number (e.g. +123456789)";
      }
    }

    if (!formData.trip_start_date) {
      newErrors.trip_start_date = "Start date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const notifyCustomerSuccess = async (booking) => {
    const appUrl = process.env.REACT_APP_APP_URL;
    const bookingRequest = {
      booking_code: booking.booking_code,
      itinerary: itinerary.name,
      names: booking.client_name,
      contact: booking.client_contact,
      preview_link: `${appUrl}/booking/${booking.booking_code}`,
    };

    const requestData = {
      chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
      api_key: apiKey,
      message: {
        booking: bookingRequest,
      },
    };
    await makeApiRequest("/notification/notify/telegram", "POST", requestData);
  };

  const handleBookTrip = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        setIsSubmitting(true);
        await loginUser(publicUser, publicPass);
        const tripItinerary = itinerary?.id ? itinerary : persistedItinerary;
        const requestBody = {
          ...formData,
          status: defaultBookingStatus.id,
          itinerary: tripItinerary.id,
          booking_code: generateBookingCode(formData),
        };
        const response = await saveEntityData("bookings", requestBody);
        if (response.success) {
          setBookingData(requestBody);
          await notifyCustomerSuccess(requestBody);
          setFormData({
            client_name: "",
            client_contact: "",
            trip_start_date: "",
            country_of_origin: "",
            preferred_language: "",
            notes: "",
            booking_code: "",
          });
          setErrors({});
          onClose();
          handlePreview();
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setFormStatus({
        message: "An error occurred while booking. Please try again.",
        type: "error",
      });
    } finally {
      logoutUser();
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContactMethodChange = (method) => {
    setContactMethod(method);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer>
        {!itinerary && (
          <EmptyStateView message={"Please select an itinerary"} />
        )}
        {itinerary && (
          <>
            <ModalHeader>
              <HeaderContent>
                <ModalTitle>
                  Let's book your {itinerary.name} adventure!
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
                    {formStatus.message}
                  </StatusMessage>
                )}
              </HeaderContent>
              <CloseButton onClick={onClose}>×</CloseButton>
            </ModalHeader>
            <ModalContent>
              {loading && <LoadingSpinner />}
              {!loading && (
                <form onSubmit={handleBookTrip}>
                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiUser size={16} />
                        What's your name?
                      </>
                    </LabelWithIcon>
                    <Input
                      type="text"
                      name="client_name"
                      value={formData.client_name}
                      onChange={handleInputChange}
                      onInput={handleInputChange}
                      onBlur={handleInputChange}
                      placeholder="Enter your full name"
                      hasError={!!errors.client_name}
                    />
                    {errors.client_name && (
                      <ErrorMessage>{errors.client_name}</ErrorMessage>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiMail size={16} />
                        How can we reach out?
                      </>
                    </LabelWithIcon>
                    <ToggleContainer>
                      <ToggleButton
                        type="button"
                        active={contactMethod === "email"}
                        method="email"
                        onClick={() => handleContactMethodChange("email")}
                      >
                        <FiMail size={18} />
                        Email
                      </ToggleButton>

                      <ToggleButton
                        type="button"
                        active={contactMethod === "whatsapp"}
                        method="whatsapp"
                        onClick={() => handleContactMethodChange("whatsapp")}
                      >
                        <BiChat size={18} />
                        WhatsApp
                      </ToggleButton>
                    </ToggleContainer>
                  </FormGroup>

                  {/* Input Field */}
                  <FormGroup>
                    <InputWrapper>
                      <Input
                        type={contactMethod === "email" ? "email" : "tel"}
                        name="client_contact"
                        value={formData.client_contact}
                        onChange={handleInputChange}
                        onInput={handleInputChange}
                        placeholder={
                          contactMethod === "email"
                            ? "Enter your email address"
                            : "Enter your WhatsApp number"
                        }
                        hasError={!!errors.client_contact}
                      />
                    </InputWrapper>

                    {errors.client_contact && (
                      <ErrorMessage>⚠️ {errors.client_contact}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiCalendar size={16} />
                        When does your adventure begin?
                      </>
                    </LabelWithIcon>
                    <Input
                      type="date"
                      name="trip_start_date"
                      value={formData.trip_start_date}
                      onChange={handleInputChange}
                      onInput={handleInputChange}
                      hasError={!!errors.trip_start_date}
                      min={getTodayDateISO()}
                    />
                    {errors.trip_start_date && (
                      <ErrorMessage>{errors.trip_start_date}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiMap size={16} />
                        Where are you from? (optional)
                      </>
                    </LabelWithIcon>
                    <Select
                      name="country_of_origin"
                      value={formData.country_of_origin}
                      onChange={handleInputChange}
                      onInput={handleInputChange}
                      hasError={!!errors.country_of_origin}
                    >
                      <option value="">Select your country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="JP">Japan</option>
                      <option value="CN">China</option>
                      <option value="IN">India</option>
                      <option value="BR">Brazil</option>
                      <option value="MX">Mexico</option>
                      <option value="ZA">South Africa</option>
                      <option value="OTHER">Other</option>
                    </Select>
                    {errors.country_of_origin && (
                      <ErrorMessage>{errors.country_of_origin}</ErrorMessage>
                    )}
                  </FormGroup>
                  <ButtonGroup>
                    <CancelButton type="button" onClick={onClose}>
                      Cancel
                    </CancelButton>
                    <SubmitButton
                      type="submit"
                      disabled={isPersisting || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader />
                          Booking...
                        </>
                      ) : (
                        "Book"
                      )}
                    </SubmitButton>
                  </ButtonGroup>
                </form>
              )}
            </ModalContent>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BookTripModal;
