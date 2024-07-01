"use client";

import axios from "@/lib/axios";
import { errorHandler } from "@/handlers/error-handler";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import useEffectOnce from "@/lib/use-effect-once";
import { getCookie } from "cookies-next";

export default function Page() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const user = getCookie("user");
  const userId = user && JSON.parse(user)?.userId;

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

  return (
    <main className="container max-w-8xl min-h-screen mt-8">
      <section className="h-[50vh] relative isolate">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-sm text-gray-600">View your profile details.</p>

        <h2 className="mt-4 text-xl">Welcome, {data?.name}!</h2>
      </section>
    </main>
  );
}
