const mongoose = require("mongoose");
const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  semester: { type: String, required: true },
});

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = Announcement;
