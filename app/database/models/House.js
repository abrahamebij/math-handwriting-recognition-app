import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  // agent: { type: Schema.Types.ObjectId, ref: "User" },
  address: String,
  img: [String],
  rent: Number,
  description: String,
  location: String,
  houseType: String,
  createdAt: { type: Date, default: Date() },
  updatedAt: { type: Date, default: Date() },
});

// let House = mongoose.models["House"] || mongoose.model("House", houseSchema);

// export default House;
export { houseSchema };
