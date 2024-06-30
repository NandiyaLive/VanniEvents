"use client";

import { errorHandler } from "@/handlers/error-handler";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

const Footer = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get();
        if (response.status === 200) {
          setStatus(true);
        }
      } catch (error) {
        setStatus(false);
        errorHandler(error);
      }
    })();
  }, []);

  return (
    <footer className="border-t text-sm">
      <section className="flex items-center justify-between py-4 container max-w-8xl">
        <p>&copy; {new Date().getFullYear()} Vanni Events</p>
        <div className="flex items-center gap-2">
          <p>API Status: </p>
          <p>
            {status ? (
              <span className="text-green-500">Online</span>
            ) : (
              <span className="text-red-500">Offline</span>
            )}
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
