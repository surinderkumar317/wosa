"use client";

import React, { useState } from "react";
import CommonImage from "@/components/common/Image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Testimonial {
  image: string;
  name: string;
  date: string;
  content: string;
  category: string; // Add category field for proper filtering
}

const formSchema = z.object({
  search: z.string().optional(),
  webcategory: z.string().optional(),
  uploadTime: z.string().optional(),
});

const testimonials: Testimonial[] = [
  {
    image: "/images/profile-testimonials-img.webp",
    name: "Devank Raj",
    date: "01-01-2025",
    category: "Visa Testimonials",
    content:
      "Got a chance to visit Western Overseas, Nehru Place Branch, and I must say it was worth it. I got all the insightful details about the immigration process that I sought. Tajinder was diligently patient and explained all the intricacies to me expertly.",
  },
  {
    image: "/images/profile-testimonials-img.webp",
    name: "AJAY BISHT",
    date: "02-20-2025",
    category: "Academy Testimonial",
    content:
      "Got a chance to visit Western Overseas, Nehru Place Branch, and I must say it was worth it. I got all the insightful details about the immigration process that I sought. Tajinder was diligently patient and explained all the intricacies to me expertly.",
  },
  {
    image: "/images/profile-testimonials-img.webp",
    name: "Rohan Sharma",
    date: "01-01-2025",
    category: "Visa Testimonials",
    content:
      "Got a chance to visit Western Overseas, Nehru Place Branch, and I must say it was worth it. I got all the insightful details about the immigration process that I sought. Tajinder was diligently patient and explained all the intricacies to me expertly.",
  },
  {
    image: "/images/profile-testimonials-img.webp",
    name: "Raj",
    date: "02-19-2025",
    category: "Academy Testimonial",
    content:
      "Got a chance to visit Western Overseas, Nehru Place Branch, and I must say it was worth it. I got all the insightful details about the immigration process that I sought. Tajinder was diligently patient and explained all the intricacies to me expertly.",
  },
  {
    image: "/images/profile-testimonials-img.webp",
    name: "Devank Raj",
    date: "01-02-2025",
    category: "Visa Testimonials",
    content:
      "Got a chance to visit Western Overseas, Nehru Place Branch, and I must say it was worth it. I got all the insightful details about the immigration process that I sought. Tajinder was diligently patient and explained all the intricacies to me expertly.",
  },
  {
    image: "/images/profile-testimonials-img.webp",
    name: "AJAY BISHT",
    date: "02-21-2025",
    category: "Academy Testimonial",
    content:
      "Got a chance to visit Western Overseas, Nehru Place Branch, and I must say it was worth it. I got all the insightful details about the immigration process that I sought. Tajinder was diligently patient and explained all the intricacies to me expertly.",
  },
  {
    image: "/images/profile-testimonials-img.webp",
    name: "Rohan Sharma",
    date: "02-26-2025",
    category: "Visa Testimonials",
    content:
      "Got a chance to visit Western Overseas, Nehru Place Branch, and I must say it was worth it. I got all the insightful details about the immigration process that I sought. Tajinder was diligently patient and explained all the intricacies to me expertly.",
  },
  {
    image: "/images/profile-testimonials-img.webp",
    name: "Raj",
    date: "02-27-2025",
    category: "Academy Testimonial",
    content:
      "Got a chance to visit Western Overseas, Nehru Place Branch, and I must say it was worth it. I got all the insightful details about the immigration process that I sought. Tajinder was diligently patient and explained all the intricacies to me expertly.",
  },
];

const Testimonials: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { search: "", webcategory: "", uploadTime: "" },
  });

  const { search, webcategory, uploadTime } = form.watch();
  const today = new Date();

  const filteredTestimonials = testimonials
    .filter(({ name, content }) =>
      search
        ? name.toLowerCase().includes(search.toLowerCase()) ||
        content.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter(({ category }) => (webcategory ? category === webcategory : true))
    .filter(({ date }) => {
      if (!uploadTime) return true;
      const testimonialDate = new Date(date);

      switch (uploadTime) {
        case "This Week":
          const lastWeek = new Date();
          lastWeek.setDate(today.getDate() - 7);
          return testimonialDate >= lastWeek;
        case "This Month":
          return (
            testimonialDate.getMonth() === today.getMonth() &&
            testimonialDate.getFullYear() === today.getFullYear()
          );
        case "Last Six Months":
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(today.getMonth() - 6);
          return testimonialDate >= sixMonthsAgo;
        case "This Year":
          return testimonialDate.getFullYear() === today.getFullYear();
        case "Last Year":
          return testimonialDate.getFullYear() === today.getFullYear() - 1;
        default:
          return true;
      }
    });

  return (
    <div className="testimonials-container">
      <div className="commonbanner-form py-10 items-center flex flex-col">
        <div className="container m-auto relative z-20">
          <h1 className="text-center">Testimonials</h1>
          <div className="webmeida-filter-box p-6 bg-white mt-5">
            <Form {...form}>
              <form className="flex gap-5 testimonial-form-box">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="w-1/3 testimonial-form-row">
                      <FormControl>
                        <Input placeholder="Search" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="webcategory"
                  render={({ field }) => (
                    <FormItem className="w-1/3 testimonial-form-row">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                {/* Upload Time Filter */}
                <FormField
                  control={form.control}
                  name="uploadTime"
                  render={({ field }) => (
                    <FormItem className="w-1/3 testimonial-form-row">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
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
      <div className="container m-auto py-10">
        <div className="testimonial-grid relative">
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
              <Card className="mb-10 testimonial-items" key={index}>
                <CardContent className="p-[25px] flex flex-col items-center">
                  <CommonImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={105}
                    height={105}
                  />
                  <h2 className="text-center font-bold">{testimonial.name}</h2>
                  <p className="text-center">{testimonial.date}</p>
                  <p className="mt-5">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 absolute left-0 w-full">No Testimonial Found</p>
          )}
        </div>
        {visibleCount < filteredTestimonials.length && filteredTestimonials.length > 0 && (
          <div className="w-full loader-btn pb-10 flex justify-center">
            <Button variant="link" onClick={() => setVisibleCount((prev) => prev + 6)}>
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
      </div>
    </div>
  );
};

export default Testimonials;
