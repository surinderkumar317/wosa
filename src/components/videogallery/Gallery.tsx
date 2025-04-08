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
import { Card, CardContent } from "@/components/ui/card";
import CommonImage from "../common/Image";

interface GalleryItem {
  src: string;
  videoSrc: string;
  title: string;
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    src: "/images/image-gallery01.webp",
    videoSrc: "/images/ocean.mp4",
    title: "Sunset View",
    description: "A breathtaking sunset over the mountains.",
  },
  {
    src: "/images/image-gallery02.webp",
    videoSrc: "/images/ocean.mp4",
    title: "Forest Path",
    description: "A serene path through a misty forest.",
  },
  {
    src: "/images/image-gallery03.webp",
    videoSrc: "/images/ocean.mp4",
    title: "Ocean Waves",
    description: "Gentle waves touching the shore at sunrise.",
  },
  {
    src: "/images/image-gallery01.webp",
    videoSrc: "/images/ocean.mp4",
    title: "City Lights",
    description: "A vibrant cityscape glowing at night.",
  },
  {
    src: "/images/image-gallery02.webp",
    videoSrc: "/images/ocean.mp4",
    title: "Desert Dunes",
    description: "Golden sand dunes under the bright sun.",
  },
  {
    src: "/images/image-gallery03.webp",
    videoSrc: "/images/ocean.mp4",
    title: "Snowy Peaks",
    description: "Majestic snow-covered mountains.",
  },
];

const Gallery: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start"});
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
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  return (
    <div className="gallery-images">
      <div className="relative overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {galleryData.map((item, index) => (
            <div
              key={index}
              className="embla__slide flex-shrink-0 lg:w-1/3 w-full px-4 pt-10 pb-10 gallery-box"
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
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogDescription>{selectedItem.description}</DialogDescription>
              </DialogHeader>
              <video
                src={selectedItem.videoSrc}
                controls
                className="w-full h-auto max-w-3xl rounded-lg"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
