"use client";

import React, { useState, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import CommonImage from "@/components/common/Image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClassroomHeaderData from "./ClassroomHeaderData";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z.object({
  search: z.string().optional(),
  selectTopic: z.string().optional(),
});

const classScheduleData = [
  { topic: "CELPIP", status: "Online,Offline", duration: "15 minutes", date: "April 3, 2025", time: "15:03", isActive: false },
  { topic: "IELTS", status: "Online", duration: "30 minutes", date: "April 5, 2025", time: "16:00", isActive: true },
  { topic: "CELPIP", status: "Offline", duration: "45 minutes", date: "April 7, 2025", time: "10:30", isActive: true },
];

const FullClassSchedule = () => {
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: { search: "", selectTopic: "" },
    });
  
    const { setValue, watch } = form; // Make sure to destructure inside the component
    const searchQuery = watch("search")?.toLowerCase() || ""; // Ensure it's always a string
    const selectedTopic = watch("selectTopic") || "";
  
    const filteredClasses = useMemo(() => {
      return classScheduleData.filter(({ topic, status }) => {
        return (
          (searchQuery === "" ||
            topic.toLowerCase().includes(searchQuery) ||
            status.toLowerCase().includes(searchQuery)) &&
          (selectedTopic === "" || topic === selectedTopic)
        );
      });
    }, [searchQuery, selectedTopic]);
  
    return (
      <div>
        <ClassroomHeaderData />
        <div className="p-6 bg-gray-100 my-4">
          <Form {...form}>
            <form className="flex gap-5">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Input placeholder="Search by Title or Venue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="selectTopic"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Select
                        onValueChange={(value) => setValue("selectTopic", value)}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CELPIP">CELPIP</SelectItem>
                          <SelectItem value="IELTS">IELTS</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => form.reset()} className="clear-filter-btn">
                Clear
              </Button>
            </form>
          </Form>
        </div>
        <div className="stu-classroom-row-content w-full mb-5">
          <h2 className="text-2xl mb-5">Full Class Schedule</h2>
          <div className="full-class-row mb-10 flex gap-5 flex-wrap">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls, index) => (
                <Card key={index} className="w-[32.2%]">
                  <CardHeader className="hidden" />
                  <CardContent className="p-5">
                    <p className="mb-2"><strong>Topic: </strong>{cls.topic}</p>
                    <p className="mb-2"><strong>Status: </strong>{cls.status}</p>
                    <p className="mb-2"><strong>Duration: </strong>{cls.duration}</p>
                    <p className="mb-2"><strong>Date: </strong>{cls.date}</p>
                    <p className="mb-2"><strong>Time: </strong>{cls.time}</p>
                    <div className="full-class-btn-cont w-full justify-center flex flex-col gap-4 items-center">
                      <Button variant="outline">Join Class</Button>
                      <p>Status <i className={`fa fa-circle ${cls.isActive ? "text-green-600" : "text-red-600"}`} aria-hidden="true"></i></p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="stu-classroom-no-data flex gap-4 items-center justify-start p-2 bg-gray-100 rounded-sm px-5">
                <CommonImage src="/dashboard-images/class_schedule.webp" alt="Schedule" width={42} height={42} />
                <p className="text-xl">There are no class schedules yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };  

export default FullClassSchedule;
