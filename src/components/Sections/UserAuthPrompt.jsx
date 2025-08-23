import { useState } from "react";
import styled from "styled-components";
import { apiKey, makeApiRequest } from "../../utils/RequestHandler";
import { StatusMessage } from "../../style/view.styles";
import GoogleSSOButton from "../Buttons/GoogleSSOButton";

const UserAuthPrompt = ({ setIsLoggedIn }) => {
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });

  const handleGoogleAuthSuccess = async (response) => {
    const { credential } = response;

    const handleAuth = async (authFn, successMessage = "...") => {
      try {
        const result = await authFn();
        if (result) {
          localStorage.setItem("user", JSON.stringify(result));
          setIsLoggedIn(true);
        } else {
          setFormStatus({
            message: "An unexpected error occurred. Please try again.",
            type: "error",
          });
        }
      } catch (error) {
        setFormStatus({
          message:
            error.message || "Something went wrong. Please contact support.",
          type: "error",
        });
      }
    };

    await handleAuth(async () => {
      const response = await makeApiRequest("/google/sso/login/", "POST", {
        token: credential,
        api_key: apiKey
      });
      return response.success ? response.result : null;
    }, "Google authentication successful, redirecting...");
  };

  return (
    <LoginPrompt>
      <LoginIcon>
        <img src="/icons/customer-service.png" alt="Mountain" />
      </LoginIcon>
      <LoginMessage>
        Sign in with your Gmail to get personalized travel tips from our tourism
        experts.
      </LoginMessage>
      <GoogleSSOButton onSuccess={handleGoogleAuthSuccess} authType="login" />
      {formStatus.message && (
        <StatusMessage type={formStatus.type}>
          {formStatus.message}
        </StatusMessage>
      )}
    </LoginPrompt>
  );
};

// Styled Components
const LoginPrompt = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
`;

const LoginIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  img {
    width: 60px;
    height: 60px;
  }
`;

const LoginMessage = styled.p`
  color: rgba(228, 188, 135, 0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 400px;
  margin: 0;
`;
export default UserAuthPrompt;
