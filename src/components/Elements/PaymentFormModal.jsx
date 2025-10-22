import { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  InfoSection,
  InfoText,
  ButtonGroup,
  PaymentButton
} from "../../style/confirm.booking.modal.styles";
import { FormGroup, HeaderContent, Input, LabelWithIcon, ModalContainer } from "../../style/book.trip.modal.styles";
import { FiCalendar, FiCreditCard, FiUser } from "react-icons/fi";

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

      onPaymentSuccess();
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
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderContent>
            <ModalTitle>Complete Your Payment</ModalTitle>
          </HeaderContent>
        </ModalHeader>
        <ModalContent>
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

                <FormGroup>
                  <LabelWithIcon>
                    <>
                      <FiUser size={16} />
                      Full Name
                    </>
                  </LabelWithIcon>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                </FormGroup>
                <FormGroup>
                  <LabelWithIcon>
                    <>
                      <FiCreditCard />
                      Card Number
                    </>
                  </LabelWithIcon>
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                </FormGroup>
                <div style={{ display: "flex", gap: "10px" }}>
                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiCalendar />
                        Expiry
                      </>
                    </LabelWithIcon>
                    <Input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                      style={{ ...inputStyle, flex: 1 }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiCalendar />
                        CVV
                      </>
                    </LabelWithIcon>
                    <Input
                      type="password"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      maxLength="4"
                      style={{ ...inputStyle, flex: 1 }}
                    />
                  </FormGroup>
                </div>

                <ButtonGroup>
                  <PaymentButton type="submit" $primary disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Process Payment"}
                  </PaymentButton>
                </ButtonGroup>
              </form>
            </InfoSection>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
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
