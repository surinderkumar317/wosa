"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,  
} from "@/components/ui/card";
import CommonImage from "../common/Image";

interface GalleryItem {
  src: string;
  title: string;
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    src: "/images/image-gallery01.webp",
    title: "Sunset View",
    description: "A breathtaking sunset over the mountains.",
  },
  {
    src: "/images/image-gallery02.webp",
    title: "Forest Path",
    description: "A serene path through a misty forest.",
  },
  {
    src: "/images/image-gallery03.webp",
    title: "Ocean Waves",
    description: "Gentle waves touching the shore at sunrise.",
  },
  {
    src: "/images/image-gallery01.webp",
    title: "City Lights",
    description: "A vibrant cityscape glowing at night.",
  },
  {
    src: "/images/image-gallery02.webp",
    title: "Desert Dunes",
    description: "Golden sand dunes under the bright sun.",
  },
  {
    src: "/images/image-gallery03.webp",
    title: "Snowy Peaks",
    description: "Majestic snow-covered mountains.",
  },
];

const Gallery: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const openModal = (item: GalleryItem) => {
    setSelectedImage(item);
    setModalIsOpen(true);
  };

  return (
    <div className="gallery-images">
      <div className="relative overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {galleryData.map((item, index) => (
            <div
              key={index}
              className="embla__slide px-4 pt-10 pb-10 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]  gallery-box hover-section"
            >
              <Card>
                <CardContent className="p-0">
                  <div onClick={() => openModal(item)}>
                    <CommonImage
                      src={item.src}
                      alt={item.title}
                      width={500}
                      height={500}                    
                      classname="cursor-pointer w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-2 commonslider-dots">
          {galleryData.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === selectedIndex ? "bg-red-600" : "bg-gray-300"
              }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            />
          ))}
        </div>
      </div>
      <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <DialogContent className="gallery-modal xl:w-[35%] 2xl:w-[40%] w-full">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedImage.title}</DialogTitle>
                <DialogDescription>
                  {selectedImage.description}
                </DialogDescription>
              </DialogHeader>
              <CommonImage
                src={selectedImage.src}
                alt={selectedImage.title}
                width={800}
                height={800}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
