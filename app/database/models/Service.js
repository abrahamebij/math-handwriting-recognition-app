import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  // provider: { type: Schema.Types.ObjectId, ref: "User" }, // Link to the User model
  createdAt: { type: Date, default: Date() },
});

// let Service =
//   mongoose.models["Service"] || mongoose.model("Service", serviceSchema);

// export default Service;
export { serviceSchema };
