import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
        <rect x="12" y="20" width="40" height="24" rx="4" fill="#9C27B0"/>
        <path d="M20 24h8v4h-8v-4zM36 24h8v4h-8v-4zM20 32h24v4H20v-4z" fill="#ffffff"/>
    </svg>

  );
}
export default SvgComponent;