// src/controllers/quizController.js
const Quiz = require("../models/quiz.js");

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching quizzes" });
  }
};

const createQuiz = async (req, res) => {

  try {
    const { title, description, questions, answers, semester, date } = req.body;
    if (!title || !description || !questions || !answers || !semester || !date)
      return res.status(400).json({ message: "please fill in all fields!" });
    const newQuiz = new Quiz({
      title,
      description,
      questions,
      answers,
      semester,
      date,
    });
    await newQuiz.save();

    res.status(201).json({ message: "Quiz added successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong while creating the quiz" });
  }
};

const updateQuiz = async (req, res) => {

  try {
    const { id } = req.params;
    if(!id)  return res.status(400).json({message : "please submit 'id' in your params"})
    const updatedData = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updatedData);
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({message : "Quiz Updated Successfully"});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong while updating the quiz" });
  }
};

const deleteQuiz = async (req, res) => {

  try {
    const { id } = req.params;
    await Quiz.findByIdAndDelete(id);
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the quiz" });
  }
};

module.exports = {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
