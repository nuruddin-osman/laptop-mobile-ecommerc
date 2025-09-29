const User = require("../../models/user/user.models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const { fullName, phone, email, password, dob, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists with this phone or email",
      });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // Create new user
      const user = new User({
        fullName,
        phone,
        email,
        password: hash,
        dob,
        gender,
      });
      await user
        .save()
        .then(async () => {
          return res.status(201).json({
            status: "success",
            message: "User create successfull",
            data: user,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: false,
            message: "User in not created",
          });
        });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });
    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "User is not found",
      });
    }

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!passwordCheck) {
      return res.status(400).json({
        status: false,
        message: "password did not match",
      });
    }

    const payload = {
      id: existingUser._id,
      phone: existingUser.phone,
      email: existingUser.email,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    const userWithoutPassword = { ...existingUser.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({
      status: true,
      message: "Login successfull",
      user: userWithoutPassword,
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
