const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.post("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: "100000",
    },
    {
      name: "laptop",
      price: "500000",
    },
  ]);
});

module.exports = router;
