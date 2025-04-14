"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import CommonImage from "../common/Image";

interface Testimonial {
  name: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Devank Raj",
    image: "/images/profile-testimonials-img.webp",
    text: "I'm thrilled to share that I've completed my skills assessment with Western Overseas, and I'm grateful for their exceptional guidance throughout the process. I'm delighted to announce that I received a positive outcome for my Australian skills assessment within just 1 month!",
  },
  {
    name: "Aarav Singh",
    image: "/images/profile-testimonials-img.webp",
    text: "Western Overseas provided excellent support during my visa process. Their team was always available to answer my queries and ensured that my documentation was perfect. I highly recommend their services!",
  },
  {
    name: "Priya Sharma",
    image: "/images/profile-testimonials-img.webp",
    text: "I cannot thank Western Overseas enough for their invaluable assistance in my skills assessment journey. Their detailed guidance helped me achieve my goals faster than I expected!",
  },
  {
    name: "Raj",
    image: "/images/profile-testimonials-img.webp",
    text: "I'm thrilled to share that I've completed my skills assessment with Western Overseas, and I'm grateful for their exceptional guidance throughout the process. I'm delighted to announce that I received a positive outcome for my Australian skills assessment within just 1 month!",
  },
  {
    name: "Singh",
    image: "/images/profile-testimonials-img.webp",
    text: "Western Overseas provided excellent support during my visa process. Their team was always available to answer my queries and ensured that my documentation was perfect. I highly recommend their services!",
  },
  {
    name: "Sharma",
    image: "/images/profile-testimonials-img.webp",
    text: "I cannot thank Western Overseas enough for their invaluable assistance in my skills assessment journey. Their detailed guidance helped me achieve my goals faster than I expected!",
  },
];

const TestimonialsSlider: React.FC = () => {
  const autoplayInstance = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel
  ({ 
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,

  }, [autoplayInstance.current]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const scrollToSlide = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  // Pause autoplay on hover
  useEffect(() => {
    if (!emblaApi) return;

    const handleMouseEnter = () => autoplayInstance.current.stop();
    const handleMouseLeave = () => autoplayInstance.current.play();

    emblaApi.containerNode()?.addEventListener("mouseenter", handleMouseEnter);
    emblaApi.containerNode()?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      emblaApi.containerNode()?.removeEventListener("mouseenter", handleMouseEnter);
      emblaApi.containerNode()?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [emblaApi]);

  return (
    <>
      <div className="w-full">
        <div className="overflow-hidden relative lg:px-8" ref={emblaRef}>
          <div className="flex lg:gap-4 gap-1">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="embla__slide px-4 pt-10 pb-10 w-full cursor-pointer flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] testimonail-boxs-holder"
                onClick={() => openModal(testimonial)}
              >
                <Card className="testimonials-box w-full bg-white p-4 rounded-lg shadow-md">
                  <CardContent className="p-0">
                    <div className="testimonials-img">
                      <CommonImage
                        src={testimonial.image}
                        alt="testimonials-image"
                        width={105}
                        height={105}
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      {testimonial.name}
                    </h2>
                    <p className="text-sm">
                      {testimonial.text.split(" ").slice(0, 20).join(" ")}...
                      <Button
                        onClick={() => openModal(testimonial)}
                        className="text-blue-600 ml-2"
                      >
                        Read More
                      </Button>
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 commonslider-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full transition-all ${
              selectedIndex === index ? "bg-red-600" : "bg-gray-300"
            }`}
            onClick={() => scrollToSlide(index)}
          ></button>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="common-modal-content max-w-4xl w-full">
          {selectedTestimonial && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTestimonial.name}</DialogTitle>
              </DialogHeader>
              <DialogDescription>{selectedTestimonial.text}</DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestimonialsSlider;
