"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useState } from "react";
import useEffectOnce from "@/lib/use-effect-once";
import { errorHandler } from "@/handlers/error-handler";
import { useToast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [clubs, setClubs] = useState([]);

  const { toast } = useToast();

  useEffectOnce(() => {
    (async () => {
      try {
        const response = await axios.get("/clubs");

        setClubs(response.data);
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

  console.log(clubs);

  return (
    <main className="container max-w-8xl min-h-screen mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clubs</h1>

        <div className="flex items-center gap-4">
          <Link href="/dashboard/clubs/create">
            <Button className="btn btn-primary">Create a Club</Button>
          </Link>
        </div>
      </div>

      <section className="mt-8">
        {clubs && <DataTable data={clubs} columns={columns} searchKey="name" />}
      </section>
    </main>
  );
};

export default Page;
