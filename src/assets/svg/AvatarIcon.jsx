import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        >
        <circle cx="50" cy="50" r="48" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="4" />
        <circle cx="50" cy="35" r="15" fill="#E5E7EB" />
        <rect x="43" y="50" width="14" height="10" fill="#E5E7EB" />
        <path
            d="M30 65 C30 50, 70 50, 70 65 S50 80, 30 65"
            fill="#E5E7EB"
        />
        <path
            d="M38 60 C38 70, 62 70, 62 60 L62 80 H38 V60 Z"
            fill="#93C5FD"
        />
    </svg>
  );
}
export default SvgComponent;
