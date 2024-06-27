"use client";

import { Button } from "@/components/ui/button";
import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";

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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Actions",
    cell: (row) => {
      const userId = row.row.original._id;

      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePromote(userId)}
          >
            Promote to Admin
          </Button>
        </div>
      );
    },
  },
];
