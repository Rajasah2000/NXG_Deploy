const express = require("express");
const {
  loginUser,
  RegisterUser,
  AdminRegister,
  AdminLogin,
  AdminGetAllUser,
  DeleteUserBooking,
} = require("../../controller.js/userController");

const router = express.Router();

router.get("/user/login", loginUser);
router.post("/user/register", RegisterUser);
router.post("/admin/register", AdminRegister);
router.post("/admin/login", AdminLogin);
router.get("/admin/getalluser", AdminGetAllUser);
router.delete("/admin/user-delete/:id", DeleteUserBooking);

module.exports = router;
