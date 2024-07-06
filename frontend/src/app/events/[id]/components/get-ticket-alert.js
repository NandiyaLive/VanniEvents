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
import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";

export function GetTicketAlert({ event, userId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleGetTicket = async (e) => {
    setLoading(true);

    try {
      console.log(userId, event._id); // eslint-disable-line no-console

      await axios.post("/tickets", {
        userId,
        eventId: event._id,
      });

      toast({
        variant: "success",
        title: "Ticket purchased!",
        description: `Your ticket has been successfully purchased for ${event.name}.`,
      });

      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      const errorMessage = errorHandler(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="w-full">
          Get Ticket
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to apply for a ticket to the event{" "}
            <strong>{event.name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-end gap-4">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <Button onClick={(e) => handleGetTicket(e)} isLoading={loading}>
            <LoaderPinwheel
              size={16}
              className={cn(
                "hidden",
                loading && "inline-flex mr-2 animate-spin"
              )}
            />
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
