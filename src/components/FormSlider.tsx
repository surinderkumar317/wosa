"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CommonImage from "./common/Image";
import EnquiryForm from "./EnquiryForm";

interface FormSliderProps {
  heading: string;
  paragraph: string;
}
const images: string[] = [
  "/images/1000x665(1).webp",
  "/images/1000x665(2).webp",
  "/images/1000x665(3).webp",
];

const FormSlider = ({ heading, paragraph }: FormSliderProps) => {

  const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayRef.current]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Stop autoplay on focus/hover and restart on blur/mouse leave
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
        autoplayRef.current.stop(); // Stop autoplay when navigating through dots
      }
    },
    [emblaApi]
  );

  return (
    <div className="form-slider-container lg:relative flex lg:justify-between lg:items-center lg:mx-auto lg:py-20 lg:flex-row flex-col flex-col-reverse">
      <div className="lg:w-1/3 lg:p-6 lg:ml-11 w-full p-10 left-slideform">
        <h1>{heading}</h1>
        <p>{paragraph}</p>
        <EnquiryForm/>        
      </div>
      <div className="lg:w-2/4 lg:p-0 px-5 pt-5 w-full form-slider-img relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src: string, index: number) => (
              <div key={index} className="flex-[0_0_100%]">
                <CommonImage src={src} alt="Slider Image" width={1470} height={570} classname={`w-full ${selectedIndex === index ? "slider-active" : ""}`} />
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 absolute w-full -bottom-20">
            {images.map((_, index: number) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${selectedIndex === index ? "bg-red-600" : "bg-gray-300"
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

export default FormSlider;
