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

import { toast } from "sonner";
import { Toaster } from "sonner";

// Country Code Options
const countryOptions = [
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+1", label: "🇺🇸 +1 (USA)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+81", label: "🇯🇵 +81 (Japan)" },
];

// Validation Schemas
const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),
});

const ComplaintSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  source: z.string().min(1, "Please select an option"),
  complaintBranch: z.string().min(1, "Please enter a branch"),
  productServices: z.string().min(1, "Product/Services is mandatory"),
  subject: z.string().min(1, "Subject is mandatory"),
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

const verificationSchema = z.object({
  verificationCode: z
    .string()
    .length(4, "Code must be 4 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

const allowedFormats = ["jpg", "png", "jpeg", "pdf", "webp", "mp3", "mp4"];

interface ComplaintsProps {
  buttonText?: string;
}

type ComplaintData = {
  name: string;
  email: string;
  source: string;
  complaintBranch: string;
  productServices: string;
  subject: string;
  message: string;
  attachments?: File[]; // match form type
};

const Complaints: React.FC<ComplaintsProps> = ({
  buttonText = "Complaint",
}) => {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [messageLength, setMessageLength] = useState(0);
  const [resendTimer, setResendTimer] = useState(30);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [isVarificationOpen, setIsVarificationOpen] = useState(false);
  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false);
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    uniqueId: "",
    password: "",
  });

  const [complaintData, setcomplaintData] = useState<ComplaintData | null>(
    null
  );

  // Phone Form Hook
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: "+91",
      phoneNumber: "",
    },
  });

  // Complaint Form Hook
  const complaintForm = useForm({
    resolver: zodResolver(ComplaintSchema),
    defaultValues: {
      name: "",
      email: "",
      source: "",
      complaintBranch: "",
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
      complaintForm.setValue("attachments", [...selectedFiles, ...validFiles]);
    } else {
      alert("Only jpg, png, jpeg, pdf, webp, mp3, and mp4 files are allowed.");
    }

    // Clear input value to allow re-selection of the same file
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    complaintForm.setValue("attachments", updatedFiles);
  };

  // Handle Phone Form Submission
  const handlePhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    console.log("Phone Data:", data);
    setSubmittedPhoneNumber(`${data.countryCode} ${data.phoneNumber}`); // Store phone number
    setIsPhoneOpen(false);
    setIsComplaintOpen(true);
  };

  const handleComplaintSubmit = async (
    data: z.infer<typeof ComplaintSchema>
  ) => {
    console.log("Form Data Submitted:", data);
    toast.success("Complaint successful! 🎉");
    setMessageLength(0); // Reset message length
    complaintForm.reset();

    // Store form data before moving to the next step
    setcomplaintData(data);

    setIsComplaintOpen(false);
    setIsVarificationOpen(true);

    // Simulate an API response with generated details
    const generatedUserDetails = {
      name: data.name,
      uniqueId: "UID123456",
      password: "Pass@123",
    };
    setUserDetails(generatedUserDetails);
  };

  useEffect(() => {
    if (isComplaintOpen && complaintData) {
      complaintForm.reset(complaintData); // ✅ Restore values when reopening
    }
  }, [isComplaintOpen]);

  const verifyForm = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: { verificationCode: "" },
  });

  // Handle Verification Submission
  const handleVarifySubmit = async (data: { verificationCode: string }) => {
    console.log("Verification Code Submitted:", data.verificationCode);
    setIsVarificationOpen(false);
    setIsFormInfoOpen(true); // Open the final dialog
  };

  useEffect(() => {
    let timer: NodeJS.Timeout; // Explicitly define the timer type

    if (isVarificationOpen && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup on unmount
  }, [isVarificationOpen, resendTimer]);

  const handleResendCode = () => {
    setResendTimer(30); // Reset countdown
    console.log("Resending verification code...");
  };

  const handleCloseModals = () => {
    setIsVarificationOpen(false);
    setIsFormInfoOpen(false);
    phoneForm.reset(); // Reset phone form when closing any modal
  };

  return (
    <>
      {/* Phone Number Dialog */}
      <Toaster position="bottom-center" />
      <Dialog open={isPhoneOpen} onOpenChange={setIsPhoneOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={() => setIsPhoneOpen(true)}>
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>Complaints</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
              className="space-y-4 p-4 w-full"
            >
              {/* Country Code & Phone Number */}
              <FormField
                control={phoneForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="form-row">
                    <Label>
                      Phone Number<span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <div className="flex space-x-2">
                        {/* Country Code Select */}
                        <Select
                          onValueChange={(value) => {
                            setSelectedCountry(value);
                            phoneForm.setValue("countryCode", value);
                          }}
                          value={selectedCountry}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {countryOptions.map((country) => (
                                <SelectItem
                                  key={country.value}
                                  value={country.value}
                                >
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {/* Phone Number Input */}
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          {...field}
                          className="flex-1"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          minLength={10}
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            field.onChange(value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="common-error-msg" />
                  </FormItem>
                )}
              />
              {/* Next Button */}
              <div className="common-button-rows registration-justify-end">
                <Button
                  type="submit"
                  variant="link"
                  className="p-0 submit-common"
                >
                  Next <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Complaints Dialog */}
      <Dialog open={isComplaintOpen} onOpenChange={setIsComplaintOpen}>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>Complaints</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...complaintForm}>
            <form
              onSubmit={complaintForm.handleSubmit(handleComplaintSubmit)}
              className="space-y-4 p-0 w-full"
            >
              <div className="max-h-[65vh] overflow-auto pr-2">
                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Name Field */}
                  <FormField
                    control={complaintForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Name<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                  {/* Email Field */}
                  <FormField
                    control={complaintForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Email<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* How did you hear Field */}
                  <FormField
                    control={complaintForm.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          How did you hear about us?
                          <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="internet">Internet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                  {/* Complaint Field */}
                  <FormField
                    control={complaintForm.control}
                    name="complaintBranch"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Complaint For<span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ambala">Ambala</SelectItem>
                            <SelectItem value="Amritsar">Amritsar</SelectItem>
                            <SelectItem value="Chandigarh">
                              Chandigarh
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Product Servcies */}
                  <FormField
                    control={complaintForm.control}
                    name="productServices"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Product/Services
                          <span className="text-red-500">*</span>
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
                    control={complaintForm.control}
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
                              <SelectItem value="Inhouse Pack">
                                Other
                              </SelectItem>
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

                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Message Field */}
                  <FormField
                    control={complaintForm.control}
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

                <div className="flex flex-col w-full gap-5 mb-5">
                  {/* File Upload Field */}
                  <FormField
                    control={complaintForm.control}
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
              </div>
              {/* Submit Button */}
              <div className="common-button-rows">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsComplaintOpen(false);
                    setIsPhoneOpen(true);
                  }}
                  className="back-btn"
                >
                  <i className="fa fa-angle-left" aria-hidden="true"></i> Back
                </Button>
                <Button variant="link" type="submit" className="submit-common">
                  Submit <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog open={isVarificationOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>Verification</DialogTitle>
            <DialogDescription>
              A verification code has been sent to your mobile{" "}
              <span>{submittedPhoneNumber}</span>. Please enter the code below.
            </DialogDescription>
          </DialogHeader>
          <Form {...verifyForm}>
            <form
              onSubmit={verifyForm.handleSubmit(handleVarifySubmit)}
              className="flex gap-4 flex-col"
            >
              <div className="flex items-end gap-5">
                <FormField
                  control={verifyForm.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>Enter Verification Code</Label>
                      <FormControl>
                        <Input type="text" maxLength={4} {...field} />
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
                {/* Resend Code Section */}
                <div className="flex justify-between items-center relative -inset-1">
                  <Button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendTimer > 0} // Disable while countdown is active
                    className="resend-btn"
                  >
                    {resendTimer > 0
                      ? `Resend Code in ${resendTimer}s`
                      : "Resend Code"}
                  </Button>
                </div>
              </div>
              <div className="common-button-rows clear-both">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsVarificationOpen(false);
                    setIsComplaintOpen(true);
                  }}
                  className="back-btn"
                >
                  <i className="fa fa-angle-left" aria-hidden="true"></i> Back
                </Button>
                <Button variant="link" type="submit" className="submit-common">
                  Submit <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* User Info Dialog */}
      <Dialog open={isFormInfoOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <p>
            Dear <span>{userDetails.name}</span>,
          </p>
          <p>
            Your complaint has been submitted successfully. Here are your
            details:
          </p>
          <p>
            Unique ID: <span>{userDetails.uniqueId}</span>
          </p>
          <p>
            Password: <span>{userDetails.password}</span>
          </p>
          <p>Your Password and Other details are send to your email.</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Complaints;
