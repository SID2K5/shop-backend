import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Admin", adminSchema);
