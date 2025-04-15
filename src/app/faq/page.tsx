"use client";
import React, { useState, useEffect } from "react";
import CommonImage from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formSchema = z.object({
  search: z.string().optional(),
  Faqcategory: z.string().optional(),
  topics: z.string().optional(),
});

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  { id: "item-1", question: "Is it accessible?", answer: "Yes. It adheres to the WAI-ARIA design pattern.", category: "Visa Application Process" },
  { id: "item-2", question: "Is it styled?", answer: "Yes. It comes with default styles that match the other components aesthetic.", category: "Required Documents" },
  { id: "item-3", question: "Is it animated?", answer: "Yes. Its animated by default, but you can disable it if you prefer.", category: "Admission Requirements" },
];

const FAQ: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      Faqcategory: "",
      topics: "",
    },
  });

  const { watch, reset } = form;
  const [filteredFaqData, setFilteredFaqData] = useState(faqData);

  useEffect(() => {
    const searchQuery = watch("search")?.toLowerCase();
    const selectedCategory = watch("Faqcategory");

    const newFilteredData = faqData.filter((faq) => {
      const matchesSearch = searchQuery ? faq.question.toLowerCase().includes(searchQuery) : true;
      const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });

    setFilteredFaqData(newFilteredData);
  }, [watch("search"), watch("Faqcategory")]);

  return (
    <div className="faq-container">
      <div className="commonbanner-form py-10 items-center flex flex-col">
        <div className="container m-auto relative z-20">
          <h1 className="text-center">FAQ&apos;S</h1>
          <div className="webmeida-filter-box p-6 bg-white mt-5">
            <Form {...form}>
              <form className="flex gap-5 faq-form-box">
                <FormField control={form.control} name="search" render={({ field }) => (
                  <FormItem className="w-1/3 faq-form-row">
                    <FormControl>
                      <Input placeholder="Search" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="Faqcategory" render={({ field }) => (
                  <FormItem className="w-1/3 faq-form-row">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select FAQ Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Visa Application Process">Visa Application Process</SelectItem>
                          <SelectItem value="Required Documents">Required Documents</SelectItem>
                          <SelectItem value="Admission Requirements">Admission Requirements</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                {/* Topics Filter (Placeholder, as filtering is not yet connected) */}
                <FormField
                  control={form.control}
                  name="topics"
                  render={({ field }) => (
                    <FormItem className="w-1/3 faq-form-row">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admission Requirements">
                              Admission Requirements
                            </SelectItem>
                            <SelectItem value="Application Process">
                              Application Process
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" onClick={() => reset()} className="clear-filter-btn">
                  Clear
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="bgvector">
          <CommonImage classname="bg-cont" src="/images/background.webp" alt="Background" width={1938} height={624} />
        </div>
      </div>

      <div className="container m-auto py-10">
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full faq-accordian-container">
            {filteredFaqData.length > 0 ? (
              filteredFaqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="faq-content">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-center text-gray-500">No FAQs found.</p>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
