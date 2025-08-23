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
`;

export const ModalContent = styled.div`
  padding: 24px;
  max-height: calc(90vh - 100px);
  overflow-y: auto;
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
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
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
`;

export const ToggleContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 4px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e8eaed;
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
`;

export const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
  display: block;
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
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
`;