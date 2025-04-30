"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MarqueeModal from "@/components/header/MarqueeModal";

const marqueeItems = [
  {
    heading: "Variations we denounce with",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
  },
  {
    heading: "Lorem Ipsum we denounce with",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
  },
  {
    heading: "Random Words we denounce with",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
  },
  {
    heading: "Model we denounce with",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
  },
];

const Marquee: React.FC<{ speed?: number }> = ({ speed = 20 }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<{ heading: string; content: string } | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const content = document.getElementById("marquee-content");
    if (content) {
      setContentWidth(content.scrollWidth / 2);
    }

    // ✅ Start looping **only if there are more than 2 items**
    setIsAnimated(marqueeItems.length > 2);
  }, []);

  useEffect(() => {
    let frameId: number;

    const smoothAnimate = () => {
      if (!isPaused && marqueeRef.current && isAnimated) {
        const nextPosition = currentPosition - 1;
        setCurrentPosition(nextPosition);
        marqueeRef.current.style.transform = `translateX(${nextPosition}px)`;

        // 🔄 Reset position when reaching the end
        if (Math.abs(nextPosition) >= contentWidth) {
          setCurrentPosition(0);
        }
      }

      frameId = requestAnimationFrame(smoothAnimate);
    };

    if (isAnimated) {
      frameId = requestAnimationFrame(smoothAnimate);
    }

    return () => cancelAnimationFrame(frameId);
  }, [currentPosition, isPaused, isAnimated]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);
  //const handleModalOpen = () => handlePause();
  const handleModalClose = () => handleResume();

  return (
    <div className="relative w-full overflow-hidden text-white py-1">
      <MarqueeModal
        isOpen={!!selectedItem}
        onClose={() => {
          setSelectedItem(null);
          handleModalClose();
        }}
        title={selectedItem?.heading || ""}
        description={selectedItem?.content || ""}
      />

      <motion.div
        id="marquee-content"
        ref={marqueeRef}
        className={`flex gap-10 px-4 ${marqueeItems.length <= 2 ? "justify-center" : "whitespace-nowrap"}`}
        animate={isAnimated && !isPaused ? { x: [currentPosition, -contentWidth] } : { x: currentPosition }}
        transition={
          isAnimated && !isPaused
            ? { repeat: Infinity, repeatType: "loop", duration: contentWidth / (speed * 0.5), ease: "linear" } // 🔄 Slower speed
            : { duration: 0 }
        }
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        style={{ willChange: "transform" }}
      >
        {isAnimated
          ? [...marqueeItems, ...marqueeItems].map((item, index) => (
              <button key={index} className="cursor-pointer font-semibold hover:underline" onClick={() => setSelectedItem(item)}>
                {item.heading}
              </button>
            ))
          : marqueeItems.map((item, index) => (
              <button key={index} className="cursor-pointer font-semibold hover:underline" onClick={() => setSelectedItem(item)}>
                {item.heading}
              </button>
            ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
