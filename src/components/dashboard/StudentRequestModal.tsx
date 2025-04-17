"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FilePreviewModal from "./FilePreviewModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CommonImage from "../common/Image";

interface StudentConversation {
  id: number;
  requestId: string;
  name: string;
  mobile: number;
  requestStatus: string;
  requestSubject: string;
  requestMessage: string;
  requestCreatedBy: string;
  requestCreatedOn: string;
}

interface replyby {
  nameReply: string;
  date: string;
}

const studentConversations: StudentConversation[] = [
  {
    id: 1,
    requestId: "TWM11NNU",
    name: "Shivam test",
    mobile: +91 - 1987984654,
    requestStatus: "Open",
    requestSubject: "Leave",
    requestMessage: " asdfasdfasdf asfasfasdfsfew qwerwqr",
    requestCreatedBy: "Self",
    requestCreatedOn: "21-03-2025 05:31 PM",
  },
];

const replybys: replyby[] = [
  {
    nameReply: "You",
    date: "24-03-2025 03:59 PM",
  },
];

const conversationSchema = z.object({
  message: z.string().min(5, "Message is required"),
  attachments: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) =>
            allowedFormats.includes(
              file.name.split(".").pop()?.toLowerCase() || ""
            ),
          { message: "Invalid file format" }
        )
    )
    .optional(),
});

const allowedFormats = ["jpg", "png", "jpeg", "pdf", "webp", "mp3", "mp4"];

const StudentRequestModal = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [messageLength, setMessageLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Complaint Form Hook
  const conversationForm = useForm({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      message: "",
      attachments: [], // Correct placement for attachments
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) =>
      allowedFormats.includes(file.name.split(".").pop()?.toLowerCase() || "")
    );

    if (validFiles.length) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      conversationForm.setValue("attachments", [
        ...selectedFiles,
        ...validFiles,
      ]);
    } else {
      alert("Only jpg, png, jpeg, pdf, webp, mp3, and mp4 files are allowed.");
    }

    // Clear input value to allow re-selection of the same file
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    conversationForm.setValue("attachments", updatedFiles);
  };

  const handleConvesationSubmit = async (
    data: z.infer<typeof conversationSchema>
  ) => {
    console.log("Form Data Submitted:", data);
    setMessageLength(0); // Reset message length
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          conversationForm.reset(); // Reset the form when modal closes
          setSelectedFiles([]); // Clear selected files
          setMessageLength(0); // Reset message length
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full max-w-[150px] bg-[#d9070a]">
          <i className="fa-solid fa-bell"></i> Conversations
        </Button>
      </DialogTrigger>
      <DialogContent className="common-modal-form w-full max-w-[1200px]">
        <DialogHeader>
          <DialogTitle className="text-4xl">Conversations</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-auto pr-2 common-scroller">
          {studentConversations.map((request) => (
            <div key={request.id}>
              <div className="flex gap-5 w-full flex-wrap stu-complaint-container">
                <div className="w-full">
                  <h2>
                    Request ID: <strong>{request.requestId}</strong>
                  </h2>
                </div>
                <div className="flex w-full">
                  <div className="w-2/4">
                    <p>
                      Name: <strong>{request.name}</strong>
                    </p>
                  </div>
                  <div className="w-2/4">
                    <p>
                      Mobile: <strong>{request.mobile}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="w-2/4">
                    <p>
                      Request Status:{" "}
                      <strong className="bg-[#d9070a] p-1 px-2 text-white">
                        {request.requestStatus}
                      </strong>
                    </p>
                  </div>
                  <div className="w-2/4">
                    <p>
                      Request Subject: <strong>{request.requestSubject}</strong>
                    </p>
                  </div>
                </div>

                <div className="w-full">
                  <p>
                    Request Message: <strong>{request.requestMessage}</strong>
                  </p>
                </div>
                <div className="w-full">
                  <p>
                    Attachment:{" "}
                    <strong className="flex gap-3 items-center">
                      <FilePreviewModal
                        trigger={
                          <span className="inline-flex gap-2 items-center cursor-pointer">
                            <CommonImage
                              classname="dashboard-icon"
                              src="/images/image-gallery01.webp"
                              alt="icon01"
                              width={25}
                              height={25}
                            />
                            <i className="fa-solid fa-download"></i>
                          </span>
                        }
                        type="image"
                        src="/images/image-gallery01.webp"
                        title="Image Preview"
                      />
                    </strong>
                  </p>
                </div>
                <div className="flex w-full">
                  <div className="w-2/4">
                    <p>
                      Request Created By:{" "}
                      <strong>{request.requestCreatedBy}</strong>
                    </p>
                  </div>
                  <div className="w-2/4">
                    <p>
                      Request Created On:{" "}
                      <strong>{request.requestCreatedOn}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="replyby-container w-full bg-[#f1f1f1] p-3 mt-4">
            {replybys.map((reply, index) => (
              <div key={index} className="flex justify-between w-full">
                <p>Reply by: {reply.nameReply}</p>
                <p>Date: {reply.date}</p>
              </div>
            ))}
            <p className="text-base mt-2">
              Attachment:{" "}
              <strong className="flex gap-3 items-center mt-2">
                <FilePreviewModal
                  trigger={
                    <span className="inline-flex gap-2 items-center cursor-pointer">
                      <CommonImage
                        classname="dashboard-icon"
                        src="/images/image-gallery01.webp"
                        alt="icon01"
                        width={25}
                        height={25}
                      />
                      <i className="fa-solid fa-download"></i>
                    </span>
                  }
                  type="image"
                  src="/images/image-gallery01.webp"
                  title="Image Preview"
                />
              </strong>
            </p>
          </div>

          <Form {...conversationForm}>
            <form
              onSubmit={conversationForm.handleSubmit(handleConvesationSubmit)}
              className="space-y-4 p-0 pt-4 w-full"
            >
              <div className="flex justify-between w-full gap-5 border-t pt-3">
                {/* Message Field */}
                <FormField
                  control={conversationForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <div className="flex justify-between items-center">
                        <Label>
                          Complaint Message
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="message-text">
                          Entered Characters : <span>{messageLength}</span>
                        </div>
                      </div>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="h-24"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setMessageLength(e.target.value.length);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col w-full gap-5">
                {/* File Upload Field */}
                <FormField
                  control={conversationForm.control}
                  name="attachments"
                  render={() => (
                    <FormItem className="form-row w-full file-attachment">
                      <div className="flex justify-between items-center">
                        <Label
                          htmlFor="file-upload"
                          className="flex items-center gap-2"
                        >
                          <Button className="flex gap-4">
                            <i
                              className="fa fa-paperclip"
                              aria-hidden="true"
                            ></i>
                            Add Attachments
                          </Button>
                          <small>
                            (Allowed: jpg, png, jpeg, pdf, webp, mp3, mp4)
                          </small>
                        </Label>
                      </div>
                      <FormControl>
                        <Input
                          type="file"
                          id="file-upload"
                          multiple
                          onChange={handleFileChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Display Attached Files */}
                <div className="mt-3 w-full flex flex-wrap">
                  {selectedFiles.length > 0 ? (
                    selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
                      >
                        <span className="truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ❌
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No attachments added</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="common-button-rows !justify-end flex">
                <Button type="submit" className="">
                  Send <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentRequestModal;
