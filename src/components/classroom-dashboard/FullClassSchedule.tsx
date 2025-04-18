"use client";

import React from "react";
import CommonImage from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

// Define the type for schedule data
interface ScheduleItem {
  topic: string;
  status: string;
  duration: string;
  date: string;
  time: string;
  liveStatus: "red" | "green";
}

const scheduleData: ScheduleItem[] = [
  {
    topic: "CELPIP",
    status: "Online,Offline",
    duration: "15 minutes",
    date: "April 3, 2025 (Thu)",
    time: "15:03",
    liveStatus: "red",
  },
  {
    topic: "CELPIP",
    status: "Online,Offline",
    duration: "15 minutes",
    date: "April 3, 2025 (Thu)",
    time: "15:03",
    liveStatus: "green",
  },
  {
    topic: "CELPIP",
    status: "Online,Offline",
    duration: "15 minutes",
    date: "April 3, 2025 (Thu)",
    time: "15:03",
    liveStatus: "red",
  },
];

const FullClassSchedule: React.FC = () => {
  return (
    <div className="stu-classroom-row-content w-full mb-5">
      <div className="stu-classroom-heading flex justify-between mb-5">
        <h2 className="text-2xl">Full Class Schedule</h2>
        <Button asChild variant="outline">
          <Link href="/student-classrooms/full-class-schedule">View All</Link>
        </Button>
      </div>

      <div className="full-class-row mb-10 flex gap-5 flex-wrap">
        {scheduleData.map((item, index) => (
          <Card key={index} className="w-[32.2%] full-class-room">
            <CardHeader className="hidden">
              <CardTitle />
              <CardDescription />
            </CardHeader>
            <CardContent className="p-5">
              <p className="mb-2">
                <strong>Topic:</strong> {item.topic}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {item.status}
              </p>
              <p className="mb-2">
                <strong>Duration:</strong> {item.duration}
              </p>
              <p className="mb-2">
                <strong>Date:</strong> {item.date}
              </p>
              <p className="mb-2">
                <strong>Time:</strong> {item.time}
              </p>
              <div className="full-class-btn-cont w-full justify-center flex flex-col gap-4 items-center">
                <Button variant="outline">Join Class</Button>
                <p className="flex gap-2 items-center">
                  Status
                  <i
                    className={`fa fa-circle text-${item.liveStatus}-600`}
                    aria-hidden="true"
                  ></i>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="stu-classroom-no-data flex gap-4 items-center justify-start p-2 bg-gray-100 rounded-sm px-5 hidden">
        <CommonImage
          classname={"icon"}
          src={"/dashboard-images/class_schedule.webp"}
          alt={"Schedule"}
          width={42}
          height={42}
        />
        <p className="text-xl">There are no class schedules yet</p>
      </div>
    </div>
  );
};

export default FullClassSchedule;
