"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PhoneCountryCodeSelect from "@/components/PhoneCountrySelect/PhoneCountrycodeSelect";
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
import StarRating from "../StarRating";

// Country Code Options
// const countryOptions = [
//   { value: "+91", label: "+91 - IN", searchable: "india" },
//   { value: "+1", label: "+1 - U", searchable: "usa" },
//   { value: "+44", label: "+44 - GB", searchable: "uk" },
//   { value: "+61", label: "+61 - AU", searchable: "australia" },
//   { value: "+81", label: "+81 - JP", searchable: "japan" },
// ];

// Validation Schemas
const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),
});

// Validation Schemas
const feedbackTypeSchema = z
  .object({
    feedbackType: z.enum(["phone", "branch"]),
    countryCode: z.string().default("+91"),
    phoneNumber: z.string().optional(),
    branch: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.feedbackType === "phone") {
      if (!data.phoneNumber || data.phoneNumber.trim().length !== 10) {
        ctx.addIssue({
          path: ["phoneNumber"],
          code: z.ZodIssueCode.custom,
          message: "Phone Number must be 10 digits",
        });
      }
    }

    if (data.feedbackType === "branch") {
      if (!data.branch || data.branch.trim() === "") {
        ctx.addIssue({
          path: ["branch"],
          code: z.ZodIssueCode.custom,
          message: "Please select a branch",
        });
      }
    }
  });

const FeedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email format"),
  source: z.string().min(1, "Please select an option"),
  feedbackBranch: z.string().min(1, "Please enter a branch"),
  productServices: z.string().min(1, "Product/Services is mandatory"),
  subject: z.string().min(1, "Subject is mandatory"),
  message: z.string().min(5, "Message is required"),
  rating: z.number().min(1, "Please select a rating"), // Ensure a rating is chosen
});

