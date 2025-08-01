import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
        <rect x="12" y="8" width="40" height="48" rx="4" fill="#4CAF50"/>
        <path d="M20 16h24v4H20v-4zM20 24h24v4H20v-4zM20 32h16v4H20v-4z" fill="#ffffff"/>
        <circle cx="36" cy="36" r="4" fill="#ffffff"/>
    </svg>
  );
}

export default SvgComponent;
