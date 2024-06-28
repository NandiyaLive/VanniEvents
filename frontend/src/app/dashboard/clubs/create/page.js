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
import axios from "@/lib/axios";
import { errorHandler } from "@/handlers/error-handler";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import useEffectOnce from "@/lib/use-effect-once";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [admins, setAdmins] = useState([]);
  const [clubAdmins, setClubAdmins] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffectOnce(() => {
    (async () => {
      try {
        const response = await axios.get("/users?role=admin");

        setAdmins(response.data);
      } catch (error) {
        const errorMessage = errorHandler(error);

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMessage,
        });
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    if (clubAdmins.length === 0) {
      form.setError("admins", {
        message: "Please select at least one admin",
      });

      setTimeout(() => {
        form.clearErrors("admins");
      }, 5000);

      return;
    }

    values.admins = clubAdmins;

    try {
      const response = await axios.post("/clubs", values);

      toast({
        title: "Club Created",
        description: `Club ${response.data.name} has been created successfully`,
      });

      form.reset();
      router.push(`/dashboard/clubs`);
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
        <h1 className="text-3xl font-bold">Create a Club</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-8 flex flex-col max-w-3xl gap-4 mx-auto border p-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Mozilla Campus Club" {...field} />
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
                <FormLabel>
                  Slug <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <Input placeholder="mozilla-campus-club" {...field} />
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
                      Generate
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
                    placeholder="A Mozilla University & College Club is a group of students with a passion for technology who meet regularly to advance this mission by building and innovating on open source projects that keep the web open."
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
            name="admins"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>
                    Club Admins <span className="text-red-500">*</span>
                  </FormLabel>
                </div>

                {admins.map((admin) => (
                  <FormField
                    key={admin._id}
                    name="admins"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={admin._id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={clubAdmins.includes(admin._id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setClubAdmins([...clubAdmins, admin._id]);
                                } else {
                                  setClubAdmins(
                                    clubAdmins.filter((id) => id !== admin._id)
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {admin.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
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
