import jwt from "jsonwebtoken";

/**
 * Generate JWT token
 * @param {string} userId - MongoDB user _id
 * @param {string} role - user role (admin/user)
 * @returns {string} JWT token
 */
const generateToken = (userId, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;
