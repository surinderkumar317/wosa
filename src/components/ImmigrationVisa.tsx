"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import CommonImage from "./common/Image";

interface VisaCountry {
  name1: string;
  image1: string;
  link1: string;
  name2: string;
  image2: string;
  link2: string;
}

const visaCountries: VisaCountry[] = [
  {
    name1: "Canada",
    image1: "/images/flag01.jpg",
    link1: "/study-visa-landing",
    name2: "Australia",
    image2: "/images/flag02.jpg",
    link2: "/tourist-visa-landing",
  },
  {
    name1: "USA",
    image1: "/images/flag03.jpg",
    link1: "/work-visa-landing",
    name2: "UK",
    image2: "/images/flag04.jpg",
    link2: "/dependent-visa-landing",
  },
  {
    name1: "Germany",
    image1: "/images/flag01.jpg",
    link1: "/pr-visa-landing",
    name2: "France",
    image2: "/images/flag02.jpg",
    link2: "/work-visa-landing",
  },
  {
    name1: "New Zealand",
    image1: "/images/flag01.jpg",
    link1: "/study-visa-landing",
    name2: "Ireland",
    image2: "/images/flag02.jpg",
    link2: "/tourist-visa-landing",
  },
  {
    name1: "Italy",
    image1: "/images/flag03.jpg",
    link1: "/study-visa-landing",
    name2: "Spain",
    image2: "/images/flag04.jpg",
    link2: "/pr-visa-landing",
  },

  {
    name1: "Canada",
    image1: "/images/flag01.jpg",
    link1: "/study-visa-landing",
    name2: "Australia",
    image2: "/images/flag02.jpg",
    link2: "/tourist-visa-landing",
  },
  {
    name1: "USA",
    image1: "/images/flag03.jpg",
    link1: "/work-visa-landing",
    name2: "UK",
    image2: "/images/flag04.jpg",
    link2: "/dependent-visa-landing",
  },
  {
    name1: "Germany",
    image1: "/images/flag01.jpg",
    link1: "/pr-visa-landing",
    name2: "France",
    image2: "/images/flag02.jpg",
    link2: "/work-visa-landing",
  },
  {
    name1: "New Zealand",
    image1: "/images/flag01.jpg",
    link1: "/study-visa-landing",
    name2: "Ireland",
    image2: "/images/flag02.jpg",
    link2: "/tourist-visa-landing",
  },
  {
    name1: "Italy",
    image1: "/images/flag03.jpg",
    link1: "/study-visa-landing",
    name2: "Spain",
    image2: "/images/flag04.jpg",
    link2: "/pr-visa-landing",
  },
  
];

interface ImmigrationContentProps {
  subHeading: string;
  heading: string;
}

const ImmigrationVisaSlider: React.FC<ImmigrationContentProps> = ({ subHeading, heading }) => {
  const autoplayInterval = 3000;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 5,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    let autoplay: NodeJS.Timeout;

    const startAutoplay = () => {
      autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, autoplayInterval);
    };

    const stopAutoplay = () => {
      clearInterval(autoplay);
    };

    startAutoplay();

    const container = emblaApi.containerNode();
    container.addEventListener("mouseenter", stopAutoplay);
    container.addEventListener("mouseleave", startAutoplay);
    container.addEventListener("focusin", stopAutoplay);
    container.addEventListener("focusout", startAutoplay);

    const dotsContainer = document.querySelector(".commonslider-dots");
    if (dotsContainer) {
      dotsContainer.addEventListener("mouseenter", stopAutoplay);
      dotsContainer.addEventListener("mouseleave", startAutoplay);
    }

    return () => {
      clearInterval(autoplay);
      container.removeEventListener("mouseenter", stopAutoplay);
      container.removeEventListener("mouseleave", startAutoplay);
      container.removeEventListener("focusin", stopAutoplay);
      container.removeEventListener("focusout", startAutoplay);

      if (dotsContainer) {
        dotsContainer.removeEventListener("mouseenter", stopAutoplay);
        dotsContainer.removeEventListener("mouseleave", startAutoplay);
      }
    };
  }, [emblaApi, autoplayInterval]);

  return (
    <div className="immigration-visa-cont lg:py-24 py-12">
      <div className="container m-auto">
        <div className="immigration-content">
          <h3>{subHeading}</h3>
          <h2>{heading}</h2>
        </div>

        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className={`flex ${visaCountries.length <= 5 ? "justify-center" : ""}`}>
            {visaCountries.map((country, index) => (
              <div key={index} className="embla__slide flex-shrink-0 lg:w-1/5 px-4 pt-10 lg:pb-10 pb-0">
                <Card className="border-none shadow-none">
                  <CardContent className="p-0 visa-slider">
                    <div className="visa-item">
                      <Link href={country.link1} className="visa-item-links">
                        <CommonImage
                          classname="visa-flag-icon"
                          src={country.image1}
                          alt={country.name1}
                          width={1000}
                          height={787}
                        />
                        <h3>{country.name1}</h3>
                      </Link>
                      <Link href={country.link2} className="visa-item-links">
                        <CommonImage
                          classname="visa-flag-icon"
                          src={country.image2}
                          alt={country.name2}
                          width={1000}
                          height={787}
                        />
                        <h3>{country.name2}</h3>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex justify-center mt-4 space-x-2 commonslider-dots ${
            visaCountries.length <= 5 ? "hidden" : ""
          }`}
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                selectedIndex === index ? "bg-red-600" : "bg-gray-300"
              }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImmigrationVisaSlider;
