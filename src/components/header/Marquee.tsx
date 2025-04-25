"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const marqueeItems = [
  {
    heading: "Variations we denounce with",
    content: "On the other hand, we denounce...",
  },
  {
    heading: "Lorem Ipsum we denounce with",
    content: "Dislike men who are so beguiled...",
  },
  {
    heading: "Random Words we denounce with",
    content: "On the other hand, we denounce...",
  },
  {
    heading: "Model we denounce with",
    content: "Righteous indignation and dislike men...",
  },
];

const SPEED = 60; // pixels per second

const Marquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const offset = useRef<number>(0);
  const lastTime = useRef<number | null>(null);
  const animationId = useRef<number | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    heading: string;
    content: string;
  } | null>(null);

  const animate = (timestamp: number) => {
    if (!lastTime.current) lastTime.current = timestamp;

    const elapsed = (timestamp - lastTime.current) / 1000;
    lastTime.current = timestamp;

    if (!isPaused && marqueeRef.current) {
      const contentWidth = marqueeRef.current.scrollWidth / 2;
      offset.current -= SPEED * elapsed;

      if (-offset.current >= contentWidth) {
        offset.current = 0;
      }

      marqueeRef.current.style.transform = `translateX(${offset.current}px)`;
    }

    animationId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationId.current = requestAnimationFrame(animate);
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, []);

  useEffect(() => {
    if (!selectedItem) {
      setIsPaused(false);
      lastTime.current = null;
    } else {
      setIsPaused(true);
    }
  }, [selectedItem]);


  return (
    <div className="relative w-full overflow-hidden bg-black text-white py-2">
      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
        }}
      >
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap gap-12 px-4 will-change-transform"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!selectedItem) setIsPaused(false);
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <DialogTrigger
              key={index}
              className="cursor-pointer font-semibold hover:underline"
              onClick={() => setSelectedItem(item)}
            >
              {item.heading}
            </DialogTrigger>
          ))}
        </div>

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
