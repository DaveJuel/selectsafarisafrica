import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle cx="32" cy="24" r="8" fill="#FFC107"/>
        <path d="M20 40c0-4 6-6 12-6s12 2 12 6v4H20v-4z" fill="#FFC107"/>
    </svg>
  );
}
export default SvgComponent;
