require("dotenv").config();

const request = require("supertest");
const app = require("../server.js");
// const Quiz = require("../models/quiz.js");
// const mongoose = require("mongoose");

describe("GET /api/quiz/getquizzes", () => {
  it("should return quizzes for authenticated users", async () => {
    const response = await request(app)
      .get("/api/quiz/getquizzes")
      .set("authorization", "Bearer mockToken");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // quizzes are returned as an array
    expect(response.body.length).toBeGreaterThan(0); // Ensure quizzes are returned
  });
});

describe("POST /api/quiz/createquiz", () => {
  it("should create a new quiz with valid data", async () => {
    const quizData = {
      title: "Sample Quiz",
      description: "This is a sample quiz",
      questions: { Q1: "What is Node.js?" },
      answers: { Q1: "A runtime environment" },
      semester: "Fall",
      date: "2025-01-01",
    };
    
    const response = await request(app)
    .post("/api/quiz/createquiz")
    .send(quizData)
    .set("authorization", "Bearer mockToken");

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty("message", "Quiz added successfully!");
  });

  it("should return 400 if required fields are missing", async () => {
    const incompleteData = {
      title: "Sample Quiz",
      description: "This is a sample quiz",
    };

    const response = await request(app)
      .post("/api/quiz/createquiz")
      .send(incompleteData)
      .set("Authorization", "Bearer mockToken");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "please fill in all fields!"
    );
  });


});

describe("PUT /api/quiz/updatequiz/:id", () => {
    it("should update a quiz with valid data", async () => {
      const mockQuizId = "67947825d1303c8cd87b479c";
      const updatedData = {
        title: "Updated Title",
        description: "Updated Description",
      };

     

      const response = await request(app)
        .put(`/api/quiz/updatequiz/${mockQuizId}`)
        .send(updatedData)
        .set("authorization", "Bearer mockToken");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message", "Quiz Updated Successfully");
    });

    it("should return 400 if ID is not provided", async () => {
      const response = await request(app)
        .put("/api/quiz/updatequiz/")
        .send({ title: "New Title" })
        .set("Authorization", "Bearer mockToken");

      expect(response.statusCode).toBe(404); // No route matches without ID
    });

    it("should return 404 if quiz is not found", async () => {
      const mockQuizId = "64f83b2b1c9d440000000000";
      

      const response = await request(app)
        .put(`/api/quiz/updatequiz/${mockQuizId}`)
        .send({ title: "New Title" })
        .set("Authorization", "Bearer mockToken");

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message", "Quiz not found");
    });


  });

  describe("DELETE /api/quiz/deletequiz/:id", () => {
    it("should delete a quiz with a valid ID", async () => {
      const mockQuizId = "67947832d1303c8cd87b479e";

      
      const response = await request(app)
        .delete(`/api/quiz/deletequiz/${mockQuizId}`)
        .set("Authorization", "Bearer mockToken");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message", "Quiz deleted successfully");
    });

  });
