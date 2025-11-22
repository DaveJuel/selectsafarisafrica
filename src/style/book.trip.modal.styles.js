import styled from "styled-components";

// Styled Components
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e8eaed;
  gap: 16px;
`;

export const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #0e5033;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 18px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    gap: 4px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  align-self: flex-start;

  &:hover {
    background: #f0f2f5;
    color: #333;
  }

  @media (max-width: 768px) {
    font-size: 22px;
    padding: 3px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    padding: 2px;
  }
`;


export const ModalContent = styled.div`
  padding: 24px;
  max-height: calc(90vh - 100px);
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;

  ${(props) =>
    props.type === "success" &&
    `
    background: #f0f9f0;
    color: #2d5a2d;
    border: 1px solid #c8e6c8;
  `}

  ${(props) =>
    props.type === "error" &&
    `
    background: #fdf2f2;
    color: #c53030;
    border: 1px solid #fed7d7;
  `}
  
  ${(props) =>
    props.type === "info" &&
    `
    background: #f0f8ff;
    color: #2b5aa0;
    border: 1px solid #bee3f8;
  `}
  
  ${(props) =>
    props.type === "warning" &&
    `
    background: #fffbf0;
    color: #975a16;
    border: 1px solid #fbd38d;
  `}

  @media (max-width: 768px) {
    padding: 8px 12px;
    gap: 6px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    gap: 4px;
    font-size: 11px;
  }
`;

export const StatusIcon = styled.span`
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;

  ${(props) =>
    props.type === "success" &&
    `
    color: #38a169;
  `}

  ${(props) =>
    props.type === "error" &&
    `
    color: #e53e3e;
  `}
  
  ${(props) =>
    props.type === "info" &&
    `
    color: #3182ce;
  `}
  
  ${(props) =>
    props.type === "warning" &&
    `
    color: #d69e2e;
  `}

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => (props.hasError ? "#e74c3c" : "#e8eaed")};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#e74c3c" : "#10A969")};
    box-shadow: 0 0 0 3px
      ${(props) =>
    props.hasError ? "rgba(231, 76, 60, 0.1)" : "rgba(102, 126, 234, 0.1)"};
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 4px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e8eaed;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const ToggleButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.active
      ? props.method === "email"
        ? "#10A969"
        : "#25D366"
      : "transparent"};
  color: ${(props) => (props.active ? "white" : "#666")};
  transform: ${(props) => (props.active ? "translateY(-1px)" : "none")};
  box-shadow: ${(props) =>
    props.active
      ? props.method === "email"
        ? "0 4px 12px rgba(16, 169, 105, 0.3)"
        : "0 4px 12px rgba(37, 211, 102, 0.3)"
      : "none"};

  &:hover {
    background-color: ${(props) =>
    !props.active ? "#f0f0f0" : props.backgroundColor};
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const LabelWithIcon = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;

  @media (max-width: 768px) {
    gap: 6px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    font-size: 12px;
  }
`;


export const LabelWithCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  a {
    color: #3366ff;
    text-decoration: underline;

    &:hover {
      color: #1a44cc;
    }
  }

  span {
    display: inline;
  }

  @media (max-width: 768px) {
    gap: 6px;
    font-size: 13px;

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    gap: 4px;
    font-size: 12px;

    input[type="checkbox"] {
      width: 14px;
      height: 14px;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => (props.hasError ? "#e74c3c" : "#e8eaed")};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#e74c3c" : "#10A969")};
    box-shadow: 0 0 0 3px
      ${(props) =>
    props.hasError ? "rgba(231, 76, 60, 0.1)" : "rgba(102, 126, 234, 0.1)"};
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

// Message Base Style
const MessageBase = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  padding: 0.65rem 1rem;
  margin-top: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  text-align: center;
  max-width: 100%;
  letter-spacing: 0.4px;
  backdrop-filter: blur(6px);
`;

// Error Message
export const ErrorMessage = styled(MessageBase)`
  color: #fff;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  box-shadow: 0 4px 16px rgba(231, 76, 60, 0.3);
  border: 1px solid rgba(231, 76, 60, 0.4);

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
`;

// Success Message
export const SuccessMessage = styled(MessageBase)`
  color: #fff;
  background: linear-gradient(135deg, #16a085 0%, #0e5033 100%);
  box-shadow: 0 4px 16px rgba(14, 80, 51, 0.3);
  border: 1px solid rgba(22, 160, 133, 0.4);

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: 2px solid #e8eaed;
  background: white;
  color: #666;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f2f5;
    border-color: #dadce0;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  background: linear-gradient(135deg, #10a969 0%, #0e5033 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(102, 234, 139, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(102, 234, 131, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    background: linear-gradient(135deg, #10a969 0%, #0e5033 100%);
    box-shadow: 0 2px 6px rgba(102, 126, 234, 0.2);
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
    gap: 4px;
  }
`;

export const Loader = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
    border-width: 1.5px;
  }

  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
    border-width: 1.2px;
  }
`;
