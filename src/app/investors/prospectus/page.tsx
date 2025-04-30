import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="investor-container py-24">
      <div className="container m-auto">
        <div className="inverstor-content">
          <h2>Draft Prospectus</h2>
        </div>
        <div className="committee-pdf mt-10">
          <iframe
            src="/images/draft_prospectus.pdf"
            width="100%"
            height="800px"
            style={{ border: "none" }}
            allowFullScreen
          />
          <div className="lg:hidden md:hidden block w-full text-center mt-10">
            <Button asChild>
              <Link href="/images/draft_prospectus.pdf" target="_blank">
                Download PDF
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
