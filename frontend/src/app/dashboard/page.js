"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <main className="container max-w-8xl min-h-screen mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex items-center gap-4">
          <Link href="/dashboard/events/create">
            <Button className="btn btn-primary">Create Event</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
