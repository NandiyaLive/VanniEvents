export const errorHandler = (error) => {
  if (error?.response?.data?.error === "Internal Server Error") {
    return "Internal Server Error";
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  } else {
    return error.message;
  }
};
