"use client";
import React from "react";

const shareholdingContent = {
  pageTitle: "Shareholding Pattern",
  sectionTitle: "Shareholding Pattern of our Company",
  description:
    "The table below presents the current shareholding pattern of our Company as per Regulation 31 of SEBI LODR Regulations as on the date of this Draft Prospectus:",
  pdfSrc: "/images/draft_prospectus.pdf",
};

const Page = () => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
