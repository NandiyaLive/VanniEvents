"use client";

import Image from "next/image";
import eventImage from "@public/event.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommunitySvg from "./components/community-svg";
import { useToast } from "@/components/ui/use-toast";
import { truncate } from "@/lib/utils";
import { useGetEvents } from "@/hooks/events";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { toast } = useToast();

  const dataQuery = useGetEvents();
  const { data, isLoading, error } = dataQuery;

  if (error) {
    toast({
      title: "Error",
      description: "Failed to fetch events",
      status: "error",
    });
  }

  console.log(data)

  return (
    <main className="container max-w-8xl min-h-screen mt-8">
      <section className="h-[50vh] relative isolate">
        <Image
          src={eventImage}
          alt="University"
          className="w-full h-full object-cover rounded-lg"
          fill
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg z-10" />
        <div className="text-center absolute inset-0 flex flex-col items-center justify-center mt-40 text-white z-50">
          <h1 className="text-4xl font-bold ">VanniEvents</h1>
          <p className="mt-2 text-xl text-gray-300">
            Elevate Your Experience — Connect, Participate, Enjoy
          </p>

          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="mt-4">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto my-20">
        <h2 className="text-3xl font-semibold text-gray-900">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {isLoading ? (
            <>
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </>
          ) : (
            data?.map((event) => (
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
            ))
          )}
        </div>
      </section>

      <section className="my-20 p-16 bg-green-50 rounded-lg flex justify-between gap-20">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Join VanniEvents
          </h2>
          <p className="mt-2 text-gray-700">
            Students and clubs use VanniEvents to stay updated on university
            happenings, simplify event management, and foster community
            engagement. Membership is free and open to all university members.
          </p>

          <Link href="/auth/register">
            <Button size="lg" variant="destructive" className="mt-4">
              Get Started
            </Button>
          </Link>
        </div>
        <div>
          <CommunitySvg className="w-96 " />
        </div>
      </section>
    </main>
  );
}
