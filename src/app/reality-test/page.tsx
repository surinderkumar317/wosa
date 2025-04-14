"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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
import CommonImage from "@/components/common/Image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

type RealityTestItem = {
  title: string;
  category: string;
  branch: string;
  date: string;
  time: string;
  price: string;
  link: string;
};

const realityTests: RealityTestItem[] = [
  {
    title: "REALITY TEST | TOEFL",
    category: "TOEFL",
    branch: "Bathinda",
    date: "Feb 28, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/reality-test/toefl",
  },
  {
    title: "REALITY TEST | CD IELTS",
    category: "CD-IELTS",
    branch: "Rohtak",
    date: "Feb 08, 2025",
    time: "10:30 AM | 01:30 PM",
    price: "INR 254",
    link: "/reality-test/cd-ielts",
  },
];

const filterSchema = z.object({
  testType: z.string().optional(),
  branch: z.string().optional(),
  date: z.date().optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

const RealityTest: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      testType: "",
      branch: "",
      date: undefined,
    },
  });

  const { watch, reset, control } = form;
  const testType = watch("testType");
  const branch = watch("branch");
  const date = watch("date");

  // Format date to "MMM dd, yyyy"
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const filteredTests = realityTests.filter(
    (test) =>
      (!testType || test.category === testType) &&
      (!branch || test.branch === branch) &&
      (!date || test.date === formatDate(date))
  );

  return (
    <div className="reality-container">
      <div className="commonbanner-form py-10 flex flex-col items-center">
        <div className="container m-auto relative z-20">
          <h1 className="text-center">Reality Test</h1>
          <div className="webmeida-filter-box p-6 bg-white mt-5">
            <Form {...form}>
              <form className="flex gap-5">
                <FormField
                  control={control}
                  name="testType"
                  render={({ field }) => (
                    <FormItem className="w-1/3">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Test Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CD-IELTS">CD-IELTS</SelectItem>
                            <SelectItem value="PTE">PTE</SelectItem>
                            <SelectItem value="TOEFL">TOEFL</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-1/3">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between text-left font-normal"
                            >
                              {field.value
                                ? formatDate(field.value)
                                : "Pick a date"}
                              <CalendarIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              //initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem className="w-1/3">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Venue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bathinda">Bathinda</SelectItem>
                            <SelectItem value="Rohtak">Rohtak</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={() => reset()}
                  className="clear-filter-btn"
                >
                  Clear
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="bgvector">
          <CommonImage
            classname="bg-cont"
            src="/images/background.webp"
            alt="Background"
            width={1938}
            height={624}
          />
        </div>
      </div>

      <div className="container m-auto py-10">
        <div className="courses-box-container flex flex-wrap gap-4">
          {filteredTests.slice(0, visibleCount).map((test, index) => (
            <div key={index} className="w-[24%]">
              <Link href={test.link} className="no-underline">
                <Card className="courses-box p-4 rounded-xl border bg-card shadow">
                  <CardContent className="p-0">
                    <div className="courses-heading text-center">
                      <h2>{test.title}</h2>
                      <p>{test.category}</p>
                    </div>
                    <div className="courses-list">
                      <ul className="my-5">
                        <li>
                          <i className="fa-solid fa-location-dot"></i>
                          <h2>Branch | {test.branch}</h2>
                        </li>
                        <li>
                          <i className="fa-solid fa-calendar-days"></i>
                          <p>Date: {test.date}</p>
                        </li>
                        <li>
                          <i className="fa-regular fa-clock"></i>
                          <p>Time: {test.time}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="courses-btn-box flex justify-between items-center">
                      <p>{test.price}</p>
                      <Button>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        {visibleCount < filteredTests.length && (
          <div className="w-full loader-btn py-6 flex justify-center">
            <Button onClick={() => setVisibleCount((prev) => prev + 8)}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealityTest;
