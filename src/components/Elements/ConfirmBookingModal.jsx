import styled from "styled-components";

const ConfirmBookingModal = ({ isOpen, onClose, itinerary, bookingData }) => {
  console.log("=====================");
  console.log(bookingData);
  
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
            <SuccessMessage>Booking confirmed successfully!</SuccessMessage>
          </SuccessContainer>
          
          <InfoSection>
            <InfoText>
              Our team will reach out to you shortly. Please save your booking reference for future correspondence.
            </InfoText>
            
            <BookingCodeContainer>
              <BookingCodeLabel>Your Booking Code</BookingCodeLabel>
              <BookingCodeValue>{bookingData.booking_code}</BookingCodeValue>
              <BookingCodeNote>Use this code for any follow-up inquiries</BookingCodeNote>
            </BookingCodeContainer>
          </InfoSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from { 
      transform: translateY(20px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 28px 20px 28px;
  border-bottom: 1px solid #f1f5f9;
`;

const ModalTitle = styled.h2`
  color: #1e293b;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.025em;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #94a3b8;
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8fafc;
    color: #475569;
    transform: scale(1.05);
  }
`;

const ModalBody = styled.div`
  padding: 28px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f8f9fa;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #10a969 0%, #0e5033 100%);
    border-radius: 3px;
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  animation: bounce 0.6s ease-in-out;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }
`;

const SuccessMessage = styled.h3`
  color: #1e293b;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.025em;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoText = styled.p`
  color: #64748b;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  text-align: center;
`;

const BookingCodeContainer = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10a969 0%, #059669 50%, #10a969 100%);
  }
`;

const BookingCodeLabel = styled.div`
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const BookingCodeValue = styled.div`
  color: #1e293b;
  font-size: 28px;
  font-weight: 800;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #10a969 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BookingCodeNote = styled.div`
  color: #64748b;
  font-size: 13px;
  font-style: italic;
`;

export default ConfirmBookingModal;