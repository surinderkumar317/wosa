"use client"; // Now this is a client component
import { notFound, usePathname, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";
import ClassroomHeaderData from "@/components/classroom-dashboard/ClassroomHeaderData";
import PageContent from "@/components/pagecontent/pageContent";
import { Button } from "@/components/ui/button";

const singleEvents = ["classroom-marterial01", "classroom-marterial02"];

export default function SingleEventPage() {
  const pathname = usePathname();
  const router = useRouter(); // ✅ Move this here to avoid conditional hook call

  const singleevent = pathname.split("/").pop()?.toLowerCase();

  if (!singleevent || !singleEvents.includes(singleevent)) {
    return notFound(); // Early return is now safe
  }

  return (
    <>
      <div className="container m-auto py-20 single-classroom-container">
        <div className="flex justify-end w-full mb-6">
          <Button onClick={() => router.push("/student-classrooms")}>
            Back
          </Button>
        </div>
        <Suspense fallback={<Loading />}>
          <LazySection>
            <ClassroomHeaderData />
          </LazySection>
          <LazySection>
            <PageContent />
          </LazySection>
        </Suspense>
      </div>
    </>
  );
}
