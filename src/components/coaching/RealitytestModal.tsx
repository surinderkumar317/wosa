"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OptionBox from "@/components/coaching/OptionBox";
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

interface FormBannerProps {
  heading: string;
}

// Country options
const countryOptions = [
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+1", label: "🇺🇸 +1 (USA)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+81", label: "🇯🇵 +81 (Japan)" },
];

// Zod Schemas
const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),
});

const realitytestSchema = z.object({
  program: z.string().min(2, "Please select program"),
});

const prackticeinfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  howdidyouhear: z.string().min(2, "Please select how did you hear about us"),
});

const verificationSchema = z.object({
  verificationCode: z
    .string()
    .length(4, "Code must be 4 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

// Component
const RealitytestModal: React.FC<FormBannerProps> = ({ heading }) => {
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isCourseinfoOpen, setIsCourseinfoOpen] = useState(false);
  const [shouldResetForms, setShouldResetForms] = useState(true);

  const [isVarificationOpen, setIsVarificationOpen] = useState(false);
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = countryOptions.filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    uniqueId: "",
    password: "",
  });

  const [isProgramSelected, setIsProgramSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { countryCode: "+91", phoneNumber: "" },
  });

  const realitytestForm = useForm<z.infer<typeof realitytestSchema>>({
    resolver: zodResolver(realitytestSchema),
    defaultValues: {
      program: "",
    },
  });

  // 👇 Place this AFTER the above
  useEffect(() => {
    const subscription = realitytestForm.watch((value) => {
      setIsProgramSelected(!!value.program);
    });
    return () => subscription.unsubscribe();
  }, [realitytestForm]);

  // Reality info Form Hook
  const realityinfoForm = useForm({
    resolver: zodResolver(prackticeinfoSchema),
    defaultValues: {
      name: "",
      email: "",
      howdidyouhear: "",
    },
  });

  const handlePhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    console.log("Phone Data:", data);
    setSubmittedPhoneNumber(`${data.countryCode} ${data.phoneNumber}`); // Store phone number
    setIsCourseOpen(true);
  };

  const handleRealitytestSubmit = async (
    data: z.infer<typeof realitytestSchema>
  ) => {
    console.log("Submitted Program:", data.program);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    setIsCourseinfoOpen(true);
    setIsCourseOpen(false);
  };

  const handleRealitytestinfoSubmit = async (
    data: z.infer<typeof prackticeinfoSchema>
  ) => {
    console.log("Course Info Submitted:", data);
    realitytestForm.reset();
    phoneForm.reset();
    setIsCourseOpen(false);
    setIsCourseinfoOpen(false);
    setIsVarificationOpen(true);
    setShouldResetForms(true); // ✅ enable reset after final submission

    const generatedUserDetails = {
      name: data.name,
      uniqueId: "UID123456",
      password: "Pass@123",
    };
    setUserDetails(generatedUserDetails);
  };

  const handleCloseModals = () => {
    setIsCourseOpen(false);
    setIsCourseinfoOpen(false);
    setIsFormInfoOpen(false);
    setIsVarificationOpen(false);

    if (shouldResetForms) {
      phoneForm.reset();
      realitytestForm.reset();
      realityinfoForm.reset(); // ✅ include this only if reset is intended
    }
  };

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

  const selectedProgram = useWatch({
    control: realitytestForm.control,
    name: "program",
  });

  return (
    <div className="enquiryform-container">
      {/* Phone Form */}
      <Form {...phoneForm}>
        <form
          onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
          className="space-y-4 py-5 w-full flex items-center gap-5 relative"
        >
          <FormField
            control={phoneForm.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-[80%]">
                <FormControl>
                  <div className="flex space-x-2 w-full p-2 form-phone-input">
                    <Select
                      onValueChange={(value) => {
                        setSelectedCountry(value);
                        phoneForm.setValue("countryCode", value);
                        setSearchTerm(""); // Clear search when a value is selected
                      }}
                      value={selectedCountry}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* 🔍 Search Input inside the dropdown */}
                        <div className="px-2 pb-2 pt-1">
                          <Input
                            placeholder="Search country"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>

                        <SelectGroup>
                          {filteredOptions.length > 0 ? (
                            filteredOptions.map((country) => (
                              <SelectItem
                                key={country.value}
                                value={country.value}
                              >
                                {country.label}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-muted-foreground">
                              No results found
                            </div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      inputMode="numeric"
                      minLength={10}
                      maxLength={10}
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage className="common-error-msg" />
              </FormItem>
            )}
          />
          <div className="common-button-rows registration-justify-end">
            <Button type="submit" variant="link" className="p-0 submit-common">
              <i className="fa fa-angle-right"></i>
            </Button>
          </div>
        </form>
      </Form>

      {/* Course Dialog */}
      <Dialog open={isCourseOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
          </DialogHeader>

          <Form {...realitytestForm}>
            <form
              onSubmit={realitytestForm.handleSubmit(handleRealitytestSubmit)}
              className="space-y-4 p-0 w-full overflow-hidden"
            >
              <div className="flex justify-between w-full gap-5 flex-col">
                <FormField
                  control={realitytestForm.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>
                        Program<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="General Training">
                            General Training
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />

                {!selectedProgram && (
                  <div className="common-button-rows enq-row">
                    <Button
                      type="submit"
                      variant="link"
                      className="p-0 submit-common disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next <i className="fa fa-angle-right"></i>
                    </Button>
                  </div>
                )}
              </div>

              {isProgramSelected && (
                <div className="date-time-container">
                  <div className="max-h-[50vh] overflow-auto pr-2 common-scroller">
                    <div className="flex justify-between w-full flex-col gap-2 reality-datebox-cont">
                      <p>
                        Select Date<span className="text-red-500">*</span>
                      </p>
                      <div className="reality-date-container max-w-[520px] min-h-[230px] overflow-x-auto">
                        <div className="reality-date-box flex min-w-max">
                          {[
                            "APR 17 2025 To APR 25 2025",
                            "APR 18 2025",
                            "APR 19 2025",
                            "APR 23 2025",
                          ].map((date) => (
                            <OptionBox
                              key={date}
                              value={date}
                              selectedValue={selectedDate}
                              onSelect={setSelectedDate}
                            >
                              <h2 className="!text-xl font-bold">
                                {(() => {
                                  const parts = date.split(/ to /i); // case-insensitive split
                                  if (parts.length === 2) {
                                    return (
                                      <>
                                        <div>{parts[0]}</div>
                                        <div className="text-sm text-muted-foreground">
                                          TO
                                        </div>
                                        <div>{parts[1]}</div>
                                      </>
                                    );
                                  } else {
                                    return <div>{date}</div>;
                                  }
                                })()}
                              </h2>
                              <p className="!text-sm py-2">Available</p>
                              <p className="!text-base font-semibold">
                                INR 1000
                              </p>
                            </OptionBox>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between w-full gap-2 reality-datebox-cont flex-col mt-5">
                      <p>
                        Time Slot<span className="text-red-500">*</span>
                      </p>
                      <div className="reality-time-container max-w-[520px] min-h-[150px] overflow-x-auto">
                        <div className="reality-time-box flex">
                          {["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"].map(
                            (time) => (
                              <OptionBox
                                key={time}
                                value={time}
                                selectedValue={selectedTime}
                                onSelect={setSelectedTime}
                              >
                                <p className="!text-sm py-2">{time}</p>
                                <p className="!text-sm">Available</p>
                              </OptionBox>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="common-button-rows enq-row">
                    <Button
                      type="submit"
                      variant="link"
                      className="p-0 submit-common disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedDate || !selectedTime}
                    >
                      Next <i className="fa fa-angle-right"></i>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* course info Dialog */}
      <Dialog open={isCourseinfoOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...realityinfoForm}>
            <form
              onSubmit={realityinfoForm.handleSubmit(
                handleRealitytestinfoSubmit
              )}
              className="space-y-4 p-0 w-full"
            >
              <div className="max-h-[65vh] overflow-auto pr-2 common-scroller">
                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Name Field */}
                  <FormField
                    control={realityinfoForm.control}
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
                    control={realityinfoForm.control}
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
                  <FormField
                    control={realityinfoForm.control}
                    name="howdidyouhear"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          How did you hear about us
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
                            <SelectItem value="Advertising Van">
                              Advertising Van
                            </SelectItem>
                            <SelectItem value="Cable/FM">Cable/FM</SelectItem>
                          </SelectContent>
                        </Select>
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
                    setShouldResetForms(false); // ✅ set this first
                    setIsCourseinfoOpen(false);
                    setIsCourseOpen(true);
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
                    setShouldResetForms(false); // ✅ set before closing modal
                    setIsVarificationOpen(false);
                    setIsCourseinfoOpen(true);
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
            <DialogTitle>Package Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="common-user-info-cont">
            <p>
              Dear <span>{userDetails.name}</span>,
            </p>
            <p>
              Your enquiry has been submitted successfully. Here are your
              details:
            </p>
            <p>
              Unique ID: <span>{userDetails.uniqueId}</span>
            </p>
            <p>
              Password: <span>{userDetails.password}</span>
            </p>
            <p>Your Password and Other details are send to your email.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RealitytestModal;
