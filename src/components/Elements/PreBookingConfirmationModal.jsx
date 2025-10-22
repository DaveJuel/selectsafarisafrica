
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  InfoSection,
  InfoText,
  ButtonGroup,
  PaymentButton
} from "../../style/confirm.booking.modal.styles";

const PreBookingConfirmationModal = ({
  isOpen,
  onClose,
  itinerary,
  bookingFee,
  currency = "USD",
  validityHours = 48,
  onBookNow,
  onBookLater
}) => {

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Confirm Your Booking</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <InfoSection>
            <InfoText>
             Before finalizing your booking for {itinerary?.name || "this trip"}, please review the payment options below.
            </InfoText>

            <div
              style={{
                background: "#f8fafc",
                borderLeft: "4px solid #10b981",
                borderRight: "4px solid #10b981",
                borderRadius: "8px",
                padding: "16px 20px",
                color: "#334155",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              <p>
                <strong>Booking Fee:</strong>{" "}
                <span style={{ color: "#0f766e", fontWeight: 600 }}>
                  {bookingFee?.toLocaleString()} {currency}
                </span>
              </p>
              <p style={{ marginBottom: "10px" }}>
                This fee secures your reservation and ensures your itinerary is held under your
                name.
              </p>
              <ul style={{ margin: 0, paddingLeft: "20px", color: "#475569", fontSize: "14px" }}>
                <li>
                  <strong>Pay Now:</strong> Proceed to pay the booking fee immediately and get your
                  reservation <em>confirmed instantly</em>.
                </li>
                <li>
                  <strong>Pay Later:</strong> Your booking will remain <em>reserved for {validityHours} hours</em>.
                  If payment is not completed within that period, it will expire.
                </li>
              </ul>
            </div>

            <InfoText>
                Choose how you would like to proceed with your booking.
            </InfoText>

            <ButtonGroup>
              <PaymentButton $primary onClick={() => onBookNow()}>
                Pay Now
              </PaymentButton>
              <PaymentButton onClick={() => onBookLater()}>
                Pay Later
              </PaymentButton>
            </ButtonGroup>
          </InfoSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PreBookingConfirmationModal;
