"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import CommonImage from "@/components/common/Image";
import Link from "next/link";

const formSchema = z.object({
  program: z.string().min(1, "Program is required"),
  course: z.string().min(1, "Course is required"),
  moduleType: z.string().min(1, "Module Type is required"), // ✅ Added moduleType (optional)
  module: z.string().min(1, "Module is required"),
  courseType: z.string().min(1, "Course Type is required"),
  duration: z.string().min(1, "Duration Type is required"),
});

interface Course {
  id: number;
  src: string;
  title: string;
  days: string;
  branch: string;
  module: string;
  coursestype: string;
  durations: string;
  price: string;
  moreinfo: string;
  buynow: string;
  link: string;
}

const CoursesList: Course[] = [
  {
    id: 1,
    src: "/images/course.webp",
    title: "CELPIP | General",
    days: "CELPIP | 90 DAYS",
    branch: "Ambala",
    module: "LISTENING, READING, SPEAKING, WRITING",
    coursestype: "Day Course, Evening Course, Morning Course",
    durations: "90 Days",
    price: "INR 14500",
    moreinfo: "More Information",
    buynow: "INR 11441",
    link: "/practice-packs/value-pack",
  },
  {
    id: 2,
    src: "/images/course.webp",
    title: "Ilets",
    days: "ILETS | 90 DAYS",
    branch: "Ambala",
    module: "LISTENING, READING, SPEAKING, WRITING",
    coursestype: "Day Course, Evening Course, Morning Course",
    durations: "90 Days",
    price: "INR 14500",
    moreinfo: "More Information",
    buynow: "INR 11441",
    link: "/practice-packs/value-pack",
  },
  {
    id: 3,
    src: "/images/course.webp",
    title: "CELPIP | General",
    days: "CELPIP | 90 DAYS",
    branch: "Ambala",
    module: "LISTENING, READING, SPEAKING, WRITING",
    coursestype: "Day Course, Evening Course, Morning Course",
    durations: "90 Days",
    price: "INR 14500",
    moreinfo: "More Information",
    buynow: "INR 11441",
    link: "/practice-packs/value-pack",
  },
  {
    id: 4,
    src: "/images/course.webp",
    title: "Ilets",
    days: "ILETS | 90 DAYS",
    branch: "Ambala",
    module: "LISTENING, READING, SPEAKING, WRITING",
    coursestype: "Day Course, Evening Course, Morning Course",
    durations: "90 Days",
    price: "INR 14500",
    moreinfo: "More Information",
    buynow: "INR 11441",
    link: "/practice-packs/value-pack",
  },
  {
    id: 5,
    src: "/images/course.webp",
    title: "CELPIP | General",
    days: "CELPIP | 90 DAYS",
    branch: "Ambala",
    module: "LISTENING, READING, SPEAKING, WRITING",
    coursestype: "Day Course, Evening Course, Morning Course",
    durations: "90 Days",
    price: "INR 14500",
    moreinfo: "More Information",
    buynow: "INR 11441",
    link: "/practice-packs/value-pack",
  },
  {
    id: 6,
    src: "/images/course.webp",
    title: "Ilets",
    days: "ILETS | 90 DAYS",
    branch: "Ambala",
    module: "LISTENING, READING, SPEAKING, WRITING",
    coursestype: "Day Course, Evening Course, Morning Course",
    durations: "90 Days",
    price: "INR 14500",
    moreinfo: "More Information",
    buynow: "INR 11441",
    link: "/practice-packs/value-pack",
  },
  {
    id: 7,
    src: "/images/course.webp",
    title: "CELPIP | General",
    days: "CELPIP | 90 DAYS",
    branch: "Ambala",
    module: "LISTENING, READING, SPEAKING, WRITING",
    coursestype: "Day Course, Evening Course, Morning Course",
    durations: "90 Days",
    price: "INR 14500",
    moreinfo: "More Information",
    buynow: "INR 11441",
    link: "/practice-packs/value-pack",
  },
];

