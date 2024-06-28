import Image from "next/image";
import eventImage from "@public/event.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container max-w-8xl min-h-screen mt-8">
      <section className="h-[50vh] relative isolate">
        <Image
          src={eventImage}
          alt="University"
          className="w-full h-full object-cover rounded-lg"
          fill
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg z-10" />
        <div className="text-center absolute inset-0 flex flex-col items-center justify-center mt-40 text-white z-50">
          <h1 className="text-4xl font-bold ">VanniEvents</h1>
          <p className="mt-2 text-xl text-gray-300">
            Elevate Your Experience — Connect, Participate, Enjoy
          </p>

          <Link href="/auth/login">
            <Button size="lg" variant="secondary" className="mt-4">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto my-12 p-8 ">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          What is VanniEvents?
        </h2>
        <p className="mt-6 text-gray-700 text-center">
          VanniEvents is a comprehensive platform designed to centralize all
          university events in one place. It caters to the needs of both
          students and clubs by simplifying the process of event discovery,
          registration, promotion, and management. By consolidating event
          information from various channels, VanniEvents ensures that students
          never miss out on exciting opportunities, while clubs can effectively
          reach their target audience and manage RSVPs with ease.
        </p>
      </section>

      <section className="mx-auto my-12 p-8 ">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          Why VanniEvents?
        </h2>
        <p className="mt-6 text-gray-700 text-center">
          Discover and participate in university events effortlessly. No more
          scattered event information across social media, posters, and multiple
          Google Forms. VanniEvents brings everything into one unified platform.
        </p>
      </section>

      <section className="mx-auto my-12 p-8 ">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          Key Features
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
              🎉
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              For Students
            </h3>
            <p className="mt-2 text-gray-600">
              Easily discover and register for all university events in one
              place.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
              📅
            </div>
            <h3 className="text-xl font-semibold text-gray-800">For Clubs</h3>
            <p className="mt-2 text-gray-600">
              Simplify event promotion and management by creating events and
              managing participant RSVPs on a single platform.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto my-12 p-8 ">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          Beneficiaries
        </h2>
        <div className="mt-6 grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
              👩‍🎓
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Students</h3>
            <p className="mt-2 text-gray-600">
              Save time and effort finding relevant events and avoid the hassle
              of multiple Google Forms.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl">
              🏢
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Clubs</h3>
            <p className="mt-2 text-gray-600">
              Increase event participation and streamline event management.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl">
              🏫
            </div>
            <h3 className="text-xl font-semibold text-gray-800">University</h3>
            <p className="mt-2 text-gray-600">
              Foster a more vibrant and engaged campus community.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-white shadow-md">
        <div className="container mx-auto py-6 px-4 text-center">
          <p className="text-gray-600">
            &copy; 2024 VanniEvents. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
