import axios from "@/lib/axios";

export const getEvents = async () => {
  const response = await axios.get("/events");

  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`/events/${id}`);

  return response.data;
};
