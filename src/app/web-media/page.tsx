"use client";
import CommonImage from "@/components/common/Image";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"; // Import useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Import resolver for validation
import * as z from "zod"; // Import zod for schema validation

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface MediaItem {
  id: number;
  title: string;
  date: string;
  image: string;
  video?: string;
  category: string; // Add category field for proper filtering
}

const mediaData: MediaItem[] = [
  {
    id: 1,
    title: "Abram Khajuria Study Visa",
    date: "24 Feb, 2025",
    image: "/images/image-gallery01.webp",
    category: "Visa Testimonials",
  },
  {
    id: 2,
    title: "Abram Khajuria",
    date: "19 Feb, 2025",
    image: "/images/image-gallery02.webp",
    video: "/images/ocean.mp4",
    category: "Academy Testimonial",
  },
  {
    id: 3,
    title: "Abram Khajuria Study Visa",
    date: "19 Feb, 2025",
    image: "/images/image-gallery03.webp",
    category: "Visa Testimonials",
  },
  {
    id: 4,
    title: "Abram Khajuria",
    date: "19 Feb, 2025",
    image: "/images/image-gallery01.webp",
    video: "/images/ocean.mp4",
    category: "Visa Testimonials",
  },
  {
    id: 5,
    title: "Abram Khajuria Study Visa",
    date: "19 Feb, 2025",
    image: "/images/image-gallery01.webp",
    category: "Visa Testimonials",
  },
  {
    id: 6,
    title: "Abram Khajuria",
    date: "19 Feb, 2025",
    image: "/images/image-gallery02.webp",
    video: "/images/ocean.mp4",
    category: "Visa Testimonials",
  },
  {
    id: 7,
    title: "Abram Khajuria Study Visa",
    date: "19 Feb, 2025",
    image: "/images/image-gallery03.webp",
    category: "Visa Testimonials",
  },
  {
    id: 8,
    title: "Abram Khajuria",
    date: "19 Feb, 2025",
    image: "/images/image-gallery01.webp",
    video: "/images/ocean.mp4",
    category: "Visa Testimonials",
  },
  {
    id: 9,
    title: "Abram Khajuria Study Visa",
    date: "19 Feb, 2025",
    image: "/images/image-gallery01.webp",
    category: "Visa Testimonials",
  },
  {
    id: 10,
    title: "Abram Khajuria",
    date: "19 Feb, 2025",
    image: "/images/image-gallery02.webp",
    video: "/images/ocean.mp4",
    category: "Visa Testimonials",
  },
  {
    id: 11,
    title: "Abram Khajuria Study Visa",
    date: "19 Feb, 2025",
    image: "/images/image-gallery03.webp",
    category: "Visa Testimonials",
  },
];

const formSchema = z.object({
  search: z.string().optional(),
  webcategory: z.string().optional(),
  mediaType: z.string().optional(),
  uploadTime: z.string().optional(),
});

