import { useState } from "react";
import { apiKey, makeApiRequest } from "../../utils/RequestHandler";
import { StatusMessage } from "../../style/view.styles";
import GoogleSSOButton from "../Buttons/GoogleSSOButton";
import { logger } from "../../utils/logger";
import { ActionSection, AuthPrompt, NoItinerariesContainer, PromptCard, PromptIcon, PromptMessage } from "../../style/no.itineraries.prompt.styles";

const NoItinerariesPrompt = ({ formData, isLoggedIn, setIsLoggedIn }) => {
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });

  const handleGoogleAuthSuccess = async (response) => {
    const { credential } = response;

    const handleAuth = async (authFn, successMessage = "...") => {
      try {
        logger.info(isLoggedIn);
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
        api_key: apiKey,
      });
      return response.success ? response.result : null;
    }, "Google authentication successful, redirecting...");
  };

  return (
    <NoItinerariesContainer>
      <PromptCard>
        <PromptIcon>
          <img src="/icons/embarrassed.png" alt="Oops" />
        </PromptIcon>
        <PromptMessage>
          We don't have any pre-made itineraries in {formData.country} for {formData.days} days at the moment, but our front
          desk are here to help you create the perfect personalized experience.
        </PromptMessage>

        <ActionSection>
          <AuthPrompt> 
            <GoogleSSOButton
              onSuccess={handleGoogleAuthSuccess}
              authType="login"
            />
          </AuthPrompt>
        </ActionSection>
        {formStatus.message && (
          <StatusMessage type={formStatus.type}>
            {formStatus.message}
          </StatusMessage>
        )}
      </PromptCard>
    </NoItinerariesContainer>
  );
};

export default NoItinerariesPrompt;
