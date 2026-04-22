export default (error, req, res, next) => {
  console.error(error);
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";
  let errors = null;

  // Validation error (Mongoose)
  if (error.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(error.errors).map((el) => ({
      field: el.path || el.properties?.path,
      message: el.message,
    }));

    message = "Validation error";
  }

  // Duplicate key error
  if (error.code === 11000) {
    statusCode = 400;

    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];

    message = `${field} '${value}' already exists`;
  }

  return res.status(statusCode).json({
    message,
    ...(errors && { errors }),
  });
};
