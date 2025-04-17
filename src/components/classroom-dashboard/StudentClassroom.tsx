import React from "react";
import CommonImage from "../common/Image";
import ClassroomHeaderData from "./ClassroomHeaderData";
import { Button } from "../ui/button";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnnouncementsMarquee from "./AnnouncementsMarquee";
import FullClassSchedule from "./FullClassSchedule";
import RecordedLactures from "./RecordedLactures";
import ClassroomMaterial from "./ClassroomMaterial";

const StudentClassroom = () => {
  return (
    <div className="stu-classroom-cont flex flex-col w-full">
      <ClassroomHeaderData />
      <AnnouncementsMarquee />
      <div className="stu-classroom-content w-full">
        <FullClassSchedule/>
        <RecordedLactures/>       
        <ClassroomMaterial/>        
      </div>
    </div>
  );
};

export default StudentClassroom;
