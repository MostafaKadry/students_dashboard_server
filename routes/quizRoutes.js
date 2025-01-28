const express = require("express");
const {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizControllers.js");


const router = express.Router();

router.get("/getquizzes", getQuizzes);
router.post("/createquiz", createQuiz);
router.put('/updatequiz/:id', updateQuiz);
router.delete("/deletequiz/:id", deleteQuiz);

module.exports = router;