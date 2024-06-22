import Image from "next/image";
import React from "react";
import { cn } from "../lib/utils";

const Logo = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src="/icon.png" width={30} height={30} alt="Logo" />
      <h1 className="text-2xl text-neutral-300">Vanni Events</h1>
    </div>
  );
};

export default Logo;
