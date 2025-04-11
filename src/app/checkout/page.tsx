import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const checkoutDetails = [
  { label: "Course:", value: "CELPIP | Online | 60 Days - General" },
  { label: "Branch:", value: "ONLINE" },
  { label: "Module(s):", value: "SPEAKING,WRITING,READING,LISTENING" },
  {
    label: "Course Type(s):",
    value: "Day Course,Evening Course,Morning Course",
  },
  { label: "Batch:", value: "BASIC" },
  { label: "Program:", value: "General" },
  {
    label: "Valid From - Valid Till:",
    value: "17-04-2025 - 15-06-2025 (60 Days)",
  },
];

const paymentDetails = [
  { type: "title", label: "Payment For" },
  { label: "Package Subscription", breakdown: "", total: "INR 11441" },
  { type: "title", label: "Tax Applied" },
  { label: "SGST @ 9.00%", breakdown: "INR 1029.69", total: "" },
  { label: "CGST @ 9.00%", breakdown: "INR 1029.69", total: "" },
  {
    label: "Total Tax Applied",
    breakdown: "",
    total: "INR 2059.38",
    bold: true,
  },
  {
    label: "Total Amount To Be Paid Including Tax",
    breakdown: "",
    total: "INR 13500.38",
    bold: true,
    bg: true,
  },
];

const page = () => {
  return (
    <div className="checkout-section py-10 bg-[#e8f0fe]">
      <div className="container m-auto flex gap-5">
        <div className="w-3/4 bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-2xl font-bold">Checkout Details</h2>
          <div className="checkout-container flex flex-col mt-5">
            {checkoutDetails.map((item, index) => (
              <div
                key={index}
                className="checkout-row w-full flex gap-5 border-b py-3"
              >
                <div className="w-2/4">
                  <p>{item.label}</p>
                </div>
                <div className="w-2/4">
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-paymentdetails-cont mt-10">
            <div className="payment-detail-header flex justify-between gap-5 items-center">
              <h2 className="text-2xl font-bold">Payment Details</h2>
              <div className="payment-detail-button-cont flex gap-5 items-center">
                <div className="blance-cont p-2 px-3 bg-amber-100">
                  Available INR 21.00
                </div>
                <Button>Apply Wallet</Button>
              </div>
            </div>

            <Table className="border mt-10">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold text-black w">
                    Particulars
                  </TableHead>
                  <TableHead className="font-bold text-black text-right">
                    Breakdown
                  </TableHead>
                  <TableHead className="font-bold text-black text-right">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentDetails.map((item, index) => {
                  const isTitle = item.type === "title";
                  const rowClasses = `${item.bg ? "bg-gray-100" : ""}`;
                  const cellClass = item.bold ? "font-bold" : "";

                  return (
                    <TableRow key={index} className={rowClasses}>
                      <TableCell className={cellClass}>
                        {isTitle ? <strong>{item.label}</strong> : item.label}
                      </TableCell>
                      <TableCell className="text-right border-r">
                        {item.breakdown}
                      </TableCell>
                      <TableCell className={`text-right ${cellClass}`}>
                        {item.total}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="checkout-checkbox-cont mt-5 flex justify-between">
            <div className="checkbox-checkout flex gap-3 items-center">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="">
                I have read and agree to the terms and conditions
              </label>
            </div>
            <Button className="bg-[#d72a23]">Make Payment</Button>
          </div>
        </div>
        <div className="w-1/4 bg-white shadow-lg rounded-lg p-5 checkout-right-side">
          <h2 className="text-2xl font-bold">Checkout T&C</h2>
          <ScrollArea className="h-[800px] w-full pr-5 checkout-scroll-area">
            <p>
              Please read this document as this shall form a part of the
              contract between the Test Taker & Western Overseas Study Abroad
              Ltd. It is important that you make sure that you have read and
              understood all the Terms & Conditions to confirm that you accept
              these when you submit the registration form. The terms and
              conditions apply regardless of changes made to the event schedule
              or as originally stated on the Application form, subject to the
              organisation giving reasonable notice of such changes wherever
              possible.
            </p>
            <p>
              By using our website and booking the seat for the particular
              event, you are deemed to have agreed to the Terms and Conditions
              and our Privacy Policy, which is herein incorporated by reference.
            </p>
            <p>
              The terms and conditions contain essential information, including
              details of:
            </p>
            <ul>
              <li>Privacy policy and use of cookies</li>
              <li>Terms on the use of the event website</li>
              <li>Accessibility and information on how to make a complaint</li>
            </ul>
            <h2 className="text-1xl font-bold my-4">POLICIES</h2>
            <ul>
              <li>
                It is hereby understood that the fee paid for any academic
                course is NON Refundable & NON Transferable under any
                circumstances.
              </li>
              <li>
                There will be NO provision for Holding or Extending classes.
              </li>
              <li>
                The validity of your coaching package is contingent upon your
                residency in the country specified at the time of enrollment.
              </li>
              <li>
                If you change your country of residence during the validity
                period of your coaching package, the package becomes invalid,
                and no refunds or credits will be provided.
              </li>
              <li>
                Do not share the login credentials with anyone, in case any
                breach is found we will be forced to stop your services and your
                fee amount will not be refunded.
              </li>
            </ul>
            <h2 className="text-1xl font-bold my-4">PRIVACY POLICY</h2>
            <p>
              We recognize the importance of the privacy of personal information
              and consider the lawful and correct conduct of personal
              information is important to our successful operations, along with
              the safeguarding of confidence of those with whom we deal.
            </p>

            <p>
              Our website makes use of cookies to provide you with a good
              experience when you browse our website and also allows us to
              improve our site. The cookies also help to tell between you from
              other users of our website without storing any personally
              identifiable information about you.
            </p>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default page;
