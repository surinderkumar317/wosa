"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

const page = () => {
  return (
    <div className="investor-container py-24">
      <div className="container m-auto">
        <div className="inverstor-content">
          <h2>Shareholding Pattern</h2>
        </div>
        <div className="committee-pdf mt-10">
          <h2 className="font-bold text-xl">
            Shareholding Pattern of our Company
          </h2>
          <p className="mb-6">
            The table below presents the current shareholding pattern of our
            Company as per Regulation 31 of SEBI LODR Regulations as on the date
            of this Draft Prospectus:
          </p>
          <div className="committee-pdf mt-10">
            <iframe
              src="/images/draft_prospectus.pdf"
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

export default page;
