"use client";

import Image from "next/image";
import axios from "@/lib/axios";
import { errorHandler } from "@/handlers/error-handler";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Map } from "lucide-react";
import { GetTicketAlert } from "./components/get-ticket-alert";
import useEffectOnce from "@/lib/use-effect-once";
import { getCookie } from "cookies-next";
import { ViewTicketAlert } from "./components/view-ticket-alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({ params }) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  const user = getCookie("user");
  const userId = user && JSON.parse(user)?.userId;

  const fetchData = async () => {
    try {
      const response = await axios.get(`/events/${params.id}`);
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

  const fetchTicketData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/tickets?userId=${userId}&eventId=${params.id}`
      );

      setTicketData(response.data);
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

  useEffect(() => {
    if (userId) {
      fetchTicketData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleRegistrationButtons();
  }, [userId]);

  const handleRegistrationButtons = () => {
    if (loading) {
      return (
        <Button size="lg" className="w-full" disabled>
          Loading...
        </Button>
      );
    }

    if (data?.ticketCount > data?.seats) {
      return (
        <Button size="lg" className="w-full" disabled>
          No Seats Available
        </Button>
      );
    }

    if (ticketData?._id) {
      return <ViewTicketAlert ticket={ticketData} />;
    }

    if (!ticketData && userId) {
      return <GetTicketAlert event={data} userId={userId} />;
    }

    return (
      <Link href="/auth/login" className="block">
        <Button size="lg" className="w-full">
          Login to Get Tickets
        </Button>
      </Link>
    );
  };

  return (
    <main className="container max-w-8xl min-h-screen mt-8">
      <section className="h-[50vh] relative isolate">
        <Image
          src="https://pbs.twimg.com/media/GP2vQB9aYAAvKbp?format=jpg&name=large"
          alt="University"
          className="w-full h-full object-cover rounded-lg"
          fill
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg z-10" />

        <h1 className="text-4xl font-bold text-white text-center absolute inset-0 flex flex-col items-center justify-center mt-40 z-50">
          {data?.name}
        </h1>
      </section>

      {data ? (
        <section className="mx-auto my-8 grid grid-cols-3 gap-8">
          <section className="col-span-2">
            <h4 className="text-2xl font-bold">Event Details</h4>
            <p className="mt-2 text-gray-600">{data?.description}</p>
          </section>

          <section className="col-span-1 space-y-4">
            <div className="border p-4 rounded-lg">
              <h5 className="text-xl font-bold">{data?.organizer.name}</h5>
              <p className="mt-2 text-gray-600">
                {data?.organizer.description}
              </p>
            </div>

            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <Clock size={24} />
                <div>
                  <p>
                    {new Date(data?.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>{data?.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <Map size={24} />
                <p>{data?.venue}</p>
              </div>
            </div>

            {handleRegistrationButtons()}
          </section>
        </section>
      ) : (
        <div className="my-8">Loading...</div>
      )}
    </main>
  );
}
