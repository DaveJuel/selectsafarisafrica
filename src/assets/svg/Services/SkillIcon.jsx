import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
        <rect x="16" y="16" width="32" height="32" rx="4" fill="#2196F3"/>
        <path d="M24 24h16v4H24v-4zM24 32h16v4H24v-4zM24 40h8v4H24v-4z" fill="#ffffff"/>
    </svg>
  );
}
export default SvgComponent;
