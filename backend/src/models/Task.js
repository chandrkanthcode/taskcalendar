import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  tags: [String],
  dueDate: Date,
  startTime: Date,
  endTime: Date,
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
