"use client";

import { Button } from "@/components/ui/button";
import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";
import useEffectOnce from "@/lib/use-effect-once";
import Link from "next/link";
import { useState } from "react";
import { ConfirmDialog } from "./components/confirm-dialog";
import { useToast } from "@/components/ui/use-toast";
import AdminsTable from "./components/admins-table";

const Page = ({ params }) => {
  const [clubData, setClubData] = useState({});
  const { toast } = useToast();

  useEffectOnce(() => {
    (async () => {
      try {
        const response = await axios.get(`/clubs/${params.id}`);

        setClubData(response.data);
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

  console.log(clubData);

  if (!clubData) return null;

  return (
    <main className="container max-w-8xl min-h-screen mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{clubData.name}</h1>

        <div className="flex items-center gap-4">
          <Link href={`/dashboard/clubs/${params.id}/edit`}>
            <Button variant="secondary" className="px-4">
              Edit Club
            </Button>
          </Link>

          <ConfirmDialog clubData={clubData} toast={toast} />
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Name</h2>
        <p>{clubData.name}</p>

        <h2 className="text-xl font-semibold mt-4">Description</h2>
        <p>{clubData.description}</p>

        <h2 className="text-xl font-semibold mt-4">Admins</h2>
        <AdminsTable admins={clubData.admins} params={params} />
      </section>
    </main>
  );
};

export default Page;
