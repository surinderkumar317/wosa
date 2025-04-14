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

const StudentClassroom = () => {
  return (
    <div className="stu-classroom-cont flex flex-col w-full">
      <ClassroomHeaderData />

      <AnnouncementsMarquee />
      <div className="stu-classroom-content w-full">
        <div className="stu-classroom-row-content w-full mb-5">
          <div className="stu-classroom-heading flex justify-between mb-5">
            <h2 className="text-2xl">Full Class Schedule</h2>
            <Button asChild variant="outline">
              <Link href="/student-classrooms/full-class-schedule">
                View All
              </Link>
            </Button>
          </div>
          <div className="full-class-row mb-10 flex gap-5 flex-wrap">
            <Card className="w-[32.2%] full-class-room">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <p className="mb-2">
                  <strong> Topic: </strong>CELPIP
                </p>
                <p className="mb-2">
                  <strong> Status: </strong>Online,Offline
                </p>
                <p className="mb-2">
                  <strong>Duration: </strong>15 minutes
                </p>
                <p className="mb-2">
                  <strong>Date:- </strong>April 3, 2025 (Thu)
                </p>
                <p className="mb-2">
                  <strong>Time: </strong>15:03
                </p>

                <div className="full-class-btn-cont w-full justify-center flex flex-col gap-4 items-center">
                  <Button variant="outline">Join Class</Button>
                  <p>
                    Status{" "}
                    <i
                      className="fa fa-circle text-red-600"
                      aria-hidden="true"
                    ></i>
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[32.2%] full-class-room">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <p className="mb-2">
                  <strong> Topic: </strong>CELPIP
                </p>
                <p className="mb-2">
                  <strong> Status: </strong>Online,Offline
                </p>
                <p className="mb-2">
                  <strong>Duration: </strong>15 minutes
                </p>
                <p className="mb-2">
                  <strong>Date:- </strong>April 3, 2025 (Thu)
                </p>
                <p className="mb-2">
                  <strong>Time: </strong>15:03
                </p>

                <div className="full-class-btn-cont w-full justify-center flex flex-col gap-4 items-center">
                  <Button variant="outline">Join Class</Button>
                  <p>
                    Status{" "}
                    <i
                      className="fa fa-circle text-green-600"
                      aria-hidden="true"
                    ></i>
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[32.2%] full-class-room">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <p className="mb-2">
                  <strong> Topic: </strong>CELPIP
                </p>
                <p className="mb-2">
                  <strong> Status: </strong>Online,Offline
                </p>
                <p className="mb-2">
                  <strong>Duration: </strong>15 minutes
                </p>
                <p className="mb-2">
                  <strong>Date:- </strong>April 3, 2025 (Thu)
                </p>
                <p className="mb-2">
                  <strong>Time: </strong>15:03
                </p>

                <div className="full-class-btn-cont w-full justify-center flex flex-col gap-4 items-center">
                  <Button variant="outline">Join Class</Button>
                  <p>
                    Status{" "}
                    <i
                      className="fa fa-circle text-red-600"
                      aria-hidden="true"
                    ></i>
                  </p>
                </div>
              </CardContent>
            </Card>
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

        <div className="stu-classroom-row-content w-full mb-5">
          <div className="stu-classroom-heading flex justify-between mb-5">
            <h2 className="text-2xl">Recorded Lectures</h2>
            <Button asChild variant="outline">
              <Link href="/">View All</Link>
            </Button>
          </div>

          <div className="full-class-row mb-10 flex gap-5 flex-wrap">
            <Card className="w-[32.2%] recorded-box">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex gap-5 items-center">
                <div className="classroom-material-img">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/recorded_lecture.webp"}
                    alt={"Recorded Lecture"}
                    width={72}
                    height={62}
                  />
                </div>
                <div className="classroom-material-text">
                  <h3><strong>Topic:</strong> Lorem Ipsum is simply dummy</h3>
                  <p>
                    <strong>Date:- </strong>April 3, 2025
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="w-[32.2%] recorded-box">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex gap-5 items-center">
                <div className="classroom-material-img">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/recorded_lecture.webp"}
                    alt={"Recorded Lecture"}
                    width={72}
                    height={62}
                  />
                </div>
                <div className="classroom-material-text">
                  <h3><strong>Topic:</strong> Lorem Ipsum is simply dummy</h3>
                  <p>
                    <strong>Date:- </strong>April 3, 2025
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="w-[32.2%] recorded-box">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex gap-5 items-center">
                <div className="classroom-material-img">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/recorded_lecture.webp"}
                    alt={"Recorded Lecture"}
                    width={72}
                    height={62}
                  />
                </div>
                <div className="classroom-material-text">
                  <h3><strong>Topic:</strong> Lorem Ipsum is simply dummy</h3>
                  <p>
                    <strong>Date:- </strong>April 3, 2025
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="stu-classroom-no-data flex gap-4 items-center justify-start p-2 bg-gray-100 rounded-sm px-5 hidden">
            <CommonImage
              classname={"icon"}
              src={"/dashboard-images/recorded_lecture.webp"}
              alt={"Recorded Lecture"}
              width={42}
              height={42}
            />
            <p className="text-xl">
              There are no classroom recorded lectures yet
            </p>
          </div>
        </div>

        <div className="stu-classroom-row-content w-full mb-5">
          <div className="stu-classroom-heading flex justify-between mb-5">
            <h2 className="text-2xl">Classroom Material</h2>
            <Button asChild variant="outline">
              <Link href="/">View All</Link>
            </Button>
          </div>

          <div className="full-class-row mb-10 flex gap-5 flex-wrap">
            <Card className="w-[32.2%] classroom-matrial">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex gap-5 items-center">
                <div className="classroom-material-img">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/classroom_material.webp"}
                    alt={"Recorded Lecture"}
                    width={42}
                    height={42}
                  />
                </div>
                <div className="classroom-material-text">
                  <h3>Lorem Ipsum is simply dummy</h3>
                  <p>
                    <strong>Date:- </strong>April 3, 2025
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="w-[32.2%] classroom-matrial">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex gap-5 items-center">
                <div className="classroom-material-img">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/classroom_material.webp"}
                    alt={"Recorded Lecture"}
                    width={42}
                    height={42}
                  />
                </div>
                <div className="classroom-material-text">
                  <h3>Lorem Ipsum is simply dummy</h3>
                  <p>
                    <strong>Date:- </strong>April 3, 2025
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="w-[32.2%] classroom-matrial">
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex gap-5 items-center">
                <div className="classroom-material-img">
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/classroom_material.webp"}
                    alt={"Recorded Lecture"}
                    width={42}
                    height={42}
                  />
                </div>
                <div className="classroom-material-text">
                  <h3>Lorem Ipsum is simply dummy</h3>
                  <p>
                    <strong>Date:- </strong>April 3, 2025
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="stu-classroom-no-data flex gap-4 items-center justify-start p-2 bg-gray-100 rounded-sm px-5 hidden">
            <CommonImage
              classname={"icon"}
              src={"/dashboard-images/classroom_material.webp"}
              alt={"Classroom Material"}
              width={42}
              height={42}
            />
            <p className="text-xl">There are no classroom material yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassroom;
