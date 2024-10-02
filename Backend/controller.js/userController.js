const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");

const loginUser = asyncHandler(async (req, res) => {
  res.send("Login Successfully!");
});

const RegisterUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findEmail = await User?.find({ email: email });
  if (!findEmail) {
    const newUser = User?.create(req?.body);
    res?.send({
      msg: "Register successfully",
      status: true,
      data: newUser,
    });
  } else {
    res?.send({
      msg: "User already exists",
      status: false,
    });
  }
});

module.exports = { loginUser, RegisterUser };
