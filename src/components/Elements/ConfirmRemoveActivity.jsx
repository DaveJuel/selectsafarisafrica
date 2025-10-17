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
import { useTranslation } from "react-i18next";

const ConfirmRemoveActivity = ({
  isOpen,
  onClose,
  itinerary,
  itineraryActivities,
  allActivities,
  tripData,
}) => {
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [defaultBookingStatus, setDefaultBookingStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const { t } = useTranslation("booking_form");

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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };



  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer>
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
              
                  <ButtonGroup>
                    <CancelButton type="button" onClick={onClose}>
                      {t("cancel_button")}
                    </CancelButton>
                    <SubmitButton
                      type="submit"
                      disabled={isPersisting || isSubmitting}
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
              )}
            </ModalContent>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ConfirmRemoveActivity;
