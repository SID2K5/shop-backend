import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ["CREATED", "UPDATED", "DELETED"],
      required: true,
    },
    previousQty: {
      type: Number,
      default: 0,
    },
    newQty: {
      type: Number,
      required: true,
    },
    change: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("StockHistory", stockHistorySchema);
