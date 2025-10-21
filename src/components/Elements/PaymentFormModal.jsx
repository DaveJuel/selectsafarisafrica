import { useState } from "react";
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

const PaymentFormModal = ({ isOpen, onClose, bookingData, itinerary, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Example: integrate your backend payment endpoint
      // const response = await fetch("/api/payment/process", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...formData, booking_code: bookingData.booking_code }),
      // });
      // const result = await response.json();

      onPaymentSuccess?.();
      alert("Payment successful!");
      onClose();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Complete Your Payment</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <InfoSection>
            <InfoText>
              Booking Code: <strong>{bookingData?.booking_code}</strong>
              <br />
              Trip: <strong>{itinerary?.name}</strong>
              <br />
              Amount: <strong>${bookingData?.amount || 50}</strong>
            </InfoText>

            <form onSubmit={handlePayment} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                maxLength="16"
                style={inputStyle}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  required
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  maxLength="4"
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>

              <ButtonGroup>
                <PaymentButton type="submit" $primary disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay Now"}
                </PaymentButton>
                <PaymentButton type="button" onClick={onClose}>
                  Cancel
                </PaymentButton>
              </ButtonGroup>
            </form>
          </InfoSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PaymentFormModal;

// Inline input style
const inputStyle = {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  fontSize: "15px",
  outline: "none",
};
