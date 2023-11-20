import React, { useState, useEffect } from "react";

interface ChevronProps {
  rotation: number;
  onClick: () => void;
}

function Chevron({ rotation, onClick }: ChevronProps) {
  const [showChevron, setShowChevron] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setShowChevron(false);
      } else {
        setShowChevron(true);
      }
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <svg
      className="footer-chevron"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.3s",
        transform: `rotate(${rotation}deg)`,
        cursor: "pointer",
        display: showChevron ? "block" : "none",
      }}
      onClick={onClick}
    >
      <path
        d="M10 13.75L3.75 7.5L4.625 6.625L10 12L15.375 6.625L16.25 7.5L10 13.75Z"
        fill="#fff"
      />
    </svg>
  );
}

export default Chevron;
