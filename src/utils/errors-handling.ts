export const ErrorHandling = (error) => {
  const message = error.response.data.message;
  return message;
};
