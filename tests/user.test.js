// require('dotenv').config();

// const request = require("supertest");
// const app = require("../server.js");


// const mongoose = require('mongoose');
/* Connecting to the database before each test. */
// beforeEach(async () => {
//   await mongoose.connect(process.env.MONGODB_URI, {});
//   console.log(process.env.MONGODB_URI)
// });

// /* Closing database connection after each test. */
// afterEach(async () => {
//   await mongoose.connection.close();
// });

// describe("POST /api/user/login", () => {
//   it("should login user", async () => {
//     const response = await request(app)
//       .post("/api/user/login")
//       .send({
//         username: "mostafa",
//         password: "123",
//       });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("token");
//   });
// });

// describe("POST /api/user/signup", () => {
//   it("should signup user", async () => {
//     const response = await request(app)
//       .post("/api/user/signup")
//       .send({
//         username: "test2",
//         password: "123",
//       });

//     expect(response.statusCode).toBe(201);

//   });
// });
