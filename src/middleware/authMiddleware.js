import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect routes – user must be logged in
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Not authorized, user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      message: "Not authorized, token invalid or expired",
    });
  }
};

/**
 * Admin-only access
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }

  return res.status(403).json({
    message: "Admin access required",
  });
};
