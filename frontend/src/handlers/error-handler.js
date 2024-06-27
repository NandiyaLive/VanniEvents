export const errorHandler = (error) => {
  let errorMessage;

  if (error?.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else {
    errorMessage = error.message;
  }

  console.log(errorMessage);

  return errorMessage;
};
