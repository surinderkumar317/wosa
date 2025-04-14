"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

import React, { useState, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CommonImage from "@/components/common/Image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface EventItem {
  id: number;
  src: string;
  title: string;
  venue: string; // Now this is used as eventType
  date: string;
  time: string;
  price: string;
  link: string;
}

const Slider = dynamic(() => import("@/components/SliderFull"), {
  loading: () => <Loading />,
});

const eventItems: EventItem[] = [
  {
    id: 1,
    src: "/images/Reality-Test.webp",
    title: "Event",
    venue: "Online", // Now this acts as the eventType
    date: "Feb 28, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/events/educationfair",
  },
  {
    id: 2,
    src: "/images/Reality-Test.webp",
    title: "Event",
    venue: "Inhouse", // Now this acts as the eventType
    date: "Feb 08, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/",
  },
  {
    id: 3,
    src: "/images/Reality-Test.webp",
    title: "Event",
    venue: "Online", // Now this acts as the eventType
    date: "Feb 21, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/",
  },
  {
    id: 4,
    src: "/images/Reality-Test.webp",
    title: "Event",
    venue: "Inhouse", // Now this acts as the eventType
    date: "Feb 27, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/",
  },
  {
    id: 5,
    src: "/images/Reality-Test.webp",
    title: "Event",
    venue: "Inhouse", // Now this acts as the eventType
    date: "Feb 27, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/",
  },
];

// Format date to "MMM dd, yyyy"
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const formSchema = z.object({
  search: z.string().optional(),
  eventType: z.string().optional(), // Now this refers to venue
  date: z.date().optional(),
});

const Events: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(8);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      eventType: "", // Venue will be stored here
      date: undefined,
    },
  });

  const { watch, setValue } = form;
  const searchQuery = watch("search");
  const selectedEventType = watch("eventType"); // Now holds venue name
  const selectedDate = watch("date");

  // Extract unique venues for dropdown
  const uniqueVenues = Array.from(
    new Set(eventItems.map((event) => event.venue))
  );

  // Filtering events based on input
  const filteredEvents = useMemo(() => {
    return eventItems.filter((event) => {
      const searchMatch =
        event.title.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
        event.venue.toLowerCase().includes(searchQuery?.toLowerCase() || "");

      const eventTypeMatch = selectedEventType
        ? event.venue === selectedEventType
        : true;

      const dateMatch = selectedDate
        ? formatDate(selectedDate) === event.date
        : true;

      return searchMatch && eventTypeMatch && dateMatch;
    });
  }, [searchQuery, selectedEventType, selectedDate]);

  return (
      <div className="event-container">
        {/* High Priority: Loads first */}
        <Slider />

        <Suspense fallback={<Loading />}>
          <LazySection>
            <div className="container m-auto my-10">
              <div className="form-container p-10">
                <h1>Upcoming Events</h1>
                <div className="form-holder">
                  <div className="webmeida-filter-box p-6 mt-5">
                    <Form {...form}>
                      <form className="flex gap-5">
                        {/* Search Input */}
                        <FormField
                          control={form.control}
                          name="search"
                          render={({ field }) => (
                            <FormItem className="w-1/3">
                              <FormControl>
                                <Input
                                  placeholder="Search by Title or Venue"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Venue (Event Type) Select */}
                        <FormField
                          control={form.control}
                          name="eventType"
                          render={({ field }) => (
                            <FormItem className="w-1/3">
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    setValue("eventType", value)
                                  }
                                  value={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Venue" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {uniqueVenues.map((venue) => (
                                      <SelectItem key={venue} value={venue}>
                                        {venue}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Date Picker */}
                        <Controller
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="w-1/3">
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-between text-left font-normal"
                                    >
                                      {field.value
                                        ? formatDate(field.value)
                                        : "Pick a date"}
                                      <CalendarIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      //initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
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
              </div>

              {/* Events Listing */}
              <div className="courses-box-container flex flex-wrap gap-4 mt-10 justify-center">
                {filteredEvents.length > 0 ? (
                  filteredEvents.slice(0, visibleItems).map((eventItem) => (
                    <Card
                      key={eventItem.id}
                      className="courses-box w-[23%] p-4 rounded-xl border bg-card shadow"
                    >
                      <CardContent className="webmedia-box p-0">
                        <Link href={eventItem.link} className="no-underline">
                          <div className="course-img">
                            <CommonImage
                              src={eventItem.src}
                              alt={eventItem.title}
                              width={500}
                              height={500}
                              classname="cursor-pointer w-full"
                            />
                          </div>
                          <div className="courses-heading text-center">
                            <h2>{eventItem.title}</h2>
                          </div>
                          <div className="courses-list">
                            <ul className="my-5">
                              <li>
                                <h2>
                                  <i className="fa-solid fa-location-dot"></i>{" "}
                                  {eventItem.venue}
                                </h2>
                              </li>
                              <li>
                                <p>
                                  <i className="fa-solid fa-calendar-days"></i>{" "}
                                  {eventItem.date}
                                </p>
                              </li>
                              <li>
                                <p>
                                  <i className="fa-regular fa-clock"></i>{" "}
                                  {eventItem.time}
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="courses-btn-box flex justify-between items-center">
                            <p>{eventItem.price}</p>
                            <Button>Book Now</Button>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10 w-full">
                    <p className="text-gray-500 text-lg font-semibold">
                      No Events Found
                    </p>
                  </div>
                )}
              </div>
              {visibleItems < filteredEvents.length && (
                <div className="w-full loader-btn py-6 flex justify-center">
                  <Button onClick={() => setVisibleItems((prev) => prev + 8)}>
                    Load More
                  </Button>
                </div>
              )}
            </div>
          </LazySection>
        </Suspense>
      </div>
  );
};

export default Events;
