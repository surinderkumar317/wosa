import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Complaints from "../auth/ComplaintModal";
import StudentComlaintModal from "./StudentComplaintsModal";

interface StudentComplaint {
  id: number;
  title: string;
  subject: string;
  servies: string;
  status: string;
  creatdon: string;
}

const complaintStudent: StudentComplaint[] = [
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

const StudentComplaints: React.FC = () => {
  return (
    <div className="student-request-cont">
      <div className="dash-header flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Complaints</h2>
        <div className="make-new-request"><Complaints buttonText="New Complaint Register" /></div>
      </div>

      <div className="mock-card-container mt-5 flex flex-wrap gap-3">
        {complaintStudent.map((studentComplaint) => (
          <Card key={studentComplaint.id} className="w-[49%] min-h-[250px] relative mocktest-box">
            <CardHeader className="pb-2">
              <CardTitle>Complaint ID: {studentComplaint.title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Subject:</strong> {studentComplaint.subject}</p>
              <p><strong>Product/Services:</strong> {studentComplaint.servies}</p>
              <p><strong>Status:</strong> {studentComplaint.status}</p>
              <p><strong>Created On:</strong> {studentComplaint.creatdon}</p>
              <div className="w-full flex justify-start flex-col mt-5">
                <StudentComlaintModal/>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentComplaints;