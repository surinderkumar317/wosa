"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CommonImage from "./common/Image";
import { Button } from "./ui/button";

export default function MarketingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-1">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <CommonImage
              classname={"icon"}
              src={"/images/marketing-popup.webp"}
              alt={"Marketing Image"}
              width={740}
              height={407}
            />
          </DialogDescription>
        </DialogHeader> 
        <h1 className="px-4 !pt-0 text-2xl text-center font-bold">Biggest Edu And Immigration Fair</h1> 
        <p className="text-center px-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
        <div className="marketing-btn flex justify-center pb-5"> 
            <Button>Free Entry Pass</Button>
        </div>   
      </DialogContent> 
    </Dialog>
  );
}
