import styled from "styled-components";
// Styled Components

export const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  min-height: 200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* stack activities vertically */
    gap: 8px;
    min-height: auto;
  }
`;

export const ActivityChip = styled.button`
  border: 1px solid ${(props) => (props.selected ? "#7E5B40" : "#e1e8ed")};
  background: ${(props) => (props.selected ? "#7E5B40" : "white")};
  color: ${(props) => (props.selected ? "white" : "#7E5B40")};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: #7e5b40;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(234, 177, 102, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 5px 10px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 4px 8px;
    border-radius: 16px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 5px;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin-top: 3px;
  }
`;

export const PaginationButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #e1e8ed;
  background: white;
  color: #7e5b40;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #7e5b40;
    background: #7e5b40;
    color: white;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
`;

export const PageIndicators = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const PageDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.active ? "#7E5B40" : "#e1e8ed")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #7e5b40;
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    width: 7px;
    height: 7px;
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;