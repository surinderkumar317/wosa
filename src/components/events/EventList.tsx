import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import CommonImage from "../common/Image";

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

const eventItems: EventItem[] = [
  {
    id: 1,
    src: "/images/Reality-Test.webp",
    title: "Event",
    venue: "Online",
    date: "Feb 28, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/",
  },
  {
    id: 2,
    src: "/images/Reality-Test.webp",
    title: "Event",
    venue: "Inhouse",
    date: "Feb 08, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/",
  },
  {
    id: 3,
    src: "/images/Reality-Test.webp",
    title: "Event",
    venue: "Online",
    date: "Feb 21, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/",
  },
];

const EventList = () => {
  return (
    <div className="event-list py-5">
      {/* Events Listing */}
      <div className="courses-box-container event-box-container flex gap-4 mt-10">
        {eventItems.map((eventItem) => (
          <Link
            key={eventItem.id}
            href={eventItem.link}
            className="no-underline w-1/3 event-box"
          >
            <Card className="courses-box w-full p-4 rounded-xl border bg-card shadow">
              <CardContent className="webmedia-box p-0">
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
                        <i className="fa-regular fa-clock"></i> {eventItem.time}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="courses-btn-box flex justify-between items-center">
                  <p>{eventItem.price}</p>
                  <Button>Book Now</Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button className="event-button flex justify-center mb-12" asChild>
          <Link href="/events">
            View All{" "}
            <CommonImage
              classname={"arrow"}
              src={"/images/our-services-arrow.webp"}
              alt={"arrow"}
              width={43}
              height={12}
            />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventList;
