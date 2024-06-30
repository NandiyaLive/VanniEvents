"use client";

import { Button } from "@/components/ui/button";
import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";
import Link from "next/link";

const handlePromote = async (id) => {
  try {
    const response = await axios.patch(`/users/${id}`, {
      role: "admin",
    });

    console.log(`User ${response.data.name} has been promoted to admin.`);
  } catch (error) {
    const errorMessage = errorHandler(error);

    console.log(errorMessage);
  }
};

const truncate = (str, n) => {
  if (!str) return "No description available.";
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const columns = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "decription",
    header: "Description",
    cell: (row) => {
      return <p>{truncate(row.row.original.description, 50)}</p>;
    },
  },
  {
    header: "Actions",
    cell: (row) => {
      const clubId = row.row.original._id;

      return (
        <div className="flex items-center space-x-2">
          <Link href={`/dashboard/events/${clubId}`}>
            <Button variant="secondary" size="sm" className="px-4">
              View
            </Button>
          </Link>
        </div>
      );
    },
  },
];
