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
