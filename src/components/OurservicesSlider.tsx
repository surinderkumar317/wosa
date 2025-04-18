"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import CommonImage from "./common/Image";

const servicesText = [
  {
    id: 1,
    tag: "h3",
    title: "We are the Premier and Global Immigration Experts",
  },
  { id: 2, tag: "h2", title: "Our Services" },
];

type ServiceItem = {
  image: string;
  icon: string;
  heading: string;
  content: string;
  buttonText: string;
  buttonImage: string;
  link: string;
};

const items: ServiceItem[] = [
  {
    image: "/images/Dependent-Visa.webp",
    icon: "/images/our-services-icon01.webp",
    heading: "Reality Test",
    content:
      "Test your preparation for IELTS, PTE, etc. by giving Reality tests powered by Western Overseas. Book your test today to assess your preparation!",
    buttonText: "Read More",
    buttonImage: "/images/our-services-arrow.webp",
    link: "/reality-test",
  },
  {
    image: "/images/Inhouse-Coaching.webp",
    icon: "/images/our-services-icon02.webp",
    heading: "Permanent Residency",
    content:
      "Permanent Residency status allows you to be a legal resident of another country like Canada or Australia, etc. PR includes Express Entry and PNP programs.",
    buttonText: "Read More",
    buttonImage: "/images/our-services-arrow.webp",
    link: "/pr-visa-landing",
  },
  {
    image: "/images/Online-Coaching.webp",
    icon: "/images/our-services-icon03.webp",
    heading: "Spouse Visa",
    content:
      "Spouse visa allows you to live with your partner. Western overseas helps you in the complete process such as eligibility check and application process.",
    buttonText: "Read More",
    buttonImage: "/images/our-services-arrow.webp",
    link: "/spouse-visa-landing",
  },
  {
    image: "/images/Practice-Pack.webp",
    icon: "/images/our-services-icon04.webp",
    heading: "Study Visa",
    content:
      "Apply study visas today with Western Overseas to open up multiple possibilities. Studying abroad in the UK, USA, Australia, Canada, others enhances knowledge.",
    buttonText: "Read More",
    buttonImage: "/images/our-services-arrow.webp",
    link: "/study-visa-landing",
  },
  {
    image: "/images/Reality-Test.webp",
    icon: "/images/our-services-icon05.webp",
    heading: "Visitor Visa",
    content:
      "You can visit Canada, Australia, the USA, New Zealand, the UK, and Europe as a tourist to meet friends and family. To find more options visit Western Overseas",
    buttonText: "Read More",
    buttonImage: "/images/our-services-arrow.webp",
    link: "/tourist-visa-landing",
  },
  {
    image: "/images/Study-Visa.webp",
    icon: "/images/our-services-icon06.webp",
    heading: "Dependent Visa",
    content:
      "Western Overseas provides support in getting kids and spouse visas for joining all the family members together. But, A relationship must be genuine to apply.",
    buttonText: "Read More",
    buttonImage: "/images/our-services-arrow.webp",
    link: "/dependent-visa-landing",
  },
  
];

const OurservicesSlider: React.FC = () => {
  const autoplayInterval = 3000;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
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

    startAutoplay(); // Start autoplay initially

    emblaApi.on("pointerDown", stopAutoplay); // Stop autoplay on manual scroll
    emblaApi.containerNode().addEventListener("mouseenter", stopAutoplay); // Stop autoplay on hover
    emblaApi.containerNode().addEventListener("mouseleave", startAutoplay); // Resume autoplay on leave
    emblaApi.containerNode().addEventListener("focusin", stopAutoplay); // Stop autoplay when focused
    emblaApi.containerNode().addEventListener("focusout", startAutoplay); // Resume autoplay when focus is lost

    const dotsContainer = document.querySelector(".commonslider-dots");
    if (dotsContainer) {
      dotsContainer.addEventListener("mouseenter", stopAutoplay);
      dotsContainer.addEventListener("mouseleave", startAutoplay);
    }

    return () => {
      clearInterval(autoplay);
      emblaApi.containerNode().removeEventListener("mouseenter", stopAutoplay);
      emblaApi.containerNode().removeEventListener("mouseleave", startAutoplay);
      emblaApi.containerNode().removeEventListener("focusin", stopAutoplay);
      emblaApi.containerNode().removeEventListener("focusout", startAutoplay);

      if (dotsContainer) {
        dotsContainer.removeEventListener("mouseenter", stopAutoplay);
        dotsContainer.removeEventListener("mouseleave", startAutoplay);
        dotsContainer.removeEventListener("click", stopAutoplay);
      }
    };
  }, [emblaApi, autoplayInterval]);

  return (
    <div className="our-services-new-section py-24">
      <div className="container m-auto">
        <div className="services-content mb-10 text-center">
          {servicesText.map((service) => {
            return React.createElement(
              service.tag,
              { key: service.id },
              service.title
            );
          })}
        </div>

        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {items.map((item, index) => (
              <div
                key={index}
                className="embla__slide px-4 pt-10 pb-10 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <Link href={item.link} className="no-underline">
                  <Card className="border p-3 bg-white shadow-lg rounded-md ourservices-box">
                    <CardContent className="p-0">
                      <CommonImage
                        src={item.image}
                        alt={item.heading}
                        width={300}
                        height={200}
                        classname="w-full object-cover rounded-md"
                      />
                      <div className="flex items-center mt-4 icon">
                        <CommonImage
                          src={item.icon}
                          alt={`${item.heading} icon`}
                          width={54}
                          height={54}
                        />
                      </div>
                      <div className="ourservices-content-container">
                        <h2 className="text-lg font-semibold text-center my-5">
                          {item.heading}
                        </h2>
                        <p className="mt-2 text-center">{item.content}</p>
                        <Button className="mt-4 text-white rounded bg-white p-6">
                          {item.buttonText}
                          <CommonImage
                            src={item.buttonImage}
                            alt="arrow"
                            width={43}
                            height={12}
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-2 commonslider-dots">
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

export default OurservicesSlider;
