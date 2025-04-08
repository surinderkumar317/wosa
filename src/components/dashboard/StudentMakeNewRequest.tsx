"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

const MakeNewRequestSchema = z.object({
  productServices: z.string().min(1, "Product/Services is mandatory"),
  subject: z.string().min(1, "Subject is mandatory"),
  message: z.string().min(5, "Message is mandatory"),
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

const StudentMakeNewRequest = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isMakeRequestOpen, setIsMakeRequestOpen] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  // Complaint Form Hook
  const MakeNewRequestForm = useForm({
    resolver: zodResolver(MakeNewRequestSchema),
    defaultValues: {
      productServices: "",
      subject: "",
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
      MakeNewRequestForm.setValue("attachments", [
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
    MakeNewRequestForm.setValue("attachments", updatedFiles);
  };

  const handleMakeNewRequestSubmit = async (
    data: z.infer<typeof MakeNewRequestSchema>
  ) => {
    console.log("Form Data Submitted:", data);
    setMessageLength(0); // Reset message length
    MakeNewRequestForm.reset();
    setSelectedFiles([]); // Clear selected files
    setIsMakeRequestOpen(false); // Close modal
  };
  

  return (
    <>
      {/* Complaints Dialog */}
      <Dialog open={isMakeRequestOpen} onOpenChange={setIsMakeRequestOpen}>
        <DialogTrigger asChild>
          <Button className="w-full max-w-[150px]">
             Make New Request
          </Button>
        </DialogTrigger>
        <DialogContent className="common-modal-form w-full max-w-xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Make New Request</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...MakeNewRequestForm}>
            <form
              onSubmit={MakeNewRequestForm.handleSubmit(
                handleMakeNewRequestSubmit
              )}
              className="space-y-4 p-0 w-full"
            >
              <div className="flex justify-between w-full gap-5 flex-col">
                {/* Product Servcies */}
                <FormField
                  control={MakeNewRequestForm.control}
                  name="productServices"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>
                        Product/Services<span className="text-red-500">*</span>
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Product/Services" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inhouse Pack">
                              Inhouse Pack
                            </SelectItem>
                            <SelectItem value="Online Pack">
                              Online Pack
                            </SelectItem>
                            <SelectItem value="Practice Pack">
                              Practice Pack
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />

                {/* Subject */}
                <FormField
                  control={MakeNewRequestForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>
                        Select Subject<span className="text-red-500">*</span>
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inhouse Pack">Other</SelectItem>
                            <SelectItem value="Online Pack">
                              Services Issues
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between w-full gap-5">
                {/* Message Field */}
                <FormField
                  control={MakeNewRequestForm.control}
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
                  control={MakeNewRequestForm.control}
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
              <div className="common-button-rows flex !justify-end w-full">
                <Button variant="link" type="submit" className="submit-common">
                  Submit <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentMakeNewRequest;
