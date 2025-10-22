import { useTranslation } from "react-i18next";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  SuccessContainer,
  SuccessIcon,
  SuccessMessage,
  InfoSection,
  InfoText,
  BookingCodeContainer,
  BookingCodeLabel,
  BookingCodeValue,
  BookingCodeNote,
} from "../../style/confirm.booking.modal.styles";


const ConfirmBookingModal = ({ isOpen, onClose, itinerary, bookingData }) => {
  const { t } = useTranslation("booking_form");

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{itinerary.name}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <SuccessContainer>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessMessage>{t("booking_confirmed")}</SuccessMessage>
          </SuccessContainer>

          <InfoSection>
            <InfoText>
              {t("team_will_reach_out")}
            </InfoText>

            <BookingCodeContainer>
              <BookingCodeLabel>{t("your_booking_code")}</BookingCodeLabel>
              <BookingCodeValue onClick={() => window.open(`/booking/${bookingData.booking_code}`, "_blank")}>{bookingData.booking_code}</BookingCodeValue>
              <BookingCodeNote>
                {t("code_usage")}
              </BookingCodeNote>
            </BookingCodeContainer>
          </InfoSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};


export default ConfirmBookingModal;
