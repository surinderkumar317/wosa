"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface ShareholdingContent {
  pageTitle: string;
  sectionTitle: string;
  description: string;
  pdfSrc: string;
}

const shareholdingContent: ShareholdingContent = {
  pageTitle: "Shareholding Pattern",
  sectionTitle: "Shareholding Pattern of our Company",
  description:
    "The table below presents the current shareholding pattern of our Company as per Regulation 31 of SEBI LODR Regulations as on the date of this Draft Prospectus:",
  pdfSrc: "/images/draft_prospectus.pdf",
};

const Page: React.FC = () => {
  return (
    <div className="investor-container shareholder-container py-24">
      <div className="container m-auto">
        <div className="inverstor-content">
          <h2>{shareholdingContent.pageTitle}</h2>
        </div>
        <div className="committee-pdf mt-10">
          <h2 className="font-bold text-xl">
            {shareholdingContent.sectionTitle}
          </h2>
          <p className="mb-6">{shareholdingContent.description}</p>
          <div className="committee-pdf mt-10">
            <iframe
              src={shareholdingContent.pdfSrc}
              width="100%"
              height="800px"
              style={{ border: "none" }}
              allowFullScreen
            />
            <div className="lg:hidden md:hidden block w-full text-center mt-10">
               <Button asChild>
                  <Link href="/images/draft_prospectus.pdf" target="_blank">Download PDF</Link>
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
