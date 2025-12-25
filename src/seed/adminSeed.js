// backend/src/seed/adminSeed.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    await User.create({
      name: "Admin",
      username: "admin",
      email: "admin@test.com",
      password: "Admin@123",
      role: "admin",
    });

    console.log("✅ Admin created");
    process.exit(0);
  } catch (err) {
    console.error("❌ Admin seed error:", err);
    process.exit(1);
  }
};

seedAdmin();
