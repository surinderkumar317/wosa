"use client";  
import React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading";
import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});
const PageContent = dynamic(() => import("@/components/pagecontent/pageContent"), {
  loading: () => <Loading />,
});

const coursesList = ["pte", "toefl", "ielts"];

export default function AcademyCoursePage() {
  const pathname = usePathname();
  //console.log("Current Pathname:", pathname); // Debugging log

  const course = decodeURIComponent(pathname.split("/").pop() || "").toLowerCase();
  //console.log("Extracted Course:", course); // Debugging log

  if (!course || !coursesList.includes(course)) {
    return notFound();
  }

  return (
    <>
      {/* High Priority: Loads first */}
      <FormSlider
        heading={`Course: ${course.toUpperCase()}`}
        paragraph={`Learn more about ${course.toUpperCase()} with Western Overseas.`}
        modalType="Enquiry"
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <PageContent />
        </LazySection>
      </Suspense>
    </>
  );
}
