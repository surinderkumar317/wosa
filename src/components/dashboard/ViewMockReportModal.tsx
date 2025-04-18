import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Score {
  title: string;
  score: number;
}

interface Explanation {
  title: string;
  description: string;
  additionalInfo?: string;
}

const scores: Score[] = [
  { title: "Overall", score: 88 },
  { title: "Listening", score: 88 },
  { title: "Reading", score: 88 },
  { title: "Writing", score: 88 },
  { title: "Speaking", score: 88 },
];

const explanations: Explanation[] = [
  {
    title: "Overall: 8",
    description:
      "Has fully operational command of the language with only occasional unsystematic inaccuracies and inappropriacies. Misunderstandings may occur in unfamiliar situations. Handles complex detailed argumentation well.",
  },
  {
    title: "LISTENING: 8",
    description:
      "Test takers at this level are expected to get an acceptable score under exam conditions. Though, some institutions may have various criteria of acceptable scores.",
    additionalInfo:
      "Continue to develop your vocabulary by reading widely. Listen to as much English as you can so that your understanding becomes more automatic. Listen to longer recordings such as interviews and films, with and without English subtitles, pausing and repeating the recording when necessary. Note the words you didn’t understand immediately, so you can review them. Try to understand those times when the speakers don’t directly say what they mean. What are the clues you use to understand these in your own language? Use the same strategy to understand them in English.",
  },
];

const ViewMockReportModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="w-40 !block justify-center m-auto absolute bottom-5 left-0 right-0"
      >
        <Button>View Report</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1024px] mocktestreport-modal">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 mock-test-container">
          {/* Score Section */}
          <div className="w-2/4 mocktest-box">
            <h1 className="text-[30px] font-bold mb-5">Mock Test Report</h1>
            <h2 className="text-[25px] font-bold">Score</h2>
            <div className="mockReportrow flex flex-col gap-1">
              {scores.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <p className="font-bold text-[15px]">{item.title}</p>
                  <p>{item.score}</p>
                </div>
              ))}
            </div>
            <div className="report-button-cont flex w-full justify-center mt-10">
              <Button variant="outline">Download Report</Button>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="w-2/4 mocktest-box">
            <h1 className="text-[30px] font-bold mb-5">Score Explanation</h1>
            <ScrollArea className="h-[330px] w-full rounded-md p-0 mocktext-scroll">
              {explanations.map((item, index) => (
                <div key={index} className="w-full flex flex-col mt-5">
                  <h2 className="text-[25px] font-bold">{item.title}</h2>
                  <p>{item.description}</p>
                  {item.additionalInfo && <p>{item.additionalInfo}</p>}
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMockReportModal;
