"use client"
import React, { useState } from "react";
import Link from "next/link";
import CommonImage from "../common/Image";
import { Button } from "../ui/button";
import SwitchClassroom from "@/components/dashboard/SwitchClassroom";

const ClassroomSidebarMenu = () => {  
  const [isSwitchClassroomOpen, setIsSwitchClassroomOpen] = useState(false);

   // Function to open SwitchClassroom modal
   const handleSwitchClassroomOpen = () => {
    setIsSwitchClassroomOpen(true);
  };

  // Function to close SwitchClassroom modal
  const handleSwitchClassroomClose = () => {
    setIsSwitchClassroomOpen(false);
  };

  return (
    <div className="sidebar-navigation p-5">
      <ul className="flex flex-col gap-2">
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/Dashboard.webp"
                alt="icon01"
                width={25}
                height={25}
              />
              Dashboard
            </Link>
          </Button>
        </li>           
        <li>
        {/* Button to trigger SwitchClassroom Modal */}
          <Button 
            variant="outline" 
            className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full" 
            onClick={handleSwitchClassroomOpen}
          >
            <CommonImage
              classname="dashboard-icon"
              src="/dashboard-images/Switch_Classroom.webp"
              alt="Switch Classroom"
              width={25}
              height={25}
            />
            Switch Classroom
          </Button>
        </li>
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-classrooms/announcements">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/Practic_Portal.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              Announcements
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-classrooms/studentservices">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/mock-test-report-icn.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              Student Services
            </Link>
          </Button>
        </li>
      </ul>

      {/* Show the SwitchClassroom Modal only when isSwitchClassroomOpen is true */}
      <SwitchClassroom open={isSwitchClassroomOpen} onClose={handleSwitchClassroomClose} />
    </div>
  );
};

export default ClassroomSidebarMenu;
