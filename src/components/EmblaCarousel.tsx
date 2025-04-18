"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommonImage from "./common/Image";

// Data Array with button links
const slides = [
  {
    title: "Start Your Immigration Journey",
    description:
      "Try our online and offline coaching to get instant scores on English proficiency tests like IELTS, PTE, TOEFL, DUOLINGO, and Foreign Languages.",
    buttonText: "Enquire Now",
    buttonLink: "/enquiry",
    image: "/images/1000x665(1).webp",
  },
  {
    title: "Book Exam at discounted Price",
    description:
      "Western Overseas, the best immigration consultants located in India, Canada, and Australia, to transform your dreams into reality.",
    buttonText: "Enquire Now",
    buttonLink: "/enquiry",
    image: "/images/1000x665(2).webp",
  },
  {
    title: "IELTS | PTE | TOEFL",
    description:
      "Try our online and offline coaching to get instant scores on English proficiency tests like IELTS, PTE, TOEFL, DUOLINGO, and Foreign Languages.",
    buttonText: "Buy Now",
    buttonLink: "/practice-packs",
    image: "/images/1000x665(3).webp",
  },
];

const EmblaCarousel: React.FC = () => {
  const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayRef.current]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

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
    <div className="lg:relative lg:justify-between lg:items-center lg:mx-auto main-slider-container flex py-20 lg:flex-row  flex-col flex-col-reverse">
      {/* Static Content (Left Side) */}
      <div className={`lg:w-1/3 lg:p-6 lg:ml-11 w-full p-5 left-slide-content ${selectedIndex === selectedIndex ? "slider-active" : ""}`}>
        <h1 className="text-3xl lg:text-5xl font-bold">{slides[selectedIndex].title}</h1>
        <p className="mt-3 text-base lg:text-3xl">{slides[selectedIndex].description}</p>
        <Button className="mt-4 px-6 text-white rounded-lg text-base lg:text-2xl py-5 lg:py-8" asChild>
          <Link href={slides[selectedIndex].buttonLink} passHref>
              {slides[selectedIndex].buttonText}
          </Link>
        </Button>
      </div>

      {/* Embla Carousel (Right Side) */}
      <div className="lg:w-2/4 lg:p-0 px-5 pt-5 w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className={`flex-[0_0_100%] min-w-0 main-slider-img ${ selectedIndex === index ? "slider-active" : ""}`}>
              <CommonImage
                src={slide.image}
                alt={slide.title}
                width={1000}
                height={665}
                classname="shadow-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 right-8 flex gap-2 slider-dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              selectedIndex === index ? "bg-white scale-125" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
