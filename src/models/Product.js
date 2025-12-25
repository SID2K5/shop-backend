import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    stockHistory: [
      {
        previousQty: Number,
        newQty: Number,
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
