const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RegisterAdminBro = require("../models/registerModal");

const loginUser = asyncHandler(async (req, res) => {
  res.send("Login Successfully!");
});

const RegisterUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  console.log(email);

  // Use findOne to check for the existing user
  const findEmail = await User.findOne({ email: email });

  if (!findEmail) {
    const newUser = await User.create(req.body); // Make sure to await the creation
    res.send({
      msg: "Registered successfully",
      status: true,
      data: newUser,
    });
  } else {
    res.send({
      msg: "User already exists",
      status: false,
    });
  }
});

const AdminRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await RegisterAdminBro.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await RegisterAdminBro.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "Registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error registering user", error: error.message });
  }
});

const AdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegisterAdminBro.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "JWT_SECRET=UdkjH$86LkNd9&2bq%!#kDJf61m2K2d@aP1!",
      {
        expiresIn: "1h",
      }
    );
    res.json({ status: true, msg: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "Error logging in", error: error.message });
  }
});
const AdminGetAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the User collection
    res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Failed to fetch users",
      error: error.message,
    });
  }
});

const DeleteUserBooking = asyncHandler(async (req, res) => {
  const { id } = req.params; // Destructure id from req.params

  try {
    const user = await User.findByIdAndDelete(id); // Delete the user by ID

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      msg: "Deleted Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Failed to delete booking data",
      error: error.message,
    });
  }
});

module.exports = {
  loginUser,
  RegisterUser,
  AdminLogin,
  AdminRegister,
  AdminGetAllUser,
  DeleteUserBooking,
};
