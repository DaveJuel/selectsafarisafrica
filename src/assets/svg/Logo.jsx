import React from "react";
import { useIsSmallScreen } from "../../utils/UseIsSmallScreen";

function LogoComponent({ scale = 1, logo = "white" }) {
  const isSmallScreen = useIsSmallScreen();
  const baseWidth = 147; // original widt
  const logoImg = "sitting_lion.gif";

  // Reduce scale on smaller screens without altering aspect ratio
  const adjustedScale = isSmallScreen ? scale * 0.6 : scale;
  const width = baseWidth * adjustedScale;

  return (
    <img
      src={`${process.env.PUBLIC_URL}/${logoImg}`}
      alt="App Logo"
      width={width}
      style={{
        height: "auto", // preserves aspect ratio
        objectFit: "contain",
        maxWidth: "100%", // won't overflow container
      }}
    />
  );
}

export default LogoComponent;
