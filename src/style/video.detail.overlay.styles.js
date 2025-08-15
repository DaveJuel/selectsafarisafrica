import styled from 'styled-components';

// Styled Components for VideoDetailOverlay
export const SidePanelOverlay = styled.div`
  position: fixed;
  top: 50%;
  ${({ isLeftSide }) => isLeftSide ? 'left: 2rem;' : 'right: 2rem;'}
  transform: translateY(-50%);
  width: 420px;
  max-height: 85vh;
  background: linear-gradient(135deg, rgba(13, 72, 46, 0.95) 0%, rgba(13, 72, 46, 0.98) 100%);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;
  border: 1px solid rgba(228, 188, 135, 0.2);
  
  @media (max-width: 1024px) {
    ${({ isLeftSide }) => isLeftSide ? 'left: 1rem;' : 'right: 1rem;'}
    width: 380px;
  }
  
  @media (max-width: 640px) {
    position: fixed;
    top: auto;
    bottom: 2rem;
    right: 1rem;
    left: 1rem;
    width: auto;
    transform: translateY(0);
  }
`;

export const SidePanelContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const OverlayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(228, 188, 135, 0.3);
  padding: 2rem 2rem 1rem 2rem;
  margin-bottom: 0;
  flex-shrink: 0;
`;

export const HeaderTitle = styled.h3`
  color: #e4bc87;
  font-size: 1.3rem;
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
`;

export const OverlayBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  overflow-y: auto;
  
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
`;

export const LocationItem = styled.div`
  display: flex;
  flex-direction: row; /* put label and value on the same line */
  align-items: center; /* vertically align text */
  gap: 0.5rem; /* space between label and value */
`;

export const LocationLabel = styled.span`
  color: rgba(228, 188, 135, 0.8);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const LocationValue = styled.span`
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DetailLabel = styled.span`
  color: rgba(228, 188, 135, 0.8);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const DetailValue = styled.span`
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const ScrollableDetailValue = styled(DetailValue)`
  max-height: 200px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
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
`;

export const OverlayFooter = styled.div`
  border-top: 1px solid rgba(228, 188, 135, 0.3);
  padding: 1.5rem 2rem 2rem 2rem;
  flex-shrink: 0;
`;

export const ExpertButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #e4bc87 0%, #d4a574 100%);
  color: #0D482E;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(228, 188, 135, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(228, 188, 135, 0.4);
    background: linear-gradient(135deg, #d4a574 0%, #e4bc87 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
`;