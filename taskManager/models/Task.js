const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "In-Progress"],
    default: "Pending",
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});
module.exports = mongoose.model("Task", TaskSchema);
