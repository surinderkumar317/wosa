import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const TimeZone = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">Timezone</Button>
        </DialogTrigger>
        <DialogContent className="common-modal-content w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Timezone</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimeZone;
