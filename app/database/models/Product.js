import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // vendor: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  description: String,
  price: Number,
  category: String,
  views: { type: Number, default: 0 },
  img: [String],
  negotiable: Boolean,
  createdAt: {
    type: Date,
    default: Date(),
  },
  updatedAt: {
    type: Date,
    default: Date(),
  },
});

// const Product =
//   mongoose.models["Product"] || mongoose.model("Product", productSchema);

// export default Product;
export { productSchema };
