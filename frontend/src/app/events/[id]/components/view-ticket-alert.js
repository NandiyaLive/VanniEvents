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
import QRCode from "react-qr-code";

export function ViewTicketAlert({ ticket }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="w-full">
          View Ticket
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your Ticket</AlertDialogTitle>
          <AlertDialogDescription>
            {ticket ? (
              <div className="flex flex-col items-center">
                <div className="border p-4 rounded-lg">
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={ticket.reference}
                    viewBox={`0 0 256 256`}
                  />
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Scan this QR code at the event entrance to check in.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="mt-4 text-sm text-gray-600">Loading ticket...</p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
