"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useState } from "react";
import useEffectOnce from "@/lib/use-effect-once";
import { errorHandler } from "@/handlers/error-handler";
import { useToast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";

const Page = () => {
  const [users, setUsers] = useState([]);

  const { toast } = useToast();

  useEffectOnce(() => {
    (async () => {
      try {
        const response = await axios.get("/users");

        setUsers(response.data);
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

  console.log(users);

  return (
    <main className="container max-w-8xl min-h-screen mt-4">
      <h1 className="text-3xl font-bold">Users</h1>

      <section>
        {users && <DataTable data={users} columns={columns} searchKey="name" />}
      </section>
    </main>
  );
};

export default Page;
