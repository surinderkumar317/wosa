"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const marqueeItems = [
  { heading: "Variations we denounce with", content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire," },
  { heading: "Lorem Ipsum we denounce with", content: "Dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire," },
  { heading: "Random Words we denounce with", content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire," },
  { heading: "Model we denounce with", content: "Righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire," },
  { heading: "Variations we denounce with", content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire," },
  { heading: "Lorem Ipsum we denounce with", content: "Dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire," },
  { heading: "Random Words we denounce with", content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire," },
  { heading: "Model we denounce with", content: "Righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire," },
];

const Marquee: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<{ heading: string; content: string } | null>(null);
  const controls = useAnimation();

  const startAnimation = () => {
    controls.start({
      x: "-100%",
      transition: { repeat: Infinity, ease: "linear", duration: 30 },
    });
  };

  useEffect(() => {
    startAnimation(); // Start animation on mount
  }, []);

  useEffect(() => {
    if (!selectedItem) {
      startAnimation(); // Restart animation when modal closes
    }
  }, [selectedItem]);

  const handleMouseEnter = () => {
    controls.stop(); // Pause animation
  };

  const handleMouseLeave = () => {
    startAnimation(); // Resume animation
  };

  const handleFocus = () => {
    controls.stop(); // Pause animation
  };

  const handleBlur = () => {
    startAnimation(); // Resume animation
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedItem(null);
          }
        }}
      >
        <motion.div
          className="flex gap-3 whitespace-nowrap text-white"
          initial={{ x: 0 }}
          animate={controls}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {marqueeItems.map((item, index) => (
            <DialogTrigger
              key={index}
              onClick={() => setSelectedItem(item)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {item.heading}
            </DialogTrigger>
          ))}
        </motion.div>

        {selectedItem && (
          <DialogContent className="common-modal-content w-full max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedItem.heading}</DialogTitle>
              <DialogDescription>{selectedItem.content}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Marquee;
