import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonImage from "../common/Image";

const FilePreviewModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <CommonImage
          classname="dashboard-icon"
          src="/images/image-gallery01.webp"
          alt="icon01"
          width={25}
          height={25}
        />
      </DialogTrigger>
      <DialogContent className="w-full max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>File Preview</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
          <CommonImage
            classname="dashboard-icon"
            src="/images/image-gallery01.webp"
            alt="icon01"
            width={1080}
            height={1080}
          />
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewModal;
