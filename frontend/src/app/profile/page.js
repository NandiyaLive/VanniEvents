"use client";

import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";
import useEffectOnce from "@/lib/use-effect-once";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
  })
  .superRefine((data) => {
    if (data.oldPassword === data.newPassword) {
      throw new Error("New password must be different from old password");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(data.newPassword)) {
      throw new Error(
        "Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
    }
  });

export default function Page() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const user = getCookie("user");
  const userId = user && JSON.parse(user)?.userId;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/${userId}`);
      setData(response.data);
    } catch (error) {
      const errorMessage = errorHandler(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffectOnce(() => {
    fetchData();
  }, []);

  const onSubmit = async (values) => {
    try {
      await axios.post(`/users/${userId}/change-password`, {
        userId,
        ...values,
      });

      toast({
        title: "Password changed successfully!",
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
    <main className="container max-w-8xl min-h-screen mt-8">
      <section className="relative isolate">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-sm text-gray-600">View your profile details.</p>

        <h2 className="mt-4 text-xl">Welcome, {data?.name}!</h2>
      </section>

      {/* <section className="mt-8 border border-gray-200 p-4 rounded-lg max-w-sm">
        <h2 className="text-xl font-medium">Change Password</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </section> */}
    </main>
  );
}
