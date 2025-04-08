"use client"
import React, { useState } from "react";
import Link from "next/link";
import CommonImage from "../common/Image";
import { Button } from "../ui/button";
import WalletInfoModal from "./WalletInfoModal";
import SwitchClassroom from "./SwitchClassroom";

const SidebarMenu = () => {
  const [open, setOpen] = useState(false);
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
    <div className="sidebar-navigation">
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
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/discount-icn.webp"
                alt="icon02"
                width={25}
                height={25}
              />
              My Discount Code
            </Link>
          </Button>
        </li>
        <li>
          <WalletInfoModal open={open} setOpen={setOpen} />
        </li>        
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard/orders">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/order-icn.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              My Orders
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
            <Link href="/student-dashboard">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/Practic_Portal.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              Practice Portal
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard/mock_test_reports">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/mock-test-report-icn.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              Mock Test Reports
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard/reality_test_bookings">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/reality-test-booking-icn.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              Reality Test Bookings
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard/exam_bookings">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/exam-booking-icn.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              Exam Bookings
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard/event_bookings">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/event-booking-icn.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              Event Bookings
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard/student_requests">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/student-request-icn.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              Student Requests
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold">
            <Link href="/student-dashboard/complaints">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/my-complaints-icn.webp"
                alt="icon04"
                width={25}
                height={25}
              />
              My Complaints
            </Link>
          </Button>
        </li>
      </ul>

      {/* Show the SwitchClassroom Modal only when isSwitchClassroomOpen is true */}
      <SwitchClassroom open={isSwitchClassroomOpen} onClose={handleSwitchClassroomClose} />
    </div>
  );
};

export default SidebarMenu;
