import React from "react";
import ClassroomHeaderData from "./ClassroomHeaderData";
import AnnouncementsMarquee from "./AnnouncementsMarquee";
import FullClassSchedule from "./FullClassSchedule";
import RecordedLactures from "./RecordedLactures";
import ClassroomMaterial from "./ClassroomMaterial";

const StudentClassroom: React.FC = () => {
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
