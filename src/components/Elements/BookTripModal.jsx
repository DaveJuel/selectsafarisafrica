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
import { useTranslation } from "react-i18next";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");
  const [formData, setFormData] = useState({
    client_name: "",
    client_contact: "",
    trip_start_date: "",
    country_of_origin: "",
    preferred_language: "",
    notes: "",
    booking_code: "",
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
      newErrors.client_name = "name_required";
    }

    if (!formData.client_contact.trim()) {
      newErrors.client_contact =
        contactMethod === "email"
          ? "email_required"
          : "whatsapp_required";
    } else if (contactMethod === "email") {
      if (!/\S+@\S+\.\S+/.test(formData.client_contact)) {
        newErrors.client_contact = "enter_valid_email";
      }
    } else if (contactMethod === "whatsapp") {
      if (!/^\+?[0-9]{7,15}$/.test(formData.client_contact)) {
        newErrors.client_contact =
          "enter_valid_whatsapp";
      }
    }

    if (!formData.trip_start_date) {
      newErrors.trip_start_date = "start_date_required";
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
      invoice_link: `${appUrl}/invoice/${booking.booking_code}`,
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
        const requestData = {
          ...formData,
          status: defaultBookingStatus.id,
          itinerary: itinerary.id,
          booking_code: generateBookingCode(formData),
        };

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
          await notifyCustomerSuccess(requestData);
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
          refreshTranslatedData("bookings", language);
          onClose();
          handlePreview();
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setFormStatus({
        message: "booking_error",
        type: "error",
      });
    } finally {
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
                    <form onSubmit={handleBookTrip}>
                      <FormGroup>
                        <LabelWithIcon>
                          <>
                            <FiUser size={16} />
                            {t("your_name")}
                          </>
                        </LabelWithIcon>
                        <Input
                          type="text"
                          name="client_name"
                          value={formData.client_name}
                          onChange={handleInputChange}
                          onInput={handleInputChange}
                          onBlur={handleInputChange}
                          placeholder={t("enter_fullname")}
                          hasError={!!errors.client_name}
                        />
                        {errors.client_name && (
                          <ErrorMessage>{t(errors.client_name)}</ErrorMessage>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <LabelWithIcon>
                          <>
                            <FiMail size={16} />
                            {t("reach_out_method")}
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
                            {t("email")}
                          </ToggleButton>

                          <ToggleButton
                            type="button"
                            active={contactMethod === "whatsapp"}
                            method="whatsapp"
                            onClick={() => handleContactMethodChange("whatsapp")}
                          >
                            <BiChat size={18} />
                            {t("whatsapp")}
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
                                ? t("enter_email")
                                : t("enter_whatsapp")
                            }
                            hasError={!!errors.client_contact}
                          />
                        </InputWrapper>

                        {errors.client_contact && (
                          <ErrorMessage>⚠️ {t(errors.client_contact)}</ErrorMessage>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <LabelWithIcon>
                          <>
                            <FiCalendar size={16} />
                            {t("start_time")}
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
                          <ErrorMessage>{t(errors.trip_start_date)}</ErrorMessage>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <LabelWithIcon>
                          <>
                            <FiMap size={16} />
                            {t("origin")}
                          </>
                        </LabelWithIcon>
                        <Select
                          name="country_of_origin"
                          value={formData.country_of_origin}
                          onChange={handleInputChange}
                          onInput={handleInputChange}
                          hasError={!!errors.country_of_origin}
                        >
                          <option value="">{t("select_country")}</option>
                          <option value="US">{t("country_us")}</option>
                          <option value="UK">{t("country_uk")}</option>
                          <option value="CA">{t("country_ca")}</option>
                          <option value="AU">{t("country_au")}</option>
                          <option value="DE">{t("country_de")}</option>
                          <option value="FR">{t("country_fr")}</option>
                          <option value="IT">{t("country_it")}</option>
                          <option value="ES">{t("country_es")}</option>
                          <option value="JP">{t("country_jp")}</option>
                          <option value="CN">{t("country_cn")}</option>
                          <option value="IN">{t("country_in")}</option>
                          <option value="BR">{t("country_br")}</option>
                          <option value="MX">{t("country_mx")}</option>
                          <option value="ZA">{t("country_za")}</option>
                          <option value="OTHER">{t("country_other")}</option>
                        </Select>
                        {errors.country_of_origin && (
                          <ErrorMessage>{t(errors.country_of_origin)}</ErrorMessage>
                        )}
                      </FormGroup>
                      <ButtonGroup>
                        <CancelButton type="button" onClick={onClose}>
                          {t("cancel_button")}
                        </CancelButton>
                        <SubmitButton
                          type="submit"
                          disabled={isPersisting || isSubmitting || !itinerary.id}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader />
                              {`${t("booking")}...`}
                            </>
                          ) : (
                            t("book_button")
                          )}
                        </SubmitButton>
                      </ButtonGroup>
                    </form>
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