const OnlineCourse: React.FC = () => {
  const [showCoursesMain, setShowCoursesMain] = useState(false);

  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showProgramForm, setShowProgramForm] = useState(false); // Added to track program form visibility

  const [showAdvancedForm, setShowAdvancedForm] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedModuleType, setSelectedModuleType] = useState<string | null>(
    null
  );
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedCourseType, setselectedCourseType] = useState<string | null>(
    null
  );
  const [selectedDuration, setselectedDuration] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program: "",
      course: "",
      moduleType: "", // ✅ Added moduleType default value
      module: "",
      courseType: "",
      duration: "",
    },
  });

  const handleProgramChange = (value: string) => {
    setSelectedProgram(value);
    form.setValue("program", value);
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    form.setValue("course", value);
    form.clearErrors("course"); // ✅ Clears the error once a course is selected
  };

  const handleNext = () => {
    setShowCourseForm(false);
    setShowProgramForm(true);
  };

  const handleSearch = async () => {
    const isValid = await form.trigger(["course", "program"]); // Validate fields
    if (!isValid) return; // If validation fails, stop execution

    setSearchClicked(true);
    setShowCoursesMain(true);
    setShowProgramForm(false);
    setShowAdvancedForm(false); // Ensure advanced search is initially hidden
  };

  const handleBack = () => {
    setShowProgramForm(false);
    setShowCourseForm(true);
  };
  const handleBackAdvanced = () => {
    setShowAdvancedForm(false);
    setShowCoursesMain(true);
  };

  const handleAdvancedSearch = () => {
    setShowAdvancedForm(true);
    setShowCoursesMain(false);
  };

  const handleModuleTypeChange = (value: string) => {
    setSelectedModuleType(value);
    form.setValue("moduleType", value);
    form.clearErrors("moduleType"); // ✅ Clear validation error when a value is selected
  };
  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    form.setValue("module", value);
    form.clearErrors("module"); // ✅ Clear validation error when a value is selected
  };
  const handleCourseTypeChange = (value: string) => {
    setselectedCourseType(value);
    form.setValue("courseType", value); // ✅ Correct field updated
    form.clearErrors("courseType"); // ✅ Clear validation error when a value is selected
  };
  const handleDurationChange = (value: string) => {
    setselectedDuration(value);
    form.setValue("duration", value); // ✅ Correct field updated
    form.clearErrors("duration"); // ✅ Clear validation error when a value is selected
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="online-course-section common-courses py-6 flex flex-col">
      <div className="container m-auto py-40">
        <div className="courses-content">
          <h2>Practice Packs</h2>
          <h3>Let&apos;s Find Your Courses. What are you looking for?</h3>
        </div>

        <div className="m-auto w-full mt-10 form-middle-container overflow-hidden">
          {!showProgramForm && !showAdvancedForm && !searchClicked && isClient && (
            <motion.div
              initial={{ x: -2000 }} // ✅ Keeps animation simple
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.8 }}
            >
              <Form {...form}>
                <form className="m-auto w-2/5">
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>Select Your Course</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleCourseChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CELPIP">CELPIP</SelectItem>
                            <SelectItem value="DUOLINGO">DUOLINGO</SelectItem>
                            <SelectItem value="IELTS">IELTS</SelectItem>
                            <SelectItem value="PTE">PTE</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
                {selectedCourse && (
                  <div className="flex !justify-end w-2/5 m-auto common-button-rows">
                    <Button
                      onClick={handleNext}
                      variant="link"
                      className="mt-4 !p-0"
                    >
                      Next <i className="fa fa-angle-right"></i>
                    </Button>
                  </div>
                )}
              </Form>
            </motion.div>
          )}

          {showProgramForm && isClient && (
           <motion.div
              initial={{ x: 2000 }} // ✅ Keeps animation simple
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.8 }}
            >
              <Form {...form}>
                <form className="mb-5 m-auto w-2/5">
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>Select Your Program</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleProgramChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="General Traning">
                              General Training
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <div className="common-button-rows w-2/5 m-auto">
                <Button
                  onClick={handleBack}
                  variant="link"
                  className="back-btn !p-0"
                >
                  <i className="fa fa-angle-left"></i> Back
                </Button>
                <Button
                  onClick={handleSearch}
                  className="ml-4 !p-0"
                  variant="link"
                >
                  Search <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Branch & Course Display After Search */}
          {/* Show Branch & Course Selection Summary */}
          {(searchClicked || form || showCourseForm || showAdvancedForm) && (
            <ul className="flex justify-center branches-course-list">
              {selectedCourse && <li>Course: {selectedCourse}</li>}
              {selectedProgram && <li>Program: {selectedProgram}</li>}
              {selectedModuleType && <li>Module Type: {selectedModuleType}</li>}
              {selectedModule && <li>Module: {selectedModule}</li>}
              {selectedCourseType && <li>Course Type: {selectedCourseType}</li>}
              {selectedDuration && <li>Duration: {selectedDuration}</li>}
            </ul>
          )}

          {/* Show Advanced Search & Reset Buttons AFTER Search */}
          {searchClicked && !showCourseForm && (
            <div className="advanced-reset-btn flex gap-5">
              {!showAdvancedForm && (
                <>
                  <Button
                    onClick={handleAdvancedSearch}
                    className="advanced-search"
                  >
                    Advanced Search
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAdvancedForm(false); // Hide advanced search
                      setShowCourseForm(false); // Hide course selection form
                      setShowCoursesMain(false); // Hide course list
                      setSearchClicked(false); // Reset search state

                      // Reset all selections
                      setSelectedProgram(null);
                      setSelectedCourse(null);
                      setSelectedModuleType(null);
                      setSelectedModule(null);
                      setselectedCourseType(null); // ✅ Reset Course Type
                      setselectedDuration(null); // ✅ Reset Duration

                      // Reset form values explicitly
                      form.reset({
                        program: "",
                        course: "",
                        moduleType: "",
                        module: "",
                        courseType: "",
                        duration: "",
                      });
                    }}
                    className="reset-btn"
                  >
                    Reset
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Advanced Search Form */}
          {showAdvancedForm && (
            <Form {...form}>
              <form className="flex flex-col gap-10">
                <div className="flex gap-5 mt-10 advanced-form">
                  <FormField
                    control={form.control}
                    name="moduleType"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>Select Module Type</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleModuleTypeChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Module Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Module</SelectItem>
                            <SelectItem value="only">Only Module</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="module"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>Select Module</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleModuleChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Module" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Listening">Listening</SelectItem>
                            <SelectItem value="Reading">Reading</SelectItem>
                            <SelectItem value="Speaking">Speaking</SelectItem>
                            <SelectItem value="Writing">Writing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Course Type Selection */}
                  <FormField
                    control={form.control}
                    name="courseType"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>Select Course Type</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleCourseTypeChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Course Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Morning Course">
                              Morning Course
                            </SelectItem>
                            <SelectItem value="Day Course">
                              Day Course
                            </SelectItem>
                            <SelectItem value="Evening Course">
                              Evening Course
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Duration Selection */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>Select Duration</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleDurationChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30 Days">30 Days</SelectItem>
                            <SelectItem value="60 Days">60 Days</SelectItem>
                            <SelectItem value="90 Days">90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Advanced Search & Reset Buttons */}
                <div className="common-button-rows">
                  <Button
                    className="!p-0"
                    onClick={handleBackAdvanced}
                    variant="link"
                  >
                    <i className="fa fa-angle-left"></i> Back
                  </Button>
                  <Button
                    className="!p-0"
                    variant="link"
                    onClick={form.handleSubmit(() => {
                      setShowCoursesMain(true); // ✅ Show courses only if form is valid
                      setShowAdvancedForm(false); // ✅ Hide advanced form after search
                    })}
                  >
                    Search <i className="fa fa-angle-right"></i>
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>

      {/* Courses List (Slides Up) */}
      {showCoursesMain && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="container m-auto courses-main-cont"
        >
          <div className="courses-box-container flex flex-wrap gap-4 pb-20">
            {CoursesList.map((courses) => (
              <div key={courses.id} className="w-1/3 common-coaching-box">
                <Card className="courses-box p-4 rounded-xl border bg-card shadow">
                  <CardContent className="p-0">
                    <Link href={courses.link} className="no-underline">
                      <div className="course-img">
                        <CommonImage
                          src={courses.src}
                          alt={courses.title}
                          width={500}
                          height={500}
                          classname="cursor-pointer w-full"
                        />
                      </div>
                      <div className="courses-heading text-center">
                        <h2>{courses.title}</h2>
                        <p>{courses.days}</p>
                      </div>
                      <div className="courses-list">
                        <ul className="my-5">
                          <li>
                            <p>Program: {courses.branch}</p>
                          </li>
                          <li>
                            <p>Module: {courses.module}</p>
                          </li>
                          <li>
                            <p>Course Type: {courses.coursestype}</p>
                          </li>
                          <li>
                            <p>Duration: {courses.durations}</p>
                          </li>
                          <li>
                            <p>Price: {courses.price}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="courses-btn-box flex justify-between items-center">
                        <p className="!text-sm">{courses.moreinfo}</p>
                        <Button className="courses-btn">
                          Buy Now: {courses.buynow}
                        </Button>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OnlineCourse;