const WebMedia: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [visibleItems, setVisibleItems] = useState(8);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      webcategory: "",
      mediaType: "",
      uploadTime: "",
    },
  });

  const { watch } = form; // Get values from form
  const searchQuery = watch("search");
  const category = watch("webcategory");
  const mediaType = watch("mediaType");
  const uploadTime = watch("uploadTime");

  // Function to filter media based on form values
  const filterMedia = () => {
    return mediaData.filter((media) => {
      const searchMatch = media.title.toLowerCase().includes(searchQuery?.toLowerCase() || "");
      const categoryMatch = category ? media.category === category : true; // FIXED: Properly compare category
      const mediaTypeMatch = mediaType ? (mediaType === "Video" ? media.video : !media.video) : true;

      const uploadTimeMatch = (() => {
        if (!uploadTime) return true;
        const mediaDate = new Date(media.date);
        const today = new Date();
        if (uploadTime === "This Week") {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(today.getDate() - 7);
          return mediaDate >= oneWeekAgo;
        } else if (uploadTime === "This Month") {
          return mediaDate.getMonth() === today.getMonth() && mediaDate.getFullYear() === today.getFullYear();
        } else if (uploadTime === "Last Six Months") {
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(today.getMonth() - 6);
          return mediaDate >= sixMonthsAgo;
        } else if (uploadTime === "This Year") {
          return mediaDate.getFullYear() === today.getFullYear();
        } else if (uploadTime === "Last Year") {
          return mediaDate.getFullYear() === today.getFullYear() - 1;
        }
        return true;
      })();

      return searchMatch && categoryMatch && mediaTypeMatch && uploadTimeMatch;
    });
  };


  const filteredMedia = filterMedia();


  return (
    <div className="web-media-container">
      <div className="commonbanner-form py-10 items-center flex flex-col">
        <div className="container m-auto relative z-20">
          <h1 className="text-center">LATEST WEB MEDIA</h1>
          <div className="webmeida-filter-box p-6 bg-white mt-5">
            <Form {...form}>
              <form className="flex gap-5 webmedia-form">
                {/* Search Input */}
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="w-1/4 webmedia-form-row">
                      <FormControl>
                        <Input placeholder="Search" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category Select */}
                <FormField
                  control={form.control}
                  name="webcategory"
                  render={({ field }) => (
                    <FormItem className="w-1/4 webmedia-form-row">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange} value={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Web Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Visa Testimonials">
                              Visa Testimonials
                            </SelectItem>
                            <SelectItem value="Academy Testimonial">
                              Academy Testimonial
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Media Type Select */}
                <FormField
                  control={form.control}
                  name="mediaType"
                  render={({ field }) => (
                    <FormItem className="w-1/4 webmedia-form-row">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Image">Image</SelectItem>
                            <SelectItem value="Video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Upload Time Select */}
                <FormField
                  control={form.control}
                  name="uploadTime"
                  render={({ field }) => (
                    <FormItem className="w-1/4 webmedia-form-row">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange} value={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Upload Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="This Week">This Week</SelectItem>
                            <SelectItem value="This Month">
                              This Month
                            </SelectItem>
                            <SelectItem value="Last Six Month">
                              Last Six Months
                            </SelectItem>
                            <SelectItem value="This Year">
                              This year
                            </SelectItem>
                            <SelectItem value="Last Year">
                              Last year
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Clear Button */}
                <Button
                  type="button"
                  onClick={() => form.reset()}
                  className="clear-filter-btn"
                >
                  Clear
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="bgvector">
          <CommonImage
            classname="bg-cont"
            src="/images/background.webp"
            alt="Background"
            width={1938}
            height={624}
          />
        </div>
      </div>

      {/* Media Display */}
      <div className="container m-auto">
        <div className="webmedia-boxes-cont relative">
          {filteredMedia.length > 0 ? (
            filteredMedia.slice(0, visibleItems).map((media) => (
              <Card key={media.id} className="webmedia-box">
                <CardContent>
                  <Link
                    href="#"
                    className="webmedia-img"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMedia(media);
                    }}
                  >
                    <CommonImage
                      classname="gallery-img"
                      src={media.image}
                      alt={media.title}
                      width={1080}
                      height={1080}
                    />
                    {media.video && (
                      <div className="play-btn">
                        <i className="fa fa-play play-cicle"></i>
                      </div>
                    )}
                  </Link>
                  <div className="webmedia-text">
                    <h4>{media.title}</h4>
                    <p>{media.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Show this message if no data found
            <div className="text-center py-10 w-full absolute left-0">
              <p className="text-gray-500 text-lg font-semibold">
                No Web Media File Found
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {visibleItems < filteredMedia.length && (
          <div className="w-full loader-btn pb-10 flex justify-center">
            <Button
              variant="link"
              onClick={() => setVisibleItems((prev) => prev + 4)}
            >
              Load More
              <CommonImage
                classname={"large-arrow"}
                src={"/images/our-services-arrow.webp"}
                alt={"arrow"}
                width={43}
                height={12}
              />
            </Button>
          </div>
        )}

        {/* Modal for Media Preview */}
        {selectedMedia && (
          <Dialog
            open={!!selectedMedia}
            onOpenChange={() => setSelectedMedia(null)}
          >
            <DialogContent className="gallery-modal xl:w-[35%] 2xl:w-[40%] w-full">
              <DialogHeader>
                <DialogTitle>{selectedMedia.title}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              {selectedMedia.video ? (
                <video controls className="w-full">
                  <source src={selectedMedia.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <CommonImage
                  classname="w-full"
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  width={1080}
                  height={1080}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default WebMedia;
