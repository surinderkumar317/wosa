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
  
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;    
      // ✅ Ensure target is an HTMLElement before calling `closest()`
      if (target instanceof HTMLElement && target.closest(".hover-section")) {
        setVisible(true);
        setEffectKey(prev => prev + 1);
      }
    };    
    
    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;    
      if (!target) {
        console.warn("Mouse leave event triggered with no target.");
        return; // 🚀 Exit early if `target` is `undefined`
      }
    
      if (target.classList?.contains("hover-section")) {
        setVisible(false);
      }
    };
  
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
  
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
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
