"use client";
import { useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CommonImage from "@/components/common/Image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ClassroomSidebarMenu from "@/components/classroom-dashboard/ClassroomSidebarMenu";
import ClassroomHeaderData from "@/components/classroom-dashboard/ClassroomHeaderData";
import FilePreviewModal from "@/components/dashboard/FilePreviewModal";

// Dummy lecture data
const lectureData = [
  {
    id: 1,
    topic: "Lorem Ipsum is simply dummy",
    date: new Date("2025-04-03"),
    img: "/dashboard-images/recorded_lecture.webp",
    videoUrl: "/images/ocean.mp4",
  },
  {
    id: 2,
    topic: "Introduction to AI",
    date: new Date("2025-04-10"),
    img: "/dashboard-images/recorded_lecture.webp",
    videoUrl: "/images/ocean.mp4",
  },
  {
    id: 3,
    topic: "React Basics",
    date: new Date("2025-04-03"),
    img: "/dashboard-images/recorded_lecture.webp",
    videoUrl: "/images/ocean.mp4",
  },
];

const formSchema = z.object({
  search: z.string().optional(),
  date: z.date().optional(),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { search: "", date: undefined },
  });

  const search =
    useWatch({ control: form.control, name: "search" })?.toLowerCase() || "";
  const selectedDate = useWatch({ control: form.control, name: "date" });

  const filteredLectures = useMemo(() => {
    return lectureData.filter((lecture) => {
      const matchSearch =
        search === "" || lecture.topic.toLowerCase().includes(search);
      const matchDate =
        !selectedDate ||
        lecture.date.toDateString() === selectedDate.toDateString();
      return matchSearch && matchDate;
    });
  }, [search, selectedDate]);

  return (
    <div className="dashboard-section py-20">
      <div className="container m-auto flex gap-8 dashboard-inner-section">
        <div className="w-1/6 user-left-section rounded-sm">
          <ClassroomSidebarMenu />
        </div>
        <div className="w-5/6 user-right-section">
          <ClassroomHeaderData />

          {/* Filter Form */}
          <div className="p-6 bg-gray-100 my-4">
            <Form {...form}>
              <form className="flex gap-5 full-class-sch-form w-full">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="w-1/2 full-class-row">
                      <FormControl>
                        <Input placeholder="Search by Topic" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-1/2 full-class-row">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between text-left font-normal"
                            >
                              {field.value
                                ? field.value.toDateString()
                                : "Pick a date"}
                              <CalendarIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={() => form.reset()}
                  className="clear-filter-btn"
                >
                  Clear
                </Button>
              </form>
            </Form>
          </div>

          {/* Lecture Cards */}
          <div className="stu-classroom-row-content w-full mb-5">
            <div className="stu-classroom-heading flex justify-between mb-5">
              <h2 className="text-2xl">Recorded Lectures</h2>
            </div>

            {filteredLectures.length > 0 ? (
              <div className="full-class-row mb-10 flex gap-5 flex-wrap">
                {filteredLectures.map((lecture) => (
                  <FilePreviewModal
                    key={lecture.id}
                    trigger={
                      <Card className="w-[32.2%] recorded-box cursor-pointer hover:shadow-md transition">
                        <CardHeader className="hidden" />
                        <CardContent className="p-5 flex gap-5 items-center">
                          <div className="classroom-material-img">
                            <CommonImage
                              classname={"icon"}
                              src={lecture.img}
                              alt={lecture.topic}
                              width={72}
                              height={62}
                            />
                          </div>
                          <div className="classroom-material-text">
                            <h3>
                              <strong>Topic:</strong> {lecture.topic}
                            </h3>
                            <p>
                              <strong>Date:- </strong>
                              {lecture.date.toDateString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    }
                    type="video"
                    src={lecture.videoUrl}
                    title={lecture.topic}
                  />
                ))}
              </div>
            ) : (
              <div className="stu-classroom-no-data flex gap-4 items-center justify-start p-2 bg-gray-100 rounded-sm px-5">
                <CommonImage
                  classname={"icon"}
                  src={"/dashboard-images/recorded_lecture.webp"}
                  alt={"Recorded Lecture"}
                  width={42}
                  height={42}
                />
                <p className="text-xl">
                  There are no classroom recorded lectures yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
