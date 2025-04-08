import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExamBooking {
  id: number;
  title: string;
  bookingDate: string;
  examDate: string;
  time: string;
  location: string;
  status: string;
}

const examBookings: ExamBooking[] = [
  {
    id: 1,
    title: "PTE - Academic",
    bookingDate: "10-Mar-25",
    examDate: "1-Mar-25",
    time: "10:30 AM",
    location:"208 Elante Mall Chandigarh",
    status: "Awaiting Result",
  },
  {
    id: 2,
    title: "PTE - Academic",
    bookingDate: "10-Mar-25",
    examDate: "1-Mar-25",
    time: "10:30 AM",
    location:"208 Elante Mall Chandigarh",
    status: "Awaiting Result",
  },
  {
    id: 3,
    title: "PTE - Academic",
    bookingDate: "10-Mar-25",
    examDate: "1-Mar-25",
    time: "10:30 AM",
    location:"208 Elante Mall Chandigarh",
    status: "Awaiting Result",
  },
];

const ExamBookings: React.FC = () => {
  return (
    <div className="realitytestbooking-cont">
      <div className="dash-header flex justify-between items-center">
        <h2 className="text-2xl font-bold">Exam Bookings</h2>
      </div>

      <div className="mock-card-container mt-5 flex flex-wrap gap-3">
        {examBookings.map((booking) => (
          <Card key={booking.id} className="w-[32.6%] min-h-[250px] relative">
            <CardHeader className="pb-2">
              <CardTitle>{booking.title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
              <p><strong>Exam Date:</strong> {booking.examDate}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p>
                <strong>Status:</strong> 
                <span className="text-sky-700 font-bold"> {booking.status}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamBookings;
