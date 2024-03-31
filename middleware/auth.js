require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Access denied. Token not provided." });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. Admin role required." });
    }
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Access denied. Invalid token." });
  }
}

async function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Access denied. Token not provided." });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role !== "admin" || decodedToken.role !== "user") {
      return res
        .status(403)
        .json({ error: "Access denied. User or Admin role required." });
    }
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Access denied. Invalid token." });
  }
}

module.exports = { authAdmin, auth };
