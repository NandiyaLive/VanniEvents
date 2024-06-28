"use client";

import { Button } from "@/components/ui/button";
import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      const userRole = row.row.original.role;

      return (
        <div className="flex items-center space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                disabled={userRole !== "user"}
              >
                Promote
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="text-left">
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will promote the user to an admin. Are you sure you want
                  to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row gap-2 justify-end">
                <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    onClick={() => {
                      handlePromote(userId);
                    }}
                  >
                    Continue
                  </Button>
                </AlertDialogTrigger>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
