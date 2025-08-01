import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleButton } from "../../style/view.styles";

// Custom button styled to match your application's design

const GoogleSSOButton = ({
  onSuccess,
  authType = "login",
  buttonText = null,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let intervalId = null;

    const initializeGoogleSignIn = () => {
      const handleCredentialResponse = (response) => {
       const responseWithType = {
          ...response,
          authType,
        };

        if (onSuccess) {
          onSuccess(responseWithType);
        }
      };
      if (window.google) {
        /* global google */
        google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          // Additional options you might want for registration
          prompt_parent_id:
            authType === "register" ? "google-auth-container" : undefined,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: true,
          context: authType === "register" ? "signup" : "signin",
          ux_mode: "popup",
        });

        setIsReady(true);
      } else {
        console.error("Google Identity Services script not loaded");
      }
    };

    if (window.google) {
      initializeGoogleSignIn();
    } else {
      intervalId = setInterval(() => {
        if (window.google) {
          initializeGoogleSignIn();
          clearInterval(intervalId);
        }
      }, 500);
    }

    // Clean up interval if component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [authType, onSuccess]);

  const handleGoogleAuth = () => {
    if (window.google && isReady) {
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If One Tap UI was skipped or not displayed
          console.log(
            "One Tap UI was skipped or not displayed",
            notification.getNotDisplayedReason() ||
              notification.getSkippedReason()
          );

          // Different handling for login vs register (optional)
          if (authType === "register") {
            // For registration, you might want to show a more detailed sign-up flow
            console.log("Triggering manual Google registration flow");
          }

          // Fallback to popup sign in as a last resort
          google.accounts.id.prompt();
        }
      });
    } else {
      console.error("Google Identity Services not loaded or initialized yet");
    }
  };

  // Determine button text based on auth type or custom text
  const getButtonText = () => {
    if (buttonText) return buttonText;
    return authType === "register"
      ? "Register with Google"
      : "Login with Google";
  };

  return (
    <div id="google-auth-container">
      <GoogleButton
        type="button"
        onClick={handleGoogleAuth}
        disabled={!isReady}
      >
        <FcGoogle size={20} />
        {getButtonText()}
      </GoogleButton>
    </div>
  );
};

export default GoogleSSOButton;
