import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";


// Usage Example Component
const ContactUsForm = ({ onSubmit, formData, handleInputChange }) => {
  const { t } = useTranslation("contact_us");

  return (
    <FormSection>
      <ContactForm onSubmit={onSubmit}>
        <InputGroup>
          <InputLabel htmlFor="name">{t("full_name")}</InputLabel>
          <Input
            id="name"
            name="name"
            placeholder={t("enter_full_name")}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="email">{t("email_address")}</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("enter_email_address")}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="message">{t("message")}</InputLabel>
          <TextArea
            id="message"
            name="message"
            placeholder={t("message_placeholder")}
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            required
          />
        </InputGroup>

        <SubmitButton type="submit">{t("send_message")}</SubmitButton>
      </ContactForm>
    </FormSection>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

// Styled Components
const FormSection = styled.div`
  width: 100%;
  padding: 40px 30px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(14, 80, 51, 0.08),
    0 8px 16px rgba(14, 80, 51, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(14, 80, 51, 0.1);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #0e5033, #16a085, #27ae60, #0e5033);
    background-size: 200% 100%;
    animation: ${shimmer} 3s linear infinite;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 8px;
  transition: color 0.2s ease;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

const Input = styled.input`
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:focus {
    outline: none;
    border-color: #0e5033;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 4px rgba(14, 80, 51, 0.1);
    transform: translateY(-2px);
  }

  &:hover:not(:focus) {
    border-color: #d1d5db;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #9ca3af;
    transition: opacity 0.2s ease;
  }

  &:focus::placeholder {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 14px;
    border-radius: 12px;
  }
`;

const TextArea = styled.textarea`
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 16px;
  resize: vertical;
  min-height: 120px;
  background: rgba(255, 255, 255, 0.8);
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: #0e5033;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 4px rgba(14, 80, 51, 0.1);
    transform: translateY(-2px);
  }

  &:hover:not(:focus) {
    border-color: #d1d5db;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #9ca3af;
    transition: opacity 0.2s ease;
  }

  &:focus::placeholder {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 15px;
    min-height: 100px;
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 14px;
    border-radius: 12px;
    min-height: 90px;
  }
`;

const SubmitButton = styled.button`
  padding: 18px 32px;
  background: linear-gradient(135deg, #0e5033 0%, #16a085 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 16px rgba(14, 80, 51, 0.2);
  margin-top: 8px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(14, 80, 51, 0.3);
    animation: ${pulse} 2s infinite;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(14, 80, 51, 0.25);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }

  @media (max-width: 768px) {
    padding: 16px 28px;
    font-size: 15px;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 14px 22px;
    font-size: 14px;
    border-radius: 12px;
    width: 100%; // full width on small screens
  }
`;

export default ContactUsForm;
