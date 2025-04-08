import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AnnouncementsMarquee = () => {
  return (
    <div className="stu-classroom-header bg-yellow-100 p-4 flex justify-center items-center gap-5 rounded-xl text-black mb-6 announcement-marquee-container">
      <Dialog>
        <DialogTrigger className="text-2xl annoucement-marquee-text"><strong>Rakhi 50% off</strong> <span className="text-red-600">2nd April 2025 3:07 PM</span></DialogTrigger>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription className="!my-6 text-black">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementsMarquee;
