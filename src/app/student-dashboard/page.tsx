"use client";
import React from 'react'
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

const DashboardStudent = dynamic(() => import("@/components/dashboard/DashboardStudent"), {
  loading: () => <Loading />,
});

const UserProfile = dynamic(() => import("@/components/dashboard/UserProfile"), {
  loading: () => <Loading />,
});

const page = () => {

  return (
    <div className="dashboard-section py-20">
      <div className="container m-auto flex gap-8 dashboard-inner-section">
        <div className="w-1/6 user-left-section rounded-sm">
           <UserProfile/>
        </div>
        <div className="w-5/6 user-right-section">
            <DashboardStudent />
        </div>
      </div>
    </div>
  );
};

export default page;
