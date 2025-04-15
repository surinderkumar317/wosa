"use client";
import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

const ClassroomSidebarMenu = dynamic(() => import("@/components/classroom-dashboard/ClassroomSidebarMenu"), {
  loading: () => <Loading />,
});

const Announcements = dynamic(() => import("@/components/classroom-dashboard/Announcements"), {
  loading: () => <Loading />,
});

const page = () => {

  return (
    <div className="dashboard-section py-20">
      <div className="container m-auto flex gap-8 dashboard-inner-section">
        <div className="w-1/6 user-left-section rounded-sm">
           <ClassroomSidebarMenu/>
        </div>
        <div className="w-5/6 user-right-section">
           <Announcements/>
        </div>
      </div>
    </div>
  );
};

export default page;
