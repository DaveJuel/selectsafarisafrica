import styled , { keyframes } from 'styled-components';

// Styled Components for VideoDetailOverlay
export const SidePanelOverlay = styled.div`
  position: fixed;
  top: 50%;
  ${({ isLeftSide }) => (isLeftSide ? "left: 2rem;" : "right: 2rem;")}
  transform: translateY(-50%);
  width: 420px;
  max-height: 85vh;
  background: linear-gradient(
    135deg,
    rgba(13, 72, 46, 0.95) 0%,
    rgba(13, 72, 46, 0.98) 100%
  );
  backdrop-filter: blur(15px);
  border-radius: 16px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;
  border: 1px solid rgba(228, 188, 135, 0.2);
  overflow: hidden; /* ensure contents don't overflow visually */

  /* Medium screens */
  @media (max-width: 1024px) {
    ${({ isLeftSide }) => (isLeftSide ? "left: 1rem;" : "right: 1rem;")}
    width: 380px;
    max-height: 90vh;
  }

  /* Tablets & below */
  @media (max-width: 768px) {
    top: 1.5rem;
    bottom: 1.5rem;
    left: 1rem;
    right: 1rem;
    width: auto;
    height: auto;
    max-height: calc(100vh - 3rem);
    transform: none;
    border-radius: 14px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  }

  /* Phones */
  @media (max-width: 480px) {
    top: 0.75rem;
    bottom: 0.75rem;
    left: 0.5rem;
    right: 0.5rem;
    width: auto;
    max-height: calc(100vh - 1.5rem);
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

export const SidePanelContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: inherit; /* keeps corners consistent */
`;

export const OverlayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(228, 188, 135, 0.3);
  padding: 1.75rem 2rem 1rem 2rem;
  flex-shrink: 0;
  background: rgba(13, 72, 46, 0.97); /* prevent transparency flicker */
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem 0.75rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem 0.5rem 1rem;
  }
`;

export const HeaderTitle = styled.h3`
  color: #e4bc87;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: 600;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  line-height: 1.3;
  flex: 1;
  padding-right: 1rem;
`;

export const CloseButton = styled.button`
  background: rgba(228, 188, 135, 0.1);
  border: 1px solid rgba(228, 188, 135, 0.3);
  border-radius: 8px;
  padding: 0.5rem;
  color: #e4bc87;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background: rgba(228, 188, 135, 0.2);
    border-color: rgba(228, 188, 135, 0.5);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    border-radius: 6px;
  }
`;

export const OverlayBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  overflow-y: auto;
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(228, 188, 135, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(228, 188, 135, 0.4);
    border-radius: 3px;

    &:hover {
      background: rgba(228, 188, 135, 0.6);
    }
  }

  @media (max-width: 1024px) {
    padding: 1.25rem 1.5rem;
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1rem;
    gap: 0.75rem;
  }
`;

export const LocationItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap; /* allows wrapping on smaller screens */
  gap: 0.5rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 0.35rem;
  }
`;

export const LocationLabel = styled.span`
  color: rgba(228, 188, 135, 0.8);
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  white-space: nowrap; /* keeps label intact */
`;

export const LocationValue = styled.span`
  color: #ffffff;
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  font-weight: 400;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  word-break: break-word; /* ensures long city names wrap */
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    gap: 0.35rem;
  }
`;

export const DetailLabel = styled.span`
  color: rgba(228, 188, 135, 0.8);
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const DetailValue = styled.span`
  color: #ffffff;
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  font-weight: 400;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const ScrollableDetailValue = styled(DetailValue)`
  max-height: 200px;
  overflow-y: auto;
  padding-right: 0.5rem;
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(228, 188, 135, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(228, 188, 135, 0.3);
    border-radius: 2px;

    &:hover {
      background: rgba(228, 188, 135, 0.5);
    }
  }

  @media (max-width: 768px) {
    max-height: 160px;
  }

  @media (max-width: 480px) {
    max-height: 140px;
    padding-right: 0.25rem;
  }
`;

export const OverlayFooter = styled.div`
  border-top: 1px solid rgba(228, 188, 135, 0.3);
  padding: 1.5rem 2rem 2rem 2rem;
  flex-shrink: 0;
  background-color: rgba(13, 72, 46, 0.03); /* subtle background for contrast */

  @media (max-width: 1024px) {
    padding: 1.25rem 1.75rem 1.75rem 1.75rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.25rem 1.5rem 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1rem 1.25rem 1rem;
    border-top: 1px solid rgba(228, 188, 135, 0.2);
  }
`;

export const ExpertButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #e4bc87 0%, #d4a574 100%);
  color: #0d482e;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(228, 188, 135, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(228, 188, 135, 0.35);
    background: linear-gradient(135deg, #d4a574 0%, #e4bc87 100%);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    padding: 0.9rem 1.25rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0.85rem 1rem;
    font-size: 0.875rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.85rem;
    letter-spacing: 0.4px;
    box-shadow: 0 2px 10px rgba(228, 188, 135, 0.25);
  }

  @media (hover: none) {
    /* smoother on touch devices */
    &:hover {
      transform: none;
      box-shadow: 0 4px 20px rgba(228, 188, 135, 0.25);
    }
  }
`;

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled spinner component
export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(228, 188, 135, 0.3);
  border-top: 2px solid #e4bc87;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Container to maintain consistent sizing
export const ButtonContainer = styled.div`
  background: rgba(228, 188, 135, 0.1);
  border: 1px solid rgba(228, 188, 135, 0.3);
  border-radius: 8px;
  padding: 0.5rem;
  color: #e4bc87;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 40px;
  min-height: 40px;
`;