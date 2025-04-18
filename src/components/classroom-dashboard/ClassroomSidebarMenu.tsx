"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommonImage from "../common/Image";
import { Button } from "../ui/button";

const ClassroomSidebarMenu: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="sidebar-navigation p-5">
      <ul className="flex flex-col gap-2">
        <li className={isActive("/student-dashboard") ? "active" : ""}>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full">
            <Link href="/student-dashboard">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/Dashboard.webp"
                alt="Dashboard"
                width={25}
                height={25}
              />
              Dashboard
            </Link>
          </Button>
        </li>        

        <li className={isActive("/student-classrooms") ? "active" : ""}>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full">
            <Link href="/student-classrooms">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/Switch_Classroom.webp"
                alt="My Classroom"
                width={25}
                height={25}
              />
              My Classroom
            </Link>
          </Button>
        </li>

        <li className={isActive("/student-classrooms/full-class-schedule") ? "active" : ""}>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full">
            <Link href="/student-classrooms/full-class-schedule">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/class_schedule.webp"
                alt="Full Class Schedule"
                width={25}
                height={25}
              />
              Full Class Schedule
            </Link>
          </Button>
        </li>

        <li className={isActive("/student-classrooms/recorded-lactures") ? "active" : ""}>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full">
            <Link href="/student-classrooms/recorded-lactures">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/recorded_lecture.webp"
                alt="Recorded Lectures"
                width={25}
                height={25}
              />
              Recorded Lectures
            </Link>
          </Button>
        </li>

        <li className={isActive("/student-classrooms/classroom-material") ? "active" : ""}>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full">
            <Link href="/student-classrooms/classroom-material">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/classroom_material.webp"
                alt="Classroom Material"
                width={25}
                height={25}
              />
              Classroom Material
            </Link>
          </Button>
        </li>

        <li className={isActive("/student-classrooms/announcements") ? "active" : ""}>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full">
            <Link href="/student-classrooms/announcements">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/Practic_Portal.webp"
                alt="Announcements"
                width={25}
                height={25}
              />
              Announcements
            </Link>
          </Button>
        </li>

        <li className={isActive("/student-classrooms/studentservices") ? "active" : ""}>
          <Button asChild variant="outline" className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full">
            <Link href="/student-classrooms/studentservices">
              <CommonImage
                classname="dashboard-icon"
                src="/dashboard-images/mock-test-report-icn.webp"
                alt="Student Services"
                width={25}
                height={25}
              />
              Student Services
            </Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ClassroomSidebarMenu;
