import { getEventById, getEvents } from "@/api/events";
import { useQuery } from "@tanstack/react-query";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};

export const useGetEventById = (id) => {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => getEventById(id),
  });
};
