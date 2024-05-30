//Global Error handler

const asyncFunction = fn => {
  return (req, res, next) => {
    fn(req, res).catch(err => {
      console.log("ERROR OCCURED", err.message);

      // res.status(500).json({
      //   success: false,
      //   message: `Something went wrong please try again later, Error occured: ${err.message}`,
      // });
      next(); //this will go to next available middleware
    });
  };
};

module.exports = {
  asyncFunction,
};