const verificationSchema = z.object({
  verificationCode: z
    .string()
    .length(4, "Code must be 4 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

type FeedbackData = {
  name: string;
  lastname?: string;
  email: string;
  source: string;
  feedbackBranch: string;
  productServices: string;
  subject: string;
  message: string;
  rating: number; // Default value
};

const Feedback: React.FC = () => {
  const [selectedFeedbackType, setSelectedFeedbackType] = useState("phone");
  const [selectedBranch, setSelectedBranch] = useState("");

  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  //const [selectedCountry, setSelectedCountry] = useState("+91");
  const [messageLength, setMessageLength] = useState(0);
  const [resendTimer, setResendTimer] = useState(30);

  const [isVarificationOpen, setIsVarificationOpen] = useState(false);
  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false);
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    uniqueId: "",
    password: "",
  });

  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);

  const [searchTerm] = useState("");

  // Place the filter here, inside your component
  // const filteredOptions = countryOptions.filter((country) =>
  //   country.searchable.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // feedback Type Hook
  const feedbacktypeForm = useForm({
    resolver: zodResolver(feedbackTypeSchema),
    defaultValues: {
      feedbackType: "phone", // ✅ Correct feedback type default
      branch: "", // ✅ Branch added with a default empty string
      countryCode: "+91",
      phoneNumber: "",
    },
  });

  // Phone Form Hook
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: "+91",
      phoneNumber: "",
    },
  });

  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    setSelectedCountry({ value: "+91", label: "+91 - IN" });
  }, []);

  // Complaint Form Hook
  const feedbackForm = useForm({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      source: "",
      feedbackBranch: "",
      productServices: "",
      subject: "",
      message: "",
      rating: 0, // Default value
    },
  });

  // Handle Phone Form Submission
  const handlePhoneSubmit = (data: z.infer<typeof feedbackTypeSchema>) => {
    console.log("Phone Data:", data);
    setSubmittedPhoneNumber(`${data.countryCode} ${data.phoneNumber}`); // Store phone number
    setIsPhoneOpen(false);
    setIsFeedbackOpen(true);
  };

  const handleFeedbackSubmit = async (data: z.infer<typeof FeedbackSchema>) => {
    console.log("Form Data Submitted:", data);
    toast.success("Feedback successful! 🎉");
    setMessageLength(0); // Reset message length
    setIsFeedbackOpen(false);
    feedbackForm.reset();

    // Store form data before moving to the next step
    setFeedbackData(data);

    setIsFeedbackOpen(false);
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
    if (isFeedbackOpen && feedbackData) {
      feedbackForm.reset(feedbackData); // ✅ Restore values when reopening
    }
  }, [isFeedbackOpen]);

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
    feedbacktypeForm.reset(); // Reset phone form when closing any modal
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus(); // Re-focus after dropdown opens
    }, 50); // Small delay ensures it's mounted

    return () => clearTimeout(timer);
  }, [searchTerm]); // Optional: focus each time dropdown resets

  return (
    <>
      {/* Phone Number Dialog */}
      <Toaster position="bottom-center" />
      <Dialog
        open={isPhoneOpen}
        onOpenChange={(isOpen) => {
          setIsPhoneOpen(isOpen);
          if (!isOpen) {
            feedbacktypeForm.reset();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={() => setIsPhoneOpen(true)}>
            Feedback
          </Button>
        </DialogTrigger>
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
          </DialogHeader>
          <Form {...feedbacktypeForm}>
            <form
              onSubmit={feedbacktypeForm.handleSubmit(handlePhoneSubmit)}
              className="space-y-4 p-4 w-full"
            >
              {/* Feedback Type Selection */}
              <FormField
                control={feedbacktypeForm.control}
                name="feedbackType" // ✅ Correct usage
                render={({ field }) => (
                  <FormItem className="form-row">
                    <Label>
                      Feedback Type<span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setSelectedFeedbackType(value);
                          field.onChange(value);
                        }}
                        value={selectedFeedbackType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Feedback Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="phone">
                              Internal Feedback
                            </SelectItem>
                            <SelectItem value="branch">
                              Google Feedback
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="common-error-msg" />
                  </FormItem>
                )}
              />

              {/* Phone Number Field (Only if Internal Feedback is selected) */}
              {selectedFeedbackType === "phone" && (
                <FormField
                  control={feedbacktypeForm.control}
                  name="phoneNumber" // ✅ Correct field name
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <FormItem className="form-row">
                      <Label>
                        Phone Number<span className="text-red-500">*</span>
                      </Label>
                      <FormControl>
                        <div className="flex space-x-2 common-phone-container">
                          {/* Country Code Select */}
                          <div className="w-[120px] phone-contry-code">
                            <PhoneCountryCodeSelect
                              value={selectedCountry}
                              onChange={(value) => {
                                setSelectedCountry(value);
                                phoneForm.setValue(
                                  "countryCode",
                                  value?.value || ""
                                );
                              }}
                            />
                          </div>

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
              )}

              {/* Branch Selection (Only if Google Feedback is selected) */}
              {selectedFeedbackType === "branch" && (
                <FormField
                  control={feedbacktypeForm.control}
                  name="branch" // ✅ Changed from `feedbackType` to `branch`
                  rules={{ required: "Branch selection is required" }}
                  render={({ field }) => (
                    <FormItem className="form-row">
                      <Label>
                        Select Branch<span className="text-red-500">*</span>
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            setSelectedBranch(value);
                            field.onChange(value);
                          }}
                          value={selectedBranch}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Chandigarh">
                                Chandigarh
                              </SelectItem>
                              <SelectItem value="Ambala">Ambala</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
              )}

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

      {/* Feedback Dialog */}
      <Dialog
        open={isFeedbackOpen}
        onOpenChange={(isOpen) => {
          setIsFeedbackOpen(isOpen);
          if (!isOpen) {
            feedbackForm.reset();
          }
        }}
      >
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
          </DialogHeader>
          <Form {...feedbackForm}>
            <form
              onSubmit={feedbackForm.handleSubmit(handleFeedbackSubmit)}
              className="space-y-4 p-0 w-full"
            >
              <div className="max-h-[65vh] overflow-auto pr-2 common-scroller">
                <div className="flex justify-between w-full gap-5 mb-5">
                  <div className="w-full flex flex-col mt-2 name-main-holder">
                    <Label className="w-full mb-2">
                      Name<span className="text-red-500">*</span>
                    </Label>
                    <div className="w-full flex gap-2 name-holder border p-1">
                      {/* Name Field */}
                      <FormField
                        control={feedbackForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="form-row w-full border-r">
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="First Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="common-error-msg" />
                          </FormItem>
                        )}
                      />

                      {/* Lastname Field */}
                      <FormField
                        control={feedbackForm.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem className="form-row w-full">
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="w-full email-holder">
                    {/* Email Field */}
                    <FormField
                      control={feedbackForm.control}
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
                </div>

                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* How did you hear Field */}
                  <FormField
                    control={feedbackForm.control}
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
                    control={feedbackForm.control}
                    name="feedbackBranch"
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
                    control={feedbackForm.control}
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
                    control={feedbackForm.control}
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
                    control={feedbackForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <div className="flex justify-between items-center">
                          <Label>
                            Feedback Message
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
                  <FormField
                    control={feedbackForm.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <div className="flex justify-between items-center">
                          <Label>
                            Rating<span className="text-red-500">*</span>
                          </Label>
                        </div>
                        <FormControl>
                          <StarRating
                            value={field.value ?? 0}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Submit Button */}
              <div className="common-button-rows">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsFeedbackOpen(false);
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
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Verification</DialogTitle>
            <p className="!mt-10">
              A verification code has been sent to your mobile{" "}
              <span>{submittedPhoneNumber}</span>. Please enter the code below.
            </p>
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
                    setIsFeedbackOpen(true);
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
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
          </DialogHeader>
          <div className="common-user-info-cont">
            <p>
              Dear <span>{userDetails.name}</span>,
            </p>
            <p>
              Your Feedback has been submitted successfully. Here are your
              details:
            </p>
            <p>
              Unique ID:{" "}
              <span className="userinfo-data">{userDetails.uniqueId}</span>
            </p>
            <p>
              Password:{" "}
              <span className="userinfo-data">{userDetails.password}</span>
            </p>
            <p>Your Password and Other details are send to your email.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Feedback;
