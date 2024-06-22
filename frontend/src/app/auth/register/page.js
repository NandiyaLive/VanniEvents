"use client";

import Logo from "@/src/components/logo";
import Image from "next/image";
import RegisterForm from "./components/register-form";

const Page = () => {
  return (
    <main className="h-screen grid grid-cols-2">
      <section className="h-full w-full relative">
        <Image
          src="https://source.unsplash.com/bzdhc5b3Bxs"
          layout="fill"
          objectFit="cover"
          alt="Student Image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div>
            <Logo className="mb-4" />
            <h1 className="text-white text-6xl font-bold">
              Welcome to
              <br />
              the community!
            </h1>
          </div>
        </div>
      </section>

      <section className="container my-4 flex items-center justify-center w-full max-w-2xl">
        <RegisterForm />
      </section>
    </main>
  );
};

export default Page;
