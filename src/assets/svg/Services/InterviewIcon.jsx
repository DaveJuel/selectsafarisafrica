import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle cx="32" cy="32" r="28" fill="#FF5722"/>
        <path d="M24 24h16v2H24v-2zM24 30h16v2H24v-2zM24 36h10v2H24v-2z" fill="#ffffff"/>
        <circle cx="32" cy="40" r="4" fill="#ffffff"/>
    </svg>
  );
}
export default SvgComponent;
