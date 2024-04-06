const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { userName, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
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

    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const oneDayInSeconds = 24 * 60 * 60;
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: oneDayInSeconds }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: oneDayInSeconds * 1000,
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

module.exports = { createUser, loginUser };
