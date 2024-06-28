import Image from "next/image";
import eventImage from "@public/event.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommunitySvg from "./components/community-svg";

const eventsList = [
  {
    name: "Google I/O 2024",
    date: "2024-01-01",
    description:
      "Google I/O 2024 is an annual developer conference hosted by Google, featuring product announcements, technical sessions, and hands-on workshops.",
    by: "Google",
    image: "https://pbs.twimg.com/media/GNpgcvNWsAAdluM?format=jpg&name=medium",
  },
  {
    name: "Microsoft Build 2024",
    date: "2024-02-15",
    description:
      "Microsoft Build 2024 is an annual conference for developers and IT professionals hosted by Microsoft, showcasing the latest in technology and innovation.",
    by: "Microsoft",
    image: "https://pbs.twimg.com/media/GOHSvAzb0AAw3iI?format=jpg&name=large",
  },
  {
    name: "Apple WWDC 2024",
    date: "2024-06-03",
    description:
      "Apple Worldwide Developers Conference (WWDC) 2024 is a virtual event where Apple unveils its latest software updates and tools for developers.",
    by: "Apple Inc.",
    image: "https://pbs.twimg.com/media/GP2vQB9aYAAvKbp?format=jpg&name=large",
  },
  {
    name: "IBM Think 2024",
    date: "2024-03-21",
    description:
      "IBM Think 2024 is a global conference for business and technology leaders, where IBM showcases its latest innovations in AI, cloud computing, and more.",
    by: "IBM",
    image: "https://pbs.twimg.com/media/GOGc87yWIAEr-Iw?format=jpg&name=large",
  },
  {
    name: "Adobe MAX 2024",
    date: "2024-10-20",
    description:
      "Adobe MAX 2024 is the creativity conference where Adobe unveils its latest software and tools for creative professionals around the world.",
    by: "Adobe",
    image:
      "https://pbs.twimg.com/media/GB5p2fgbEAA0UTa?format=jpg&name=4096x4096",
  },
];

export default function Home() {
  return (
    <>
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

            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="mt-4">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto my-20">
          <h2 className="text-3xl font-semibold text-gray-900">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {eventsList.map((event, index) => (
              <div key={index} className="bg-white border rounded-lg p-4">
                <div className="relative h-40">
                  <Image
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover rounded-lg"
                    fill
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50">
                    <h3 className="text-xl font-semibold">{event.name}</h3>
                    <p className="mt-2 text-sm">{event.date}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700">{event.description}</p>
                  <p className="mt-2 text-gray-500">By {event.by}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-20 p-16 bg-green-50 rounded-lg flex justify-between gap-20">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Join VanniEvents
            </h2>
            <p className="mt-2 text-gray-700">
              Students and clubs use VanniEvents to stay updated on university
              happenings, simplify event management, and foster community
              engagement. Membership is free and open to all university members.
            </p>

            <Link href="/auth/register">
              <Button size="lg" variant="destructive" className="mt-4">
                Get Started
              </Button>
            </Link>
          </div>
          <div>
            <CommunitySvg className="w-96 " />
          </div>
        </section>
      </main>

      <footer className="bg-neutral-700 shadow-md text-white">
        <div className="container mx-auto py-6 px-4 text-center">
          <p>&copy; 2024 VanniEvents. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
