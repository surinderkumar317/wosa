import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RealityTest {
  id: number;
  title: string;
  bookingDate: string;
  candidateNumber: number;
  examDate: string;
  time: string;
  location: string;
  status: string;
}

const realityTests: RealityTest[] = [
  {
    id: 1,
    title: "IELTS - Academic",
    bookingDate: "10-Mar-25",
    candidateNumber: 102,
    examDate: "1-Mar-25",
    time: "10:30 AM",
    location:
      "S-2 Level, Block-E, International Trade Tower, Nehru Place, New Delhi - 110019, Delhi, Delhi, India-110019",
    status: "Awaiting Result",
  },
  {
    id: 2,
    title: "IELTS - Academic",
    bookingDate: "10-Mar-25",
    candidateNumber: 102,
    examDate: "1-Mar-25",
    time: "10:30 AM",
    location:
      "S-2 Level, Block-E, International Trade Tower, Nehru Place, New Delhi - 110019, Delhi, Delhi, India-110019",
    status: "Awaiting Result",
  },
  {
    id: 3,
    title: "IELTS - Academic",
    bookingDate: "10-Mar-25",
    candidateNumber: 102,
    examDate: "1-Mar-25",
    time: "10:30 AM",
    location:
      "S-2 Level, Block-E, International Trade Tower, Nehru Place, New Delhi - 110019, Delhi, Delhi, India-110019",
    status: "Awaiting Result",
  },
];

const RealityTestBookings: React.FC = () => {
  return (
    <div className="realitytestbooking-cont">
      <div className="dash-header flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reality Test Bookings</h2>
      </div>

      <div className="mock-card-container mt-5 flex flex-wrap gap-3">
        {realityTests.map((test) => (
          <Card key={test.id} className="w-[32.6%] min-h-[250px] relative reality-box">
            <CardHeader className="pb-2">
              <CardTitle>{test.title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Booking Date:</strong> {test.bookingDate}</p>
              <p><strong>Candidate Number:</strong> {test.candidateNumber}</p>
              <p><strong>Exam Date:</strong> {test.examDate}</p>
              <p><strong>Time:</strong> {test.time}</p>
              <p><strong>Location:</strong> {test.location}</p>
              <p>
                <strong>Status:</strong> 
                <span className="text-sky-700 font-bold"> {test.status}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RealityTestBookings;
