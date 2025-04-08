"use client";
import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

const SidebarMenu = dynamic(() => import("@/components/dashboard/SidebarMenu"), {
  loading: () => <Loading />,
});

const StudentComplaints = dynamic(() => import("@/components/dashboard/StudentComplaints"), {
  loading: () => <Loading />,
});

const page = () => {
  return (
    <div className="dashboard-section py-20">
      <div className="container m-auto flex gap-8">
        <div className="w-1/6 user-left-section rounded-sm p-5">
          <SidebarMenu />
        </div>
        <div className="w-5/6">
            <StudentComplaints />
        </div>
      </div>
    </div>
  );
};

export default page;
