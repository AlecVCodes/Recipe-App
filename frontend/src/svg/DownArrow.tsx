import React from "react";

interface DownArrowProps {
  isHovered: boolean;
}

function DownArrow({ isHovered }: DownArrowProps) {
  return (
    <svg
      width="8"
      height="21"
      viewBox="0 0 8 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "opacity 0.2s, transform 0.2s", // Add transition for transform
        opacity: isHovered ? 1 : 0.7,
        transform: isHovered ? "scale(1.4) translateY(10px)" : "translateY(0)", // Scale up and move down when hovered
      }}
    >
      <path
        d="M3.64644 20.3536C3.84171 20.5488 4.15829 20.5488 4.35355 20.3536L7.53553 17.1716C7.73079 16.9763 7.73079 16.6597 7.53553 16.4645C7.34027 16.2692 7.02369 16.2692 6.82843 16.4645L4 19.2929L1.17157 16.4645C0.976309 16.2692 0.659727 16.2692 0.464465 16.4645C0.269202 16.6597 0.269202 16.9763 0.464464 17.1716L3.64644 20.3536ZM3.5 -4.79246e-08L3.5 20L4.5 20L4.5 4.79246e-08L3.5 -4.79246e-08Z"
        fill="black"
      />
    </svg>
  );
}

export default DownArrow;
