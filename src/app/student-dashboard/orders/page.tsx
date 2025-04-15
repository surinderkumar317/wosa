"use client";
import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

const OrderHistory = dynamic(() => import("@/components/dashboard/OrderHistory"), {
  loading: () => <Loading />,
});

const SidebarMenu = dynamic(() => import("@/components/dashboard/SidebarMenu"), {
  loading: () => <Loading />,
});



const page = () => {
  return (
    <div className="dashboard-section py-20">
      <div className="container m-auto flex gap-8 dashboard-inner-section">
        <div className="w-1/6 user-left-section rounded-sm p-5">
          <SidebarMenu />
        </div>
        <div className="w-5/6 user-right-section">
          <OrderHistory/>
        </div>
      </div>
    </div>
  );
};

export default page;
