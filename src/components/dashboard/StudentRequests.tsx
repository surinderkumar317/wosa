import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StudentRequestModal from "./StudentRequestModal";
import StudentMakeNewRequest from "./StudentMakeNewRequest";

interface StudentRequest {
  id: number;
  title: string;
  subject: string;
  servies: string;
  status: string;
  creatdon: string;
}

const studentRequests: StudentRequest[] = [
  {
    id: 1,
    title: "TWM11NNU",
    subject: "Leave",
    servies: "Online Pack",
    status: "Open",
    creatdon: "21-03-2025 05:31 PM",
  },
  {
    id: 2,
    title: "Test Event fresh/resale",
    subject: "Adjustment",
    servies: "Inhouse Pack",
    status: "Open",
    creatdon: "11-03-2025 02:45 PM",
  },
];

const StudentRequest: React.FC = () => {
  return (
    <div className="student-request-cont">
      <div className="dash-header flex justify-between items-center">
        <h2 className="text-2xl font-bold">Student Requests</h2>
        <div className="make-new-request"><StudentMakeNewRequest/></div>
      </div>

      <div className="mock-card-container mt-5 flex flex-wrap gap-3">
        {studentRequests.map((request) => (
          <Card key={request.id} className="w-[49%] min-h-[250px] relative mocktest-box">
            <CardHeader className="pb-2">
              <CardTitle>Request ID: {request.title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Subject:</strong> {request.subject}</p>
              <p><strong>Product/Services:</strong> {request.servies}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Created On:</strong> {request.creatdon}</p>
              <div className="w-full flex justify-start flex-col mt-5">
                <StudentRequestModal/>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentRequest;