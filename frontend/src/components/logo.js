import { cn } from "../lib/utils";
import { CalendarClock } from "lucide-react";

const Logo = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CalendarClock size={24} />
      <h1 className="text-2xl text-neutral-800 font-semibold dark:text-neutral-300">
        Vanni Events
      </h1>
    </div>
  );
};

export default Logo;
