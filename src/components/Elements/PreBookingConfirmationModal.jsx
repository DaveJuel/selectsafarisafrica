
import { useState, useEffect, useTransition } from "react";
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
  bookingData,
  itinerary,
  bookingFee,
  currency = "USD",
  validityHours = 48,
  onPaymentSuccess,
  onBookLater
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  console.log(validityHours);
  const { t } = useTransition("booking_form");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.REACT_APP_IREMBO_INLINE_URL;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  if (!isOpen) return null;

  function makePayment(invoiceID) {
    if (!loaded || !window.IremboPay) return;
    window.IremboPay.initiate({
      publicKey: process.env.REACT_APP_IREMBO_PUBLIC_KEY,
      invoiceNumber: invoiceID,
      locale: window.IremboPay.locale.EN,
      callback: (err, resp) => {
        if (!err) { onPaymentSuccess(); }
        else { console.error("Error:", err); }
      },
    });
  }

  const createInvoice = async () => {
    try {
      const requestBody = {
        client_email: bookingData.client_contact,
        client_name: bookingData.client_name,
        amount: bookingFee,
        description: `${bookingData.booking_code} - ${itinerary.name}`,
      };
      const response = await fetch(`${process.env.REACT_APP_INTELLIGENCE_URL}/api/payments/invoice/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      if (data.success) {
        return data.invoiceNumber;
      } else {
        console.error("Invoice creation failed:", data);
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  }

  const processPayment = async () => {
    try {
      setIsProcessingPayment(true);
      const invoiceNumber = await createInvoice();
      makePayment(invoiceNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessingPayment(false);
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{t("confirm_booking")}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <InfoSection>
            <InfoText>
              {t("payment_options_review")}
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
                <strong>{t("booking_fee")}</strong>{" "}
                <span style={{ color: "#0f766e", fontWeight: 600 }}>
                  {bookingFee?.toLocaleString()} {currency}
                </span>
              </p>
              <p style={{ marginBottom: "10px" }}>
                {t("fee_description")}
              </p>
              <ul style={{ margin: 0, paddingLeft: "20px", color: "#475569", fontSize: "14px" }}>
                <li>
                  <strong>{t("pay_now")}</strong>{t("pay_now_result")}<em>{t("confirm_instantly")}</em>.
                </li>
                <li>
                  <strong>{t("pay_later")}</strong> <em>{t("pay_later_results")}</em>.
                  {t("pay_later_expiry")}
                </li>
              </ul>
            </div>

            <InfoText>
              {t("choose_process")}
            </InfoText>

            <ButtonGroup>
              <PaymentButton disabled={isProcessingPayment} $primary onClick={() => processPayment()}>
                {t("pay_now")}
              </PaymentButton>
              <PaymentButton disabled={isProcessingPayment} onClick={() => onBookLater()}>
                {t("pay_later")}
              </PaymentButton>
            </ButtonGroup>
          </InfoSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PreBookingConfirmationModal;
