import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface EventBooking {
  id: number;
  title: string;
  language: string;
  bookingDate: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
}

const eventBookings: EventBooking[] = [
  {
    id: 1,
    title: "Test Event fresh/resale",
    language: "French",
    bookingDate: "10-Mar-25",
    eventDate: "102",
    startTime: "01:00 AM",
    endTime: "02:00 AM",
    location: "Online",
    status: "Success",
  },
  {
    id: 2,
    title: "Test Event fresh/resale",
    language: "French",
    bookingDate: "10-Mar-25",
    eventDate: "102",
    startTime: "01:00 AM",
    endTime: "02:00 AM",
    location: "Online",
    status: "Success",
  },
  {
    id: 3,
    title: "Test Event fresh/resale",
    language: "French",
    bookingDate: "10-Mar-25",
    eventDate: "102",
    startTime: "01:00 AM",
    endTime: "02:00 AM",
    location: "Online",
    status: "Success",
  },
];

const EventsBookings: React.FC = () => {
  return (
    <div className="event-booking-cont">
      <div className="dash-header flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events Bookings</h2>
      </div>

      <div className="mock-card-container mt-5 flex flex-wrap gap-3">
        {eventBookings.map((event) => (
          <Card key={event.id} className="w-[32.6%] min-h-[250px] relative event-booking">
            <CardHeader className="pb-2">
              <CardTitle>{event.title}</CardTitle>
              <h2 className="font-bold">{event.language}</h2>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Booking Date:</strong> {event.bookingDate}</p>
              <p><strong>Events Date:</strong> {event.eventDate}</p>
              <p><strong>Time:</strong> <span>{event.startTime}</span> TO <span>{event.endTime}</span></p>
              <p><strong>Location:</strong> {event.location}</p>
              <div className="w-full flex justify-center flex-col mt-5">
                <Button className="m-auto w-full max-w-[100px]">Expired</Button>
                <p className="text-center mt-4">
                  <strong>Status:</strong> <span className="text-green-600">{event.status}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsBookings;