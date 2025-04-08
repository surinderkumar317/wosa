"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const registrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  dob: z.string().min(1, "Date of Birth is required"),
  city: z.string().min(1, "Please enter a valid city"),
  source: z.string().min(1, "Please select an option"),
  interestedServcies: z.string().min(1, "Interested Services is mandatory"),
  interestedSubServcies: z.string().min(1, "Interested Sub Services is mandatory"),
  interestedCountries: z.string().min(1, "Interested Country is mandatory"),
});

const verificationSchema = z.object({
  verificationCode: z.string().length(4, "Code must be 4 digits").regex(/^[0-9]+$/, "Only numbers allowed"),
});

const Register = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  
  const [isVarificationOpen, setIsVarificationOpen] = useState(false);
  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false);
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", uniqueId: "", password: "" });
  
  const [registrationData, setRegistrationData] = useState<Record<string, any> | null>(null);

  // Phone Form Hook
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: "+91",
      phoneNumber: "",
    },
  });

  // Registration Form Hook
  const registrationForm = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      dob: "",
      city: "",
      source: "",
      interestedServcies: "",
      interestedSubServcies: "",
      interestedCountries: "",
    },
  });

  // Handle Phone Form Submission
  const handlePhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    console.log("Phone Data:", data);
    setSubmittedPhoneNumber(`${data.countryCode} ${data.phoneNumber}`); // Store phone number
    setIsPhoneOpen(false);
    setIsRegistrationOpen(true);
  };

  const handleRegistrationSubmit = async (data: z.infer<typeof registrationSchema>) => {
    console.log("Form Data Submitted:", data);
    toast.success("Register successful! 🎉");
    setIsRegistrationOpen(false);
    registrationForm.reset();
    
    // Store form data before moving to the next step
    setRegistrationData(data);

    setIsRegistrationOpen(false);
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
    if (isRegistrationOpen && registrationData) {
      registrationForm.reset(registrationData); // ✅ Restore values when reopening
    }
  }, [isRegistrationOpen]);

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

    // const isAuthenticated = true; // Simulating successful login
    //     if (isAuthenticated) {
    //       localStorage.setItem("authToken", "your_token_here");
    //       setIsAuthenticated(true);
    //       toast.success("Login successful! 🎉");
    //       setIsRegistrationOpen(false);
    //       registrationForm.reset();
          
    //       // Redirect to dashboard after login
    //       router.push("/student-dashboard");
    //     } else {
    //       toast.error("Invalid credentials. Please try again.");
    // }
};

  return (
    <>
      {/* Phone Number Dialog */}
      <Toaster position="bottom-center" />
      <Dialog open={isPhoneOpen} onOpenChange={setIsPhoneOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={() => setIsPhoneOpen(true)}>Register</Button>
        </DialogTrigger>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>Registration</DialogTitle>
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
                <Button type="submit" variant="link" className="p-0 submit-common">
                  Next <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="common-modal-form w-full max-w-xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Registration</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...registrationForm}>
            <form onSubmit={registrationForm.handleSubmit(handleRegistrationSubmit)}
              className="space-y-4 p-0 w-full"
            >
              <div className="flex justify-between w-full gap-5">
                {/* Name Field */}
                <FormField
                  control={registrationForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>Name<span className="text-red-500">*</span></Label>
                      <FormControl>
                        <Input type="text" placeholder="Enter your Name" {...field} />
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
                {/* Email Field */}
                <FormField
                  control={registrationForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>Email<span className="text-red-500">*</span></Label>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between w-full gap-5">
                {/* Date of birth Field */}
                <FormField
                  control={registrationForm.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>Date of Birth<span className="text-red-500">*</span></Label>
                      <FormControl>
                        <Input type="date" placeholder="Enter your Date of Birth" {...field} />
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
                {/* City Field */}
                <FormField
                  control={registrationForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>City<span className="text-red-500">*</span></Label>
                      <FormControl>
                        <Input type="text" placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between w-full gap-5">
                <FormField
                  control={registrationForm.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>How did you hear about us?</Label>
                      <Select onValueChange={field.onChange} value={field.value}>
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

              <div className="flex justify-between w-full gap-5 flex-wrap">
                {/* Interested Servcies Field */}

                {/* Interested Services */}
                <FormField
                  control={registrationForm.control}
                  name="interestedServcies"
                  render={({ field }) => (
                    <FormItem className="form-row w-[45%]">
                      <Label>Interested Services<span className="text-red-500">*</span></Label>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            setSelectedService(value);
                            field.onChange(value);
                            setSelectedSubService("");
                            registrationForm.setValue("interestedSubServcies", "");
                            registrationForm.setValue("interestedCountries", "");
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Interested Services" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Visa">Visa</SelectItem>
                            <SelectItem value="Reality Test">Reality Test</SelectItem>
                            <SelectItem value="Exam Booking">Exam Booking</SelectItem>
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
                    control={registrationForm.control}
                    name="interestedSubServcies"
                    render={({ field }) => (
                      <FormItem className="form-row w-[45%]">
                        <Label>Interested Sub Services<span className="text-red-500">*</span></Label>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              setSelectedSubService(value);
                              field.onChange(value);
                              registrationForm.setValue("interestedCountries", "");
                            }}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Interested Sub Services" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Study Visa">Study Visa</SelectItem>
                              <SelectItem value="Visitor Visa">Visitor Visa</SelectItem>
                              <SelectItem value="Work Visa">Work Visa</SelectItem>
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
                    control={registrationForm.control}
                    name="interestedCountries"
                    render={({ field }) => (
                      <FormItem className="form-row w-[45%]">
                        <Label>Interested Country<span className="text-red-500">*</span></Label>
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
                              <SelectItem value="Australia">Australia</SelectItem>
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

              {/* Submit Button */}
              <div className="common-button-rows">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsRegistrationOpen(false);
                    setIsPhoneOpen(true);
                  }}
                  className="back-btn"
                ><i className="fa fa-angle-left" aria-hidden="true"></i> Back</Button>
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
              A verification code has been sent to your mobile <span>{submittedPhoneNumber}</span>. Please enter the code below.
            </DialogDescription>
          </DialogHeader>
          <Form {...verifyForm}>
            <form onSubmit={verifyForm.handleSubmit(handleVarifySubmit)} className="flex gap-4 flex-col">
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
                    {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : "Resend Code"}
                  </Button>
                </div>
              </div>
              <div className="common-button-rows clear-both">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsVarificationOpen(false);
                    setIsRegistrationOpen(true)
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
          <p>Dear <span>{userDetails.name}</span>,</p>
          <p>Your enquiry has been submitted successfully. Here are your details:</p>
          <p>Unique ID: <span>{userDetails.uniqueId}</span></p>
          <p>Password: <span>{userDetails.password}</span></p>
          <p>Your Password and Other details are send to your email.</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
