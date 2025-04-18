"use client";
import { useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CommonImage from "@/components/common/Image";
import Link from "next/link";

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
import ClassroomHeaderData from "@/components/classroom-dashboard/ClassroomHeaderData";
import ClassroomSidebarMenu from "@/components/classroom-dashboard/ClassroomSidebarMenu";
import { Button } from "@/components/ui/button";

// Sample data array for classroom materials
interface Material {
  id: number;
  title: string;
  date: string;
  href: string;
  image: string;
}

const materials: Material[] = [
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy",
    date: "April 3, 2025",
    href: "/student-classrooms/classroom-material/classroom-marterial01",
    image: "/dashboard-images/classroom_material.webp",
  },
  {
    id: 2,
    title: "Mathematics Chapter 5",
    date: "April 4, 2025",
    href: "/student-classrooms/classroom-material/classroom-marterial01",
    image: "/dashboard-images/classroom_material.webp",
  },
  {
    id: 3,
    title: "Science Class Recording",
    date: "April 3, 2025",
    href: "/student-classrooms/classroom-material/classroom-marterial02",
    image: "/dashboard-images/classroom_material.webp",
  },
];

const formSchema = z.object({
  search: z.string().optional(),
  date: z.date().optional(),
});

const Page: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { search: "", date: undefined },
  });

  const search =
    useWatch({ control: form.control, name: "search" })?.toLowerCase() || "";
  const selectedDate = useWatch({ control: form.control, name: "date" });

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchSearch =
        search === "" || material.title.toLowerCase().includes(search);
      const materialDate = new Date(material.date);
      const matchDate =
        !selectedDate ||
        materialDate.toDateString() === selectedDate.toDateString();

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
                              <CalendarIcon className="ml-2 h-4 w-4" />
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

          <div className="stu-classroom-row-content w-full mb-5">
            <h2 className="text-2xl mb-5">Classroom Material</h2>
            <div className="full-class-row mb-10 flex gap-5 flex-wrap">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material) => (
                  <Link
                    key={material.id}
                    href={material.href}
                    className="w-[32.2%] classroom-matrial hover:shadow-md transition"
                  >
                    <Card>
                      <CardHeader className="hidden" />
                      <CardContent className="p-5 flex gap-5 items-center">
                        <div className="classroom-material-img">
                          <CommonImage
                            classname="icon"
                            src={material.image}
                            alt="Recorded Lecture"
                            width={42}
                            height={42}
                          />
                        </div>
                        <div className="classroom-material-text">
                          <h3>{material.title}</h3>
                          <p>
                            <strong>Date:- </strong>
                            {material.date}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="stu-classroom-no-data flex gap-4 items-center justify-start p-2 bg-gray-100 rounded-sm px-5">
                  <CommonImage
                    classname="icon"
                    src="/dashboard-images/classroom_material.webp"
                    alt="Classroom Material"
                    width={42}
                    height={42}
                  />
                  <p className="text-xl">There are no classroom material yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
