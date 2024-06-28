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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

const AdminsTable = ({ params, admins }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleRemoveAdmin = async (id) => {
    try {
      await axios.delete(`/clubs/${params.id}/admins/${id}`);

      router.refresh();
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
    <Table className="border border-gray-200 mt-4 w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {admins?.length ? (
          admins?.map((admin) => (
            <TableRow key={admin._id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="px-4">
                      Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-left">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-left">
                        This action cannot be undone. This will remove{" "}
                        <strong>{admin.name}</strong> from the list of admins.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-row items-center justify-end gap-4">
                      <AlertDialogCancel className="mt-0">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          onClick={() => handleRemoveAdmin(admin._id)}
                        >
                          Continue
                        </Button>
                      </AlertDialogTrigger>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="3">
              <p className="text-gray-500 text-center">No admins found.</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AdminsTable;
