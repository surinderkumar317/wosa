"use client"; // Required because usePathname() is a client-side hook

import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});
const ContantTabs = dynamic(() => import("@/components/content-tab/ContentTabs"), {
    loading: () => <Loading />,
});
const OurOffices = dynamic(() => import("@/components/OurOffices"), {
  loading: () => <Loading />,
});

const branches = ["ambala", "chandigarh", "amritsar", "bathinda"]; // Define valid branches

export default function BranchPage() {
  const pathname = usePathname(); // Get the current URL path
  const pathSegments = pathname.split("/"); // Split the URL into segments
  const branchName = pathSegments[2]; // Extract branch name from `/branches/[branch]`

  // If the branch is not valid, show 404
  if (!branches.includes(branchName.toLowerCase())) {
    return notFound();
  }

  return (
    <div className="branches-section">
      {/* High Priority: Loads first */}
      <FormSlider        
        heading={`Branch ${branchName .toUpperCase()}`}
        paragraph={
          "If you have a question or need assistance with Visa and immigration services, please feel free to ask, our experts at Western Overseas will provide you with the best information & support"
        }
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <ContantTabs />
        </LazySection>
        <LazySection>
          <OurOffices />
        </LazySection>
      </Suspense>
    </div>
  );
}
