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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const countryOptions = [
//   { value: "+91", label: "+91 - IN", searchable: "india" },
//   { value: "+1", label: "+1 - U", searchable: "usa" },
//   { value: "+44", label: "+44 - GB", searchable: "uk" },
//   { value: "+61", label: "+61 - AU", searchable: "australia" },
//   { value: "+81", label: "+81 - JP", searchable: "japan" },
// ];

const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),
});

const enquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email address"),
  source: z.string().min(1, "Please select an option"),
  interestedServices: z.string().min(1, "This field is required"),
  interestedSubServices: z.string().min(1, "This field is required"),
  interestedCountries: z.string().min(1, "This field is required"),
  message: z.string().min(5, "Message is required"),
});

const verificationSchema = z.object({
  verificationCode: z
    .string()
    .length(4, "Code must be 4 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

type EnquiryData = {
  name: string;
  lastname?: string;
  email: string;
  source: string;
  interestedServices: string;
  interestedSubServices: string;
  interestedCountries: string;
  message: string;
};

const EnquiryForm: React.FC = () => {
  //const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [resendTimer, setResendTimer] = useState(30);

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isVarificationOpen, setIsVarificationOpen] = useState(false);
  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false);
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    uniqueId: "",
    password: "",
  });

  const [enquiryData, setEnquiryData] = useState<EnquiryData | null>(null);

  const [searchTerm] = useState("");

  // // Place the filter here, inside your component
  // const filteredOptions = countryOptions.filter((country) =>
  //   country.searchable.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: { countryCode: "+91", phoneNumber: "" },
  });

  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    setSelectedCountry({ value: "+91", label: "+91 - IN" });
  }, []);

  const enquiryForm = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      source: "",
      interestedServices: "",
      interestedSubServices: "",
      interestedCountries: "",
      message: "",
    },
  });

  const handlePhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    console.log("Phone Data:", data);
    setSubmittedPhoneNumber(`${data.countryCode} ${data.phoneNumber}`); // Store phone number
    setIsEnquiryOpen(true); // Open enquiry modal
  };

  const handleCloseModals = () => {
    setIsEnquiryOpen(false);
    setIsVarificationOpen(false);
    setIsFormInfoOpen(false);
    phoneForm.reset(); // Reset phone form when closing any modal
  };

  const handleEnquirySubmit = async (data: z.infer<typeof enquirySchema>) => {
    console.log("Enquiry Submitted:", data);
    enquiryForm.reset();
    setMessageLength(0); // Reset message length
    setIsEnquiryOpen(false);
    setIsVarificationOpen(true); // Open verification modal

    // Store form data before moving to the next step
    setEnquiryData(data);

    // Simulate an API response with generated details
    const generatedUserDetails = {
      name: data.name,
      uniqueId: "UID123456",
      password: "Pass@123",
    };
    setUserDetails(generatedUserDetails);
  };

  useEffect(() => {
    if (isEnquiryOpen && enquiryData) {
      enquiryForm.reset(enquiryData); // ✅ Restore values when reopening
    }
  }, [isEnquiryOpen]);

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

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus(); // Re-focus after dropdown opens
    }, 50); // Small delay ensures it's mounted

    return () => clearTimeout(timer);
  }, [searchTerm]); // Optional: focus each time dropdown resets

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
                    {/* Country Code Select */}
                    <div className="w-[180px] phone-contry-code">
                      <PhoneCountryCodeSelect
                        value={selectedCountry}
                        onChange={(value) => {
                          setSelectedCountry(value);
                          phoneForm.setValue("countryCode", value?.value || "");
                        }}
                      />
                    </div>
                    <Input
                      type="tel"
                      placeholder="Enter Phone Number"
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

      {/* Enquiry Dialog */}
      <Dialog open={isEnquiryOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Enquiry</DialogTitle>
          </DialogHeader>
          <Form {...enquiryForm}>
            <form
              onSubmit={enquiryForm.handleSubmit(handleEnquirySubmit)}
              className="space-y-4 p-0 w-full"
            >
              <div className="max-h-[66vh] overflow-auto pr-2 common-scroller">
                <div className="flex justify-between w-full gap-5 mb-5">
                  <div className="w-full flex flex-col mt-2 name-main-holder">
                    <Label className="w-full mb-2">
                      Name<span className="text-red-500">*</span>
                    </Label>
                    <div className="w-full flex gap-2 name-holder border p-1">
                      {/* Name Field */}
                      <FormField
                        control={enquiryForm.control}
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
                        control={enquiryForm.control}
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
                      control={enquiryForm.control}
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
                  <FormField
                    control={enquiryForm.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>How did you hear about us?</Label>
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
                </div>

                <div className="flex justify-between w-full gap-5 flex-wrap mb-5">
                  {/* Interested Services */}
                  <FormField
                    control={enquiryForm.control}
                    name="interestedServices"
                    render={({ field }) => (
                      <FormItem className="form-row w-[45%]">
                        <Label>
                          Interested Services
                          <span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              setSelectedService(value);
                              field.onChange(value);
                              setSelectedSubService("");
                              enquiryForm.setValue("interestedSubServices", "");
                              enquiryForm.setValue("interestedCountries", "");
                            }}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Interested Services" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Visa">Visa</SelectItem>
                              <SelectItem value="Reality Test">
                                Reality Test
                              </SelectItem>
                              <SelectItem value="Exam Booking">
                                Exam Booking
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />

                  {/* Interested Sub Services - Conditional */}
                  {selectedService && (
                    <FormField
                      control={enquiryForm.control}
                      name="interestedSubServices"
                      render={({ field }) => (
                        <FormItem className="form-row w-[45%]">
                          <Label>
                            Interested Sub Services
                            <span className="text-red-500">*</span>
                          </Label>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                setSelectedSubService(value);
                                field.onChange(value);
                                enquiryForm.setValue("interestedCountries", "");
                              }}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Interested Sub Services" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Study Visa">
                                  Study Visa
                                </SelectItem>
                                <SelectItem value="Visitor Visa">
                                  Visitor Visa
                                </SelectItem>
                                <SelectItem value="Work Visa">
                                  Work Visa
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="common-error-msg" />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Interested Country - Conditional */}
                  {selectedSubService && (
                    <FormField
                      control={enquiryForm.control}
                      name="interestedCountries"
                      render={({ field }) => (
                        <FormItem className="form-row w-[45%]">
                          <Label>
                            Interested Country
                            <span className="text-red-500">*</span>
                          </Label>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Interested Country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="India">India</SelectItem>
                                <SelectItem value="Australia">
                                  Australia
                                </SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="common-error-msg" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Message Field */}
                  <FormField
                    control={enquiryForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <div className="flex justify-between items-center">
                          <Label>
                            Message<span className="text-red-500">*</span>
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
              </div>
              {/* Submit Button */}
              <div className="common-button-rows enq-row">
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
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
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
                    setIsEnquiryOpen(true);
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
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
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
    </div>
  );
};

export default EnquiryForm;
