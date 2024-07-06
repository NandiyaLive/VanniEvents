import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import ReactQueryProvider from "./providers/react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vanni Events",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "-z-50")}>
        <ReactQueryProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
