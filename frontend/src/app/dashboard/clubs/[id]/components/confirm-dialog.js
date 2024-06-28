"use client";

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
import { Button } from "@/components/ui/button";
import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ConfirmDialog({ clubData, toast }) {
  const { router } = useRouter();

  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/clubs/${id}`);

      toast({
        variant: "success",
        title: "Club deleted successfully.",
        description: `Club ${clubData.name} has been deleted.`,
      });

      setOpen(false);
      router.push("/dashboard/clubs");
    } catch (error) {
      const errorMessage = errorHandler(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="px-4">
          Delete Club
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-end gap-4">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>

          <Button
            variant="destructive"
            onClick={() => handleDelete(clubData._id)}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
