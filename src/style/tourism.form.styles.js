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
  gap: 10px;
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  color: #ffffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    letter-spacing: 0.3px;
  }
`;

export const Select = styled.select`
  padding: 12px 16px;
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
`;