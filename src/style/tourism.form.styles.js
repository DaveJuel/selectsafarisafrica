import styled from "styled-components";

// Styled Components for TouristForm
export const FormWrapper = styled.div`
  width: 100%;
  padding: 12px 21px;

  @media (max-width: 768px) {
    padding: 8px 12px;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const ActivitiesFormGroupWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormGroupHeaderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  background: #ffffff15;
  color: #ffffff;
  border: 1px solid #ffffff30;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: #ffffff25;
    border-color: #ffffff55;
  }
`;

export const FormGroupIconWrapper = styled.span`
  font-size: 14px;
  display: flex;
`;


export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  color: #ffffffff;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    letter-spacing: 0.3px;
  }
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;

  /* 4 per row */
  & > button {
    flex: 1 0 calc(25% - 12px);
  }

  @media (max-width: 1024px) {
    /* 3 per row */
    & > button {
      flex: 1 0 calc(33.33% - 12px);
    }
  }

  @media (max-width: 768px) {
    /* 2 per row */
    & > button {
      flex: 1 0 calc(50% - 12px);
    }
  }

  @media (max-width: 480px) {
    /* still 2 per row instead of 1 */
    & > button {
      flex: 1 0 calc(50% - 12px);
    }
  }

  @media (max-width: 360px) {
    /* 1 per row for very small phones */
    & > button {
      flex: 1 0 100%;
    }
  }
`;


export const CountryButton = styled.button`
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid ${({ $selected }) => ($selected ? "#7e5b40" : "#e1e8ed")};
  background: ${({ $selected }) => ($selected ? "#7e5b40" : "#ffffff")};
  color: ${({ $selected }) => ($selected ? "#ffffff" : "#333")};
  transition: all 0.25s ease;
  width: 100%; /* ensures correct flex-basis scaling */

  &:hover {
    border-color: #7e5b40;
    box-shadow: 0 2px 8px rgba(126, 91, 64, 0.18);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 9px 10px;
    border-radius: 10px;
  }
`;


export const Select = styled.select`
  padding: 6px 6px;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #7e5b40;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 8px; /* slightly tighter corners */
  }
`;

export const DaysContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const DaysInput = styled.input`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e1e8ed;
  outline: none;

  /* WebKit browsers (Chrome, Safari, Edge) */
  &::-webkit-slider-track {
    height: 6px;
    border-radius: 3px;
    background: #7e5b40;
  }

  /* Firefox */
  &::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: #7e5b40;
    border: none;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #7e5b40;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #7e5b40;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  /* Responsiveness */
  @media (max-width: 768px) {
    &::-webkit-slider-thumb {
      width: 16px;
      height: 16px;
    }
    &::-moz-range-thumb {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    &::-webkit-slider-thumb {
      width: 14px;
      height: 14px;
    }
    &::-moz-range-thumb {
      width: 14px;
      height: 14px;
    }
  }
`;

export const DaysDisplay = styled.div`
  background: #7e5b40;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  min-width: 80px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 14px;
    min-width: 70px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 13px;
    min-width: 60px;
    border-radius: 16px;
  }
`;

export const SubmitButton = styled.button`
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.valid ? "pointer" : "not-allowed")};
  background: ${(props) =>
    props.valid ? "linear-gradient(135deg, #10A969 0%, #0E5033 100%)" : "#ccc"};
  color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: ${(props) => (props.valid ? "translateY(-2px)" : "none")};
    box-shadow: ${(props) =>
      props.valid ? "0 8px 25px rgba(234, 177, 102, 0.3)" : "none"};
  }

  /* Medium screens */
  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 15px;
  }

  /* Small screens */
  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;
