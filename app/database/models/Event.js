import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  venue: String,
  ticketPrice: Number,
  description: String,
  // organizer: { type: Schema.Types.ObjectId, ref: "User" }, // Link to the User model
  createdAt: { type: Date, default: Date.now },
});

// let Event = mongoose.models["Event"] || mongoose.model("Event", eventSchema);

// export default Event;
export { eventSchema };
