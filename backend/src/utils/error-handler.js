const errorHandler = (err, res) => {
  // console.log(err);

  if (err.name === "ZodError") {
    const errorMessages = err.errors.map((issue) => ({
      error: "Validation Error",
      field: issue.path.join("."),
      message: issue.message,
    }));
    res
      .status(400)
      .json({ error: "Validation Error", messages: errorMessages });
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    res.status(400).json({
      error: "Duplicate Field Error",
      message: `Duplicate field value entered: ${key}`,
    });
  } else {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export default errorHandler;
