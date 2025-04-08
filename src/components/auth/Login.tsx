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
import { Eye, EyeOff } from "lucide-react";

import { toast } from "sonner";
import { Toaster } from "sonner";
import Register from "./Register";

const countryOptions = [
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+1", label: "🇺🇸 +1 (USA)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+81", label: "🇯🇵 +81 (Japan)" },
];

// Define validation schemas for login
const formSchema = z.object({
  loginBy: z.enum(["phone", "email", "uniqueid"]),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional()
    .or(z.literal("")), // Allow empty when not selected
  loginEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")), // Allow empty when not selected
  uniqueId: z.string().optional().or(z.literal("")), // Allow empty when not selected
  password: z.string().min(6, "Password must be at least 6 characters"),
})
  .refine((data) => {
    if (data.loginBy === "phone") return data.phoneNumber?.trim();
    return true;
  }, { path: ["phoneNumber"], message: "Phone Number is required" })
  .refine((data) => {
    if (data.loginBy === "email") return data.loginEmail?.trim();
    return true;
  }, { path: ["loginEmail"], message: "Email is required" })
  .refine((data) => {
    if (data.loginBy === "uniqueid") return data.uniqueId?.trim();
    return true;
  }, { path: ["uniqueId"], message: "Unique ID is required" });

const Login = () => {
  // const router = useRouter();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedLoginBy, setSelectedLoginBy] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("+91");

  const loginForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginBy: "phone",
      phoneNumber: "",
      loginEmail: "",
      uniqueId: "",
      password: "",
    },
  });
 

  const handleLogin = async (data: z.infer<typeof formSchema>) => {
    console.log("Form Data Submitted:", data); 
    toast.success("Login successful! 🎉");
      setIsLoginOpen(false);
      loginForm.reset();

    // const isAuthenticated = true; // Simulating successful login
    // if (isAuthenticated) {
    //   localStorage.setItem("authToken", "your_token_here");
    //   setIsAuthenticated(true);
      
      
    //   // Redirect to dashboard after login
    //   router.push("/student-dashboard");
    // } else {
    //   toast.error("Invalid credentials. Please try again.");
    // }
  };

  const handleLogout = () => {
    // localStorage.removeItem("authToken"); // ✅ Clear stored token
    // setIsAuthenticated(false); // ✅ Update state
  
    toast.success("Logged out successfully! 👋");
  
    // ✅ Force a hard reload to fully reset auth state
    // router.push("/");
    // setTimeout(() => {
    //   router.refresh(); // ✅ Ensures Next.js recognizes state change
    // }, 200);
  };
  // // Debugging function
  // const onInvalid = (errors: any) => {
  //   console.log("Validation Errors:", errors);
  //   toast.error("Please correct the errors before submitting.");
  // };

  // Define validation schemas for forgotpassword
  const forgotPasswordSchema = z.object({
    forgotEmail: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
  });
  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { forgotEmail: "" },
  });

  const onInvalid = (errors: any) => {
    console.log("Validation Errors:", errors);
    toast.error("Please correct the errors before submitting.");
  };

  // on submit data for forgotpassword forms
  const onSubmitForgotPassword = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log("Forgot Password Data:", data);
    toast.info("Password reset link sent! 📩"); // ✅ Feedback message
    setIsForgotPasswordOpen(false);
    forgotPasswordForm.reset();
  };

  return (
    <>
      {/* Login Dialog */}
      <Toaster position="bottom-center" /> 
      
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" onClick={() => setIsLoginOpen(true)}>Login</Button>
          </DialogTrigger>
          <DialogContent className="common-modal-form w-full max-w-xl">
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(handleLogin, onInvalid)}
                className="space-y-4 p-4 w-full"
              >
                <FormField
                  control={loginForm.control}
                  name="loginBy"
                  render={({ field }) => (
                    <FormItem className="form-row">
                      <Label>
                        Login By<span className="text-red-500">*</span>
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            setSelectedLoginBy(value);
                            field.onChange(value);
                          }}
                          value={selectedLoginBy}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select login method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="phone">Phone Number</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="uniqueid">Unique ID</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />

                {selectedLoginBy === "phone" && (
                  <FormField
                    control={loginForm.control}
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
                              onValueChange={(value) => setSelectedCountry(value)}
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

                            {/* Phone Number Input (Only Numbers Allowed) */}
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
                                const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
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

                {selectedLoginBy === "email" && (
                  <FormField
                    control={loginForm.control}
                    name="loginEmail"
                    render={({ field }) => (
                      <FormItem className="form-row">
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
                )}

                {selectedLoginBy === "uniqueid" && (
                  <FormField
                    control={loginForm.control}
                    name="uniqueId"
                    render={({ field }) => (
                      <FormItem className="form-row">
                        <Label>
                          Unique ID<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Unique ID"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="form-row">
                      <Label>
                        Password<span className="text-red-500">*</span>
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Eye size={20} />
                            ) : (
                              <EyeOff size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
                <div className="common-button-rows">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => {
                      setIsLoginOpen(false);
                      setIsForgotPasswordOpen(true);
                      forgotPasswordForm.reset();
                    }}
                    className="p-0 forgot-btn"
                  >
                    Forgot Password?
                  </Button>
                  <Button variant="link" type="submit" className="submit-common">
                    Submit <i className="fa fa-angle-right"></i>
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
    

      {/* Forgot Password Dialog */}
      <Dialog
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
      >
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit(onSubmitForgotPassword)}
              className="space-y-4 p-4 w-full"
            >
              <FormField
                control={forgotPasswordForm.control}
                name="forgotEmail"
                render={({ field }) => (
                  <FormItem className="form-row">
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
              <div className="common-button-rows">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsForgotPasswordOpen(false);
                    setIsLoginOpen(true);
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
    </>
  );
};

export default Login;
