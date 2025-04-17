import React from "react";
import CommonImage from "../common/Image";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data array for classroom materials
const materials = [
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy",
    date: "April 3, 2025",
    href: "/student-classrooms/classroom-material/classroom-marterial01",
    image: "/dashboard-images/classroom_material.webp",
  },
  {
    id: 2,
    title: "Lorem Ipsum is simply dummy",
    date: "April 3, 2025",
    href: "/student-classrooms/classroom-material/classroom-marterial01",
    image: "/dashboard-images/classroom_material.webp",
  },
  {
    id: 3,
    title: "Lorem Ipsum is simply dummy",
    date: "April 3, 2025",
    href: "/student-classrooms/classroom-material/classroom-marterial02",
    image: "/dashboard-images/classroom_material.webp",
  },
];

const ClassroomMaterial = () => {
  return (
    <div className="stu-classroom-row-content w-full mb-5">
      <div className="stu-classroom-heading flex justify-between mb-5">
        <h2 className="text-2xl">Classroom Material</h2>
        <Button asChild variant="outline">
          <Link href="/student-classrooms/classroom-material">View All</Link>
        </Button>
      </div>

      <div className="full-class-row mb-10 flex gap-5 flex-wrap">
        {materials.map((material) => (
          <Link
            key={material.id}
            href={material.href}
            className="w-[32.2%] classroom-matrial hover:shadow-md transition"
          >
            <Card>
              <CardHeader className="hidden">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex gap-5 items-center">
                <div className="classroom-material-img">
                  <CommonImage
                    classname="icon"
                    src={material.image}
                    alt="Recorded Lecture"
                    width={42}
                    height={42}
                  />
                </div>
                <div className="classroom-material-text">
                  <h3>{material.title}</h3>
                  <p>
                    <strong>Date:- </strong>
                    {material.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Hidden no data section */}
      {materials.length === 0 && (
        <div className="stu-classroom-no-data flex gap-4 items-center justify-start p-2 bg-gray-100 rounded-sm px-5 hidden">
          <CommonImage
            classname="icon"
            src="/dashboard-images/classroom_material.webp"
            alt="Classroom Material"
            width={42}
            height={42}
          />
          <p className="text-xl">There are no classroom material yet</p>
        </div>
      )}
    </div>
  );
};

export default ClassroomMaterial;
