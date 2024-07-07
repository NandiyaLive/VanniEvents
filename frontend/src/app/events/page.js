"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "@/lib/axios";
import { errorHandler } from "@/handlers/error-handler";
import { useToast } from "@/components/ui/use-toast";
import { Suspense, useEffect, useState } from "react";
import { truncate } from "@/lib/utils";

export default function Page() {
  const { toast } = useToast();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/events");
      setData(response.data);
    } catch (error) {
      const errorMessage = errorHandler(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="container max-w-8xl min-h-screen mt-8">
      <section className="mx-auto my-12">
        <h2 className="text-3xl font-semibold text-gray-900">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Suspense fallback={<div>Loading...</div>}>
            {data?.map((event) => (
              <Link key={event._id} href={`/events/${event._id}`}>
                <div className="bg-white border rounded-lg p-4">
                  <div className="relative h-40">
                    <Image
                      src="https://pbs.twimg.com/media/GP2vQB9aYAAvKbp?format=jpg&name=large"
                      alt={event.name}
                      className="w-full h-full object-cover rounded-lg"
                      fill
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50">
                      <h3 className="text-xl font-semibold">{event.name}</h3>
                      <p className="mt-2 text-sm">
                        {new Date(event.date).toDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700">
                      {truncate(event.description, 100)}
                    </p>
                    <p className="mt-2 text-gray-500">
                      By {event.organizer?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </Suspense>
        </div>
      </section>
    </main>
  );
}
