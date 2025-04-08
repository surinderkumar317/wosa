"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CommonImage from "./common/Image";

const images: string[] = [
  "/images/full-width-slider01.webp",
  "/images/full-width-slider02.webp",
  "/images/full-width-slider03.webp",
];

const Slider: React.FC = () => {
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayRef.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    const stopAutoplay = () => autoplayRef.current.stop();
    const startAutoplay = () => autoplayRef.current.play();
    const dotsContainer = document.querySelector(".slider-dots");

    emblaApi.containerNode().addEventListener("focusin", stopAutoplay);
    emblaApi.containerNode().addEventListener("focusout", startAutoplay);
    emblaApi.containerNode().addEventListener("mouseenter", stopAutoplay);
    emblaApi.containerNode().addEventListener("mouseleave", startAutoplay);
    emblaApi.containerNode().addEventListener("click", stopAutoplay);

    if (dotsContainer) {
      dotsContainer.addEventListener("mouseenter", stopAutoplay);
      dotsContainer.addEventListener("mouseleave", startAutoplay);
    }

    return () => {
      emblaApi.containerNode().removeEventListener("focusin", stopAutoplay);
      emblaApi.containerNode().removeEventListener("focusout", startAutoplay);
      emblaApi.containerNode().removeEventListener("mouseenter", stopAutoplay);
      emblaApi.containerNode().removeEventListener("mouseleave", startAutoplay);
      emblaApi.containerNode().removeEventListener("click", stopAutoplay);

      if (dotsContainer) {
        dotsContainer.removeEventListener("mouseenter", stopAutoplay);
        dotsContainer.removeEventListener("mouseleave", startAutoplay);
      }
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        autoplayRef.current.stop();
      }
    },
    [emblaApi]
  );

  return (
    <div className="slider-full-width py-10">
      <div className="container m-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src: string, index: number) => (
              <div
                key={index}
                className={`flex-[0_0_100%] p-5 ${
                  selectedIndex === index ? "slider-active" : ""
                }`}
              >
                <CommonImage
                  src={src}
                  alt="Slider Image"
                  width={1470}
                  height={570}
                  classname="sliderfull w-full" 
                />
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 slider-dots">
            {images.map((_, index: number) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  selectedIndex === index ? "bg-red-600" : "bg-gray-300"
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
