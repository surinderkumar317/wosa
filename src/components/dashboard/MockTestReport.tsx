import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ViewMockReportModal from "./ViewMockReportModal";

interface MockTest {
  id: number;
  title: string;
  reportDate: string;
  examDate: string;
  hasModal?: boolean;
}

const mockTests: MockTest[] = [
  { id: 1, title: "CD-IELTS - Academic", reportDate: "11-Mar-25", examDate: "11-Mar-25", hasModal: true },
  { id: 2, title: "CD-IELTS - Academic", reportDate: "11-Mar-25", examDate: "11-Mar-25" },
  { id: 3, title: "CD-IELTS - Academic", reportDate: "11-Mar-25", examDate: "11-Mar-25" },
];

const MockTestReport: React.FC = () => {
  return (
    <div className="mock-test-report-cont">
      <div className="dash-header flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mock Test Reports</h2>
      </div>

      <div className="mock-card-container mt-5 flex flex-wrap gap-3">
        {mockTests.map((test) => (
          <Card key={test.id} className="w-[32.6%] min-h-[250px] relative">
            <CardHeader className="pb-2">
              <CardTitle>{test.title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Report Date:</strong> {test.reportDate}</p>
              <p><strong>Exam Date:</strong> {test.examDate}</p>
              {test.hasModal && <ViewMockReportModal />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MockTestReport;
