import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  fetchEntityData,
  publicPass,
  publicUser,
  saveEntityData,
} from "../../utils/RequestHandler";
import LoadingSpinner from "./LoadingSpinner";
import { loginUser, logoutUser } from "../../utils/AuthHandler";
import EmptyStateView from "./EmptyStateView";
import { getTodayDateISO } from "../../utils/DataHandler";
import { FiCalendar, FiMail, FiMap, FiUser } from "react-icons/fi";
import { BiChat } from "react-icons/bi";

const BookTripModal = ({
  isOpen,
  onClose,
  itinerary,
  handlePreview,
  setBookingData,
}) => {
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [defaultBookingStatus, setDefaultBookingStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");

  useEffect(() => {
    const setBookingStatus = async () => {
      try {
        const response = await fetchEntityData("booking_statuses");
        if (response.success) {
          const defaultStatus = response.result?.find(
            (item) => item.status.toLowerCase() === "pending"
          );
          setDefaultBookingStatus(defaultStatus);
        }
      } catch (error) {
        console.error(`Failed to set default booking status`);
      } finally {
        setLoading(false);
      }
    };
    setFormStatus({ message: "", type: "" });

    setBookingStatus();
  }, []);

  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    trip_start_date: "",
    country_of_origin: "",
    preferred_language: "",
    notes: "",
    booking_code: "",
  });

  const [errors, setErrors] = useState({});

  function generateBookingCode(formData) {
    const namePart = formData.client_name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    const datePart = formData.trip_start_date?.replaceAll("-", "");

    const countryPart = formData.country_of_origin?.slice(0, 3).toUpperCase();

    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return `${namePart}-${datePart}-${countryPart}${randomPart}`;
  }

  const handleInputChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.client_name?.trim())
      newErrors.client_name = "Name is required";
    if (!formData.client_email.trim()) {
      newErrors.client_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.client_email)) {
      newErrors.client_email = "Please enter a valid email";
    }
    if (!formData.trip_start_date)
      newErrors.trip_start_date = "Start date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookTrip = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        setIsSubmitting(true);
        await loginUser(publicUser, publicPass);
        const requestBody = {
          ...formData,
          status: defaultBookingStatus.id,
          itinerary: itinerary.id,
          booking_code: generateBookingCode(formData),
        };
        const response = await saveEntityData("bookings", requestBody);
        if (response.success) {
          setBookingData(requestBody);
          setFormData({
            client_name: "",
            client_email: "",
            trip_start_date: "",
            country_of_origin: "",
            preferred_language: "",
            notes: "",
            booking_code: "",
          });
          setErrors({});
          onClose();
          handlePreview();
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setFormStatus({
        message: "An error occurred while booking. Please try again.",
        type: "error",
      });
    } finally {
      logoutUser();
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContactMethodChange = (method) => {
    setContactMethod(method);
    // Clear any existing errors when switching methods
    setErrors({});
    // Reset the input value
    setFormData({ client_email: "" });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer>
        {!itinerary && (
          <EmptyStateView message={"Please select an itinerary"} />
        )}
        {itinerary && (
          <>
            <ModalHeader>
              <HeaderContent>
                <ModalTitle>
                  Let's book your {itinerary.name} adventure!
                </ModalTitle>
                {formStatus.message && (
                  <StatusMessage type={formStatus.type}>
                    <StatusIcon type={formStatus.type}>
                      {formStatus.type === "success"
                        ? "✓"
                        : formStatus.type === "error"
                        ? "⚠"
                        : "ℹ"}
                    </StatusIcon>
                    {formStatus.message}
                  </StatusMessage>
                )}
              </HeaderContent>
              <CloseButton onClick={onClose}>×</CloseButton>
            </ModalHeader>
            <ModalContent>
              {loading && <LoadingSpinner />}
              {!loading && (
                <form onSubmit={handleBookTrip}>
                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiUser size={16} />
                        What's your name?
                      </>
                    </LabelWithIcon>
                    <Input
                      type="text"
                      name="client_name"
                      value={formData.client_name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      hasError={!!errors.client_name}
                    />
                    {errors.client_name && (
                      <ErrorMessage>{errors.client_name}</ErrorMessage>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiMail size={16} />
                        How can we reach out?
                      </>
                    </LabelWithIcon>
                    <ToggleContainer>
                      <ToggleButton
                        type="button"
                        active={contactMethod === "email"}
                        method="email"
                        onClick={() => handleContactMethodChange("email")}
                      >
                        <FiMail size={18} />
                        Email
                      </ToggleButton>

                      <ToggleButton
                        type="button"
                        active={contactMethod === "whatsapp"}
                        method="whatsapp"
                        onClick={() => handleContactMethodChange("whatsapp")}
                      >
                        <BiChat size={18} />
                        WhatsApp
                      </ToggleButton>
                    </ToggleContainer>
                  </FormGroup>

                  {/* Input Field */}
                  <FormGroup>
                    <InputWrapper>
                      <Input
                        type={contactMethod === "email" ? "email" : "tel"}
                        name="client_email"
                        value={formData.client_email}
                        onChange={handleInputChange}
                        placeholder={
                          contactMethod === "email"
                            ? "Enter your email address"
                            : "Enter your WhatsApp number"
                        }
                        hasError={!!errors.client_email}
                      />
                    </InputWrapper>

                    {errors.client_email && (
                      <ErrorMessage>⚠️ {errors.client_email}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiCalendar size={16} />
                        When does your adventure begin?
                      </>
                    </LabelWithIcon>
                    <Input
                      type="date"
                      name="trip_start_date"
                      value={formData.trip_start_date}
                      onChange={handleInputChange}
                      hasError={!!errors.trip_start_date}
                      min={getTodayDateISO()}
                    />
                    {errors.trip_start_date && (
                      <ErrorMessage>{errors.trip_start_date}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <LabelWithIcon>
                      <>
                        <FiMap size={16} />
                        Where are you from? (optional)
                      </>
                    </LabelWithIcon>
                    <Select
                      name="country_of_origin"
                      value={formData.country_of_origin}
                      onChange={handleInputChange}
                      hasError={!!errors.country_of_origin}
                    >
                      <option value="">Select your country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="JP">Japan</option>
                      <option value="CN">China</option>
                      <option value="IN">India</option>
                      <option value="BR">Brazil</option>
                      <option value="MX">Mexico</option>
                      <option value="ZA">South Africa</option>
                      <option value="OTHER">Other</option>
                    </Select>
                    {errors.country_of_origin && (
                      <ErrorMessage>{errors.country_of_origin}</ErrorMessage>
                    )}
                  </FormGroup>
                  <ButtonGroup>
                    <CancelButton type="button" onClick={onClose}>
                      Cancel
                    </CancelButton>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader />
                          Booking...
                        </>
                      ) : (
                        "Book"
                      )}
                    </SubmitButton>
                  </ButtonGroup>
                </form>
              )}
            </ModalContent>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
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

const ModalContainer = styled.div`
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

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e8eaed;
  gap: 16px;
`;

const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #0e5033;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.3;
`;

const CloseButton = styled.button`
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

const ModalContent = styled.div`
  padding: 24px;
  max-height: calc(90vh - 100px);
  overflow-y: auto;
`;

const StatusMessage = styled.div`
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

const StatusIcon = styled.span`
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

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
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

const ToggleContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 4px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e8eaed;
`;

const ToggleButton = styled.button`
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

const InputWrapper = styled.div`
  position: relative;
`;

const LabelWithIcon = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const Select = styled.select`
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

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
  display: block;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const CancelButton = styled.button`
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

const SubmitButton = styled.button`
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

const Loader = styled.div`
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

export default BookTripModal;
