import mongoose from "mongoose";

let Saleentry = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  entryBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Signuser",
    required: true,
  },
});

export default mongoose.model("Saleentry", Saleentry);
