import mongoose from "mongoose";
import { productSchema } from "./Product";
import { serviceSchema } from "./Service";
import { eventSchema } from "./Event";
import { houseSchema } from "./House";

const UserSchema = new mongoose.Schema({
  name: String,
  businessName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phone: String,
  matric: String,
  isStudent: {
    type: Boolean,
    default: false,
  },
  products: [productSchema],
  services: [serviceSchema],
  events: [eventSchema],
  houses: [houseSchema],
  createdAt: { type: Date, default: Date() },
  updatedAt: { type: Date, default: Date() },
});

let User = mongoose.models["User"] || mongoose.model("User", UserSchema);

export default User;
