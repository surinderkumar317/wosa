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
        </div>
      </div>
    </div>
  );
};

export default page;
