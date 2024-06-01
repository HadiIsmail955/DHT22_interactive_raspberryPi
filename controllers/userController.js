const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { userName, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await user.create({
      userName,
      password: hashedPassword,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function loginUser(req, res) {
  const { userName, password } = req.body;

  try {
    // Input validation
    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const userModel = await user.findOne({ where: { userName } });
    if (!userModel) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, userModel.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const oneDayInSeconds = 24 * 60 * 60;
    const token = jwt.sign(
      { userId: userModel.id, role: userModel.role },
      process.env.JWT_SECRET,
      { expiresIn: oneDayInSeconds }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      id: userModel.id,
      role: userModel.role,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await user.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

module.exports = { createUser, loginUser, getAllUsers };
