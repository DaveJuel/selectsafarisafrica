import { useState } from "react";
import styled from "styled-components";
import { StatusMessage } from "../../style/view.styles";
import GoogleSSOButton from "../Buttons/GoogleSSOButton";
import { useTranslation } from "react-i18next";
import { validateGToken } from "../../utils/AuthHandler";

const UserAuthPrompt = ({ setIsLoggedIn }) => {
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("adventures");

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
            message: t("error_occurred"),
            type: "error",
          });
        }
      } catch (error) {
        setFormStatus({
          message:
            error.message || t("error_occurred"),
          type: "error",
        });
      }finally{
        setLoading(false);
      }
    };

    await handleAuth(async () => {
      const response = await validateGToken(credential);
      return response.success ? response.result : null;
    }, t("google_auth_success"));
  };

  return (
    <LoginPrompt>
      <LoginIcon>
        <img src="/icons/customer-service.png" alt="Mountain" />
      </LoginIcon>
      <LoginMessage>
        {t("sign_in_prompt")}
      </LoginMessage>
      <GoogleSSOButton onSuccess={handleGoogleAuthSuccess} loading={loading} setLoading={setLoading} authType="login" />
      {formStatus.message && (
        <StatusMessage type={formStatus.type}>
          {formStatus.message}
        </StatusMessage>
      )}
    </LoginPrompt>
  );
};

export const LoginPrompt = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
  min-height: 200px;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    padding: 1.75rem;
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1rem;
    gap: 0.75rem;
  }
`;

export const LoginIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;

  img {
    width: clamp(45px, 10vw, 60px);
    height: clamp(45px, 10vw, 60px);
    object-fit: contain;
  }

  @media (max-width: 480px) {
    font-size: 2.25rem;
    margin-bottom: 0.25rem;
  }
`;

export const LoginMessage = styled.p`
  color: rgba(228, 188, 135, 0.85);
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  line-height: 1.6;
  max-width: 400px;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    max-width: 320px;
    line-height: 1.5;
  }
`;
export default UserAuthPrompt;
