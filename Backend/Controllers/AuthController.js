const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist , You can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "signup Succesfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error ", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMessage = "Authentication failed email and password is Wrong";
    if (!user) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      message: "Login Succesfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error ", success: false });
  }
};

module.exports = { signup, login };
