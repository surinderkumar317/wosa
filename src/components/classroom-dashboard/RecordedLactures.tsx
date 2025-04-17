"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import CommonImage from "../common/Image";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import FilePreviewModal from "../dashboard/FilePreviewModal";

// Mock Data with video links
const recordedLectures = [
  {
    id: 1,
    topic: "CELPIP Strategy Session",
    date: "April 3, 2025",
    thumbnail: "/dashboard-images/recorded_lecture.webp",
    videoUrl: "/images/ocean.mp4",
  },
  {
    id: 2,
    topic: "IELTS Writing Tips",
    date: "April 5, 2025",
    thumbnail: "/dashboard-images/recorded_lecture.webp",
    videoUrl: "/images/ocean.mp4",
  },
  {
    id: 3,
    topic: "Grammar Essentials",
    date: "April 7, 2025",
    thumbnail: "/dashboard-images/recorded_lecture.webp",
    videoUrl: "/images/ocean.mp4",
  },
];

const RecordedLactures = () => {
  return (
    <div className="stu-classroom-row-content w-full mb-5">
      <div className="stu-classroom-heading flex justify-between mb-5">
        <h2 className="text-2xl">Recorded Lectures</h2>
        <Button asChild variant="outline">
          <Link href="/student-classrooms/recorded-lactures">View All</Link>
        </Button>
      </div>

      <div className="full-class-row mb-10 flex gap-5 flex-wrap">
        {recordedLectures.map((lecture) => (
          <FilePreviewModal
            key={lecture.id}
            trigger={
              <Card className="w-[32.2%] recorded-box cursor-pointer hover:shadow-md transition">
                <CardHeader className="hidden" />
                <CardContent className="p-5 flex gap-5 items-center">
                  <div className="classroom-material-img">
                    <CommonImage
                      classname="icon"
                      src={lecture.thumbnail}
                      alt="Recorded Lecture"
                      width={72}
                      height={62}
                    />
                  </div>
                  <div className="classroom-material-text">
                    <h3>
                      <strong>Topic:</strong> {lecture.topic}
                    </h3>
                    <p>
                      <strong>Date:- </strong> {lecture.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            }
            type="video"
            src={lecture.videoUrl}
            title={lecture.topic}
          />
        ))}
      </div>

      {recordedLectures.length === 0 && (
        <div className="stu-classroom-no-data flex gap-4 items-center justify-start p-2 bg-gray-100 rounded-sm px-5">
          <CommonImage
            classname="icon"
            src="/dashboard-images/recorded_lecture.webp"
            alt="Recorded Lecture"
            width={42}
            height={42}
          />
          <p className="text-xl">There are no classroom recorded lectures yet</p>
        </div>
      )}
    </div>
  );
};

export default RecordedLactures;
