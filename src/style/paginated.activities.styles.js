import styled from "styled-components";
// Styled Components

export const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  min-height: 200px;
`;

export const ActivityChip = styled.button`
  padding: 5px 6px;
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
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 5px;
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
`;

export const PageIndicators = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
`;