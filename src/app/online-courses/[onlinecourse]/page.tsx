"use client"; // Now this is a client component
import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";

const FormBanner = dynamic(() => import("@/components/coaching/FormBanner"), {
  loading: () => <Loading />,
});
const PageContent = dynamic(
  () => import("@/components/pagecontent/pageContent"),
  {
    loading: () => <Loading />,
  }
);

const singleOnlineCourse = [
  "duolingo-60-days",
];

export default function SinleOnlineCourse() {
  const pathname = usePathname();
  const singleonline = pathname.split("/").pop()?.toLowerCase(); // Extract the last part of the pathname

  if (!singleonline || !singleOnlineCourse .includes(singleonline)) {
    return notFound();
  }

  return (
    <>
      <FormBanner
        heading={`CELPIP | 60 DAYS | AMBALA`}
        paragraph={'Terms and conditions are mentioned below.'}
        modalType="course"
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <PageContent />
        </LazySection>       
      </Suspense>
    </>
  );
}
