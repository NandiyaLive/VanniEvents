
const Page = ({ params }) => {
  return (
    <main className="container max-w-8xl min-h-screen mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{params.id}</h1>
      </div>
    </main>
  );
};

export default Page;
