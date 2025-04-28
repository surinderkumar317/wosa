"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MarqueeModal from "@/components/header/MarqueeModal"; // Import your custom modal

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
  const marqueeRef = useRef<HTMLDivElement>(null); // Ref for the marquee element
  const [selectedItem, setSelectedItem] = useState<{
    heading: string;
    content: string;
  } | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0); // Track the current position
  const [isPaused, setIsPaused] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false); // Enable animation only for > 2 items

  useEffect(() => {
    const content = document.getElementById("marquee-content");
    if (content) {
      setContentWidth(content.scrollWidth / 2); // Calculate total marquee width
    }

    // Enable animation only if there are more than 2 items
    setIsAnimated(marqueeItems.length > 2);
  }, []);

  // Get the current transform value to accurately pause animation
  const handlePause = () => {
    const marqueeElement = marqueeRef.current;
    if (marqueeElement) {
      const computedStyle = window.getComputedStyle(marqueeElement);
      const matrix = computedStyle.transform.match(/matrix\(([^)]+)\)/);
      if (matrix) {
        const translateX = parseFloat(matrix[1].split(",")[4]); // Get the current X translation
        setCurrentPosition(translateX); // Save the position
      }
    }
    setIsPaused(true); // Pause animation
  };

  // Resume animation from the last saved position
  const handleResume = () => {
    setIsPaused(false); // Resume animation
  };

  const handleModalOpen = () => {
    handlePause(); // Pause animation when opening the modal
  };

  const handleModalClose = () => {
    handleResume(); // Resume animation when closing the modal
  };

  return (
    <div className="relative w-full overflow-hidden text-white py-1">
      {/* Custom Modal */}
      <MarqueeModal
        isOpen={!!selectedItem}
        onClose={() => {
          setSelectedItem(null);
          handleModalClose();
        }}
        title={selectedItem?.heading || ""}
        description={selectedItem?.content || ""}
      />

      {/* Marquee Content */}
      <motion.div
        id="marquee-content"
        ref={marqueeRef}
        className={`flex gap-10 px-4 ${
          marqueeItems.length <= 2 ? "justify-center whitespace-normal" : "whitespace-nowrap"
        }`}
        animate={
          isAnimated && !isPaused
            ? { x: [currentPosition, -contentWidth] }
            : { x: currentPosition }
        }
        transition={{
          x: isAnimated && !isPaused
            ? {
                repeat: Infinity,
                repeatType: "loop",
                duration: (contentWidth + Math.abs(currentPosition)) / speed,
                ease: "linear",
              }
            : { duration: 0 },
        }}
        onMouseEnter={isAnimated ? handlePause : undefined} // Pause animation on hover
        onMouseLeave={isAnimated ? handleResume : undefined} // Resume animation on hover out
      >
        {marqueeItems.length > 2
          ? [...marqueeItems, ...marqueeItems].map((item, index) => (
              <button
                key={index}
                className="cursor-pointer font-semibold hover:underline"
                onClick={() => {
                  setSelectedItem(item);
                  handleModalOpen();
                }}
              >
                {item.heading}
              </button>
            ))
          : marqueeItems.map((item, index) => (
              <button
                key={index}
                className="cursor-pointer font-semibold hover:underline"
                onClick={() => {
                  setSelectedItem(item);
                  handleModalOpen();
                }}
              >
                {item.heading}
              </button>
            ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
