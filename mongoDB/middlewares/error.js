const errorHandler = (req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong,Last middleware",
  });
};

module.exports = errorHandler;
