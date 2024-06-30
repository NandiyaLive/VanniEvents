"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Suspense, useEffect, useState } from "react";
import { errorHandler } from "@/handlers/error-handler";
import { useToast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";

const Page = ({ params }) => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [clubId, setClubId] = useState(null);

  const { toast } = useToast();

  const userData = getCookie("user");
  const userId = user && user.userId;

  const getClubId = async (userId) => {
    if (!userId) return;

    try {
      const response = await axios.get(`/clubs?userId=${userId}`);

      setClubId(response.data._id);
    } catch (error) {
      const errorMessage = errorHandler(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(`/clubs/${clubId}/events`);

      setEvents(response.data);
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
    if (userData) {
      setUser(JSON.parse(userData));

      if (userId) {
        getClubId(userId);
      }
    }
  }, []);

  useEffect(() => {
    getClubId(userId);
  }, [userId]);

  useEffect(() => {
    if (clubId) {
      getEvents();
    }
  }, [clubId]);

  return (
    <main className="container max-w-8xl min-h-screen mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events</h1>

        <div className="flex items-center gap-4">
          <Link href={`/dashboard/events/create`}>
            <Button className="btn btn-primary">Create an Event</Button>
          </Link>
        </div>
      </div>

      <section className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          {events && (
            <DataTable data={events} columns={columns} searchKey="name" />
          )}
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
