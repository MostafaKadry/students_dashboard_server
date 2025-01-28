const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  semester: { type: String, required: true },
  questions: { type: Object, require: true },
  answers: { type: Object, require: true },
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
