import React, { useEffect, useState } from "react";

const AnimatedCursor: React.FC = () => {
  const [cursorStyle, setCursorStyle] = useState<React.CSSProperties>({
    position: "fixed",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    pointerEvents: "none",
    transition: "transform 0.1s ease, background-color 0.2s ease",
    zIndex: 9999,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorStyle((prev) => ({
        ...prev,
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
      }));
    };

    const handleMouseEnter = () => {
      setCursorStyle((prev) => ({
        ...prev,
        backgroundColor: "rgba(255, 255, 255, 1)",
      }));
    };

    const handleMouseLeave = () => {
      setCursorStyle((prev) => ({
        ...prev,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div style={cursorStyle} />;
};

export default AnimatedCursor;
