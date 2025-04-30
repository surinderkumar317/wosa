"use client";

import { useEffect, useState } from "react";

const CursorLight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [effectKey, setEffectKey] = useState(0); // ✅ New state to force animation reset

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
  
    const handleMouseEnter = () => {
      setVisible(true); // ✅ Ensure light appears when hovering any section
      setEffectKey(prev => prev + 1); // ✅ Reset animation
    };
    
    const handleMouseLeave = () => {
      setVisible(false);
    };
  
    document.querySelectorAll(".hover-section").forEach((section) => {
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);
    });
  
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  

  return (
    <div
      key={effectKey} // ✅ Forces React to re-render with new animation
      className={`cursor-light ${visible ? "appear" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
};

export default CursorLight;
