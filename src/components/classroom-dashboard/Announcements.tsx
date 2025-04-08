"use client";
import React from "react";
import ClassroomHeaderData from "./ClassroomHeaderData";
import CommonImage from "../common/Image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Announcements = () => {
  return (
    <div className="stu-classroom-cont flex flex-col w-full">
      <ClassroomHeaderData />

      <div className="stu-classroom-content w-full">
        <div className="stu-classroom-row-content w-full mb-5">
          <h2 className="text-2xl mb-5">Announcements</h2>

          <div className="annoucement-accord">
            <Accordion type="single" collapsible className="mb-3">
              <AccordionItem value="item-1">
                <AccordionTrigger className="announcement-accordion justify-between gap-5 bg-gray-100 p-2">
                  <p className="p-0 flex gap-3 items-center text-[18px]">
                    <strong className="bg-yellow-300 p-3">
                      02/04/2025 03:07 PM
                    </strong>
                    <span>Rakhi 50% off</span>
                  </p>
                </AccordionTrigger>
                <AccordionContent className="p-5">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="mb-3">
              <AccordionItem value="item-1">
                <AccordionTrigger className="announcement-accordion justify-between gap-5 bg-gray-100 p-2">
                  <p className="p-0 flex gap-3 items-center text-[18px]">
                    <strong className="bg-yellow-300 p-3">
                      02/04/2025 03:07 PM
                    </strong>
                    <span>Dewali 50% off</span>
                  </p>
                </AccordionTrigger>
                <AccordionContent className="p-5">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="no-image flex w-full justify-center hidden">
            <CommonImage
              classname={"icon"}
              src={"/dashboard-images/no-data-found.webp"}
              alt={"No Data Found"}
              width={300}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
