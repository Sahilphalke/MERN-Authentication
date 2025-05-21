const { signup, login } = require("../Controllers/AuthController");
const {
  signupvalidation,
  loginvalidation,
} = require("../Middlewares/AuthValidation");
const router = require("express").Router();

router.post("/login", loginvalidation, login);
router.post("/signup", signupvalidation, signup);

module.exports = router;
