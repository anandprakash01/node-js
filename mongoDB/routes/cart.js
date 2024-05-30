const express = require("express");
const router = express.Router();

router.get("/items", (req, res) => {
  res.json({
    success: true,
    message: "This is /items end-point",
  });
});

module.exports = router;
