"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "@/lib/axios";
import { errorHandler } from "@/handlers/error-handler";
import { useToast } from "@/components/ui/use-toast";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
  seats: z.coerce.number().min(1, { message: "Seats is required" }),
  reg_start: z.string().min(1, { message: "Registration Start is required" }),
  deadline: z.string().min(1, { message: "Deadline is required" }),
  auto_approve: z.boolean().optional(),
});

const Page = ({ params }) => {
  const { toast } = useToast();
  const [crietrias, setCrietrias] = useState([
    {
      faculty: "faculty",
      values: ["FAS", "FOBS", "FOTS"],
    },
    {
      crietria: "department",
      values: {
        FAS: ["Physical", "Bio"],
        FOBS: ["Project Management", "Accounting"],
        FOTS: ["Technology"],
      },
    },
    {
      crietria: "level",
      values: [1, 2, 3, 4],
    },
  ]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      auto_approve: true,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toISOString().split("T")[1].slice(0, 5),
      reg_start: new Date().toISOString().split("T")[0],
      deadline: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (values) => {
    values.clubId = params.id;
    values.crietrias = [
      {
        crietria: "department",
        values: ["Physical"],
      },
    ];

    console.log(values);

    try {
      await axios.post("/events", values);

      toast({
        title: "Event created successfully.",
        description: `The event "${values.name}" has been created successfully.`,
      });
    } catch (error) {
      const errorMessage = errorHandler(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };

  return (
    <main className="container max-w-8xl min-h-screen mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create Event</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-8 flex flex-col gap-4 max-w-2xl mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="IEEEXtreme '24" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <Input placeholder="ieeextreme-24" {...field} />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        const eventName = form.getValues("name");

                        if (eventName) {
                          form.setValue(
                            "slug",
                            eventName.toLowerCase().replace(/ /g, "-")
                          );
                        }
                      }}
                    >
                      <RefreshCcw size={16} />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            className="col-span-2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="IEEEXtreme is a global challenge in which teams of student members, advised and proctored by an IEEE member, compete in a 24-hour time span against each other to solve a set of programming problems."
                    rows="5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="TLH 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seats</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="criteria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Criteria</FormLabel>
                <FormControl>
                  <Input placeholder="Department" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reg_start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Start</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="auto_approve"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Auto Approve</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex items-center w-full gap-4 mt-4">
            <Button
              type="reset"
              variant="destructive"
              className="w-full"
              onClick={form.reset}
            >
              Reset
            </Button>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default Page;
