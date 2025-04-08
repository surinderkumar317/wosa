"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";



const viewProfileSchema = z.object({
  firstName: z.string().min(2, "Name is required"),
  lastName: z.string().min(2, "Last name is required"),
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.string().min(2, "Please select your gender"),
  email: z.string().email("Invalid email format"),
  dob: z.string().min(1, "Date of Birth is required"),
  anniversary: z.string().min(1, "Please enter your anniversary details"),
  permanentAddress: z.string().min(1, "Please enter your address"),
});

  const ViewProfile = () => {

    const router = useRouter();

    const viewProfileForm = useForm({
      resolver: zodResolver(viewProfileSchema),
      defaultValues: {
        firstName: "John",
        lastName: "Doe",
        countryCode: "+91",
        phoneNumber: "1234567890",
        gender: "Male",
        email: "johndoe@example.com",
        dob: new Date().toISOString().split("T")[0], // Default to today’s date
        anniversary: "",
        permanentAddress: "123 Main St, City, Country",
      },
    });

  const handleViewProfileSubmit = async (data: z.infer<typeof viewProfileSchema>) => {
      console.log("Form Data Submitted:", data);      
};

  return (
    <div className="view-profile mt-5">
      <div className="dash-header flex justify-between items-center">
        <h2 className="text-2xl font-bold">View Profile</h2>
        <Button onClick={() => router.push("/student-dashboard")}>Back</Button> {/* ✅ Navigate back */}
      </div>

      <div className="view-profile-form">
        <Form {...viewProfileForm}>
          <form  onSubmit={viewProfileForm.handleSubmit(handleViewProfileSubmit)} className="space-y-4 p-4 w-full">
            <div className="flex justify-between w-full gap-5">
              {/* First Name */}
              <FormField
                control={viewProfileForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="form-row w-full">
                    <Label>First Name</Label>
                    <FormControl>
                      <Input type="text" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={viewProfileForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="form-row w-full">
                    <Label>Last Name</Label>
                    <FormControl>
                      <Input type="text" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Country Code & Phone Number */}
            <div className="flex justify-between w-full gap-5">
              {/* Country Code Input */}
              <FormField
                control={viewProfileForm.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="form-row w-full">
                    <Label>Country Code</Label>
                    <FormControl>
                      <Input
                        type="text"
                        value="+91"
                        disabled
                        className="bg-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Input */}
              <FormField
                control={viewProfileForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="form-row w-full">
                    <Label>
                      Phone Number<span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        {...field}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        minLength={10}
                        maxLength={10}
                        className="flex-1"
                        disabled
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between w-full gap-5">
              {/* Gender */}
              <FormField
                control={viewProfileForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="form-row w-full">
                    <Label>Gender</Label>
                    <FormControl>
                      <Input type="text" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={viewProfileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-row w-full">
                    <Label>Email</Label>
                    <FormControl>
                      <Input type="email" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between w-full gap-5">
              {/* Date of Birth */}
              <FormField
                control={viewProfileForm.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="form-row w-full">
                    <Label>Date of Birth</Label>
                    <FormControl>
                      <Input type="date" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Anniversary */}
              <FormField
                control={viewProfileForm.control}
                name="anniversary"
                render={({ field }) => (
                  <FormItem className="form-row w-full">
                    <Label>Anniversary </Label>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="common-error-msg" />
                  </FormItem>
                )}
              />
            </div>

            {/* Permanent Address */}
            <FormField
              control={viewProfileForm.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem className="form-row w-full">
                  <Label>Permanent Address</Label>
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end w-full">
              <Button type="submit" className="submit-common">
                Update <i className="fa fa-angle-right"></i>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ViewProfile;
