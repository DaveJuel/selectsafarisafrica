// import { useNavigate } from "react-router-dom";
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
  ButtonGroup,
  PaymentButton
} from "../../style/confirm.booking.modal.styles";


const ConfirmBookingModal = ({ isOpen, onClose, itinerary, bookingData }) => {
  // const navigate = useNavigate();
  const { t } = useTranslation("booking_form");

  const handlePayNow = async (bookingData) => {
    const res = await fetch("/api/payment/initiate/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_code: bookingData.booking_code }),
    });
    const data = await res.json();
    if (data.payment_url) window.location.href = data.payment_url;
  };

  const handlePayLater = async (bookingData) => {
    await fetch("/api/payment/mark-later/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_code: bookingData.booking_code }),
    });
    alert("Payment link will be sent to your email.");
  };


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

            <ButtonGroup>
              <PaymentButton onClick={() => handlePayNow(bookingData)} $primary>
                {/* {t("pay_now")} */}
                Pay Now
              </PaymentButton>
              <PaymentButton onClick={() => handlePayLater(bookingData)}>
                {/* {t("pay_later")} */}
                Pay Later
              </PaymentButton>
            </ButtonGroup>
          </InfoSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};


export default ConfirmBookingModal;
