"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommonImage from "../common/Image";
import Link from "next/link";
import WalletInfoModal from "./WalletInfoModal";
import SwitchClassroom from "./SwitchClassroom";
import WalletBox from "./WalletBox";

const DashboardStudent: React.FC = () => {
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
    <div className="dashboard-main-cont flex gap-5 flex-col">
      <h1>User Dashboard</h1>
      <div className="dashboard-grid flex flex-wrap gap-5">
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="#">
            <Card className="p-5 bg-sky-50">
              <CardHeader className="p-0">
                <CardTitle>My Discount Code</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>Coming Soon</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/discount-icn.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes" onClick={() => setOpen(true)}>
          <Link href="#">
             <WalletBox/>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="/student-dashboard/orders">
            <Card className="p-5 bg-yellow-50">
              <CardHeader className="p-0">
                <CardTitle>My Orders</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>0 Available</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/order-icn.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="w-[32.2%] dashboard-boxes" onClick={handleSwitchClassroomOpen}>
          <Link href="#">
            <Card className="p-5">
              <CardHeader className="p-0">
                <CardTitle>Switch Classroom</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>0 Active</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/Switch_Classroom.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="#">
            <Card className="p-5">
              <CardHeader className="p-0">
                <CardTitle>Practice Portal</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>Not Available</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/Practic_Portal.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="/student-dashboard/mock_test_reports">
            <Card className="p-5">
              <CardHeader className="p-0">
                <CardTitle>Mock Test Reports</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>0 Report Available</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/mock-test-report-icn.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="/student-dashboard/reality_test_bookings">
            <Card className="p-5">
              <CardHeader className="p-0">
                <CardTitle>Reality Test Bookings</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>0 Available</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/reality-test-booking-icn.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="/student-dashboard/exam_bookings">
            <Card className="p-5">
              <CardHeader className="p-0">
                <CardTitle>Exam Bookings</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>0</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/exam-booking-icn.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="/student-dashboard/event_bookings">
            <Card className="p-5">
              <CardHeader className="p-0">
                <CardTitle>Event Bookings</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>0 Upcoming</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/event-booking-icn.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="/student-dashboard/student_requests">
            <Card className="p-5">
              <CardHeader className="p-0">
                <CardTitle>Student Requests</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>0 Active</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/student-request-icn.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-[32.2%] dashboard-boxes">
          <Link href="/student-dashboard/complaints">
            <Card className="p-5">
              <CardHeader className="p-0">
                <CardTitle>My Complaints</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-0 d-card-content">
                <p>0 Active</p>
                <div className="dash-icon">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/my-complaints-icn.webp"}
                    alt={"Profile Image"}
                    width={42}
                    height={42}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Show WalletInfoModal only when open is true */}
      {open && <WalletInfoModal open={open} setOpen={setOpen} />}

      {/* Show the SwitchClassroom Modal only when isSwitchClassroomOpen is true */}
      <SwitchClassroom  open={isSwitchClassroomOpen} onClose={handleSwitchClassroomClose} />
    </div>
  );
};

export default DashboardStudent;
