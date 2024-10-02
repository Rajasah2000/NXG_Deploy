const express = require('express');
const { loginUser, RegisterUser } = require('../../controller.js/userController');

const router = express.Router();

router.get('/user/login',loginUser);
router.post('/user/register',RegisterUser)

module.exports = router;