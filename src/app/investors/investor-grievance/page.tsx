"use client";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="investor-container py-24">
      <div className="container m-auto">
        <div className="inverstor-content">
          <h2>Investor Grievances</h2>
        </div>
        <div className="committee-pdf mt-10">
          <p className="mb-3"><strong>Name of the Contact Person:</strong> Ms. Shruti Gupta</p>
          <p className="mb-3"><strong>Designation:</strong> Company Secretary and Compliance Officer</p>
          <p className="mb-3"><strong>Tel No:</strong> <Link href="tel:+91171-3500064">+ 91- 171-3500064</Link></p>
          <p className="mb-3"><strong>Email:</strong> <Link href="mailto:info@western-overseas.com">info@western-overseas.com</Link></p>
          <p className="mb-3"><strong>Website:</strong> <Link target="_blank" href="https://western-overseas.com">www.western-overseas.com</Link></p>
        </div>
      </div>
    </div>
  );
};

export default page;
