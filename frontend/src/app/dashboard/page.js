import { Button } from "@/src/components/ui/button";

const Page = () => {
  return (
    <main className="container max-w-8xl min-h-screen mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button className="btn btn-primary">Create Post</Button>
      </div>
    </main>
  );
};

export default Page;
