import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path d="M32 12l16 28H16L32 12z" fill="#3F51B5"/>
        <rect x="28" y="40" width="8" height="12" rx="2" fill="#3F51B5"/>
        <circle cx="32" cy="32" r="4" fill="#ffffff"/>
    </svg>
  
  );
}
export default SvgComponent;
