const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

const SECRET_KEY = process.env.JWT_SECRET;

// Signup Controller
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "please fill in all fields!" });

    // Check if username is already in use
    const existingUser = await User.findOne({ username }).select('username');
    if (existingUser) 
      return res.status(400).json({ message: "username already in use" });


    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "please fill in all fields!" });

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "User not found" });
   

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });
   

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login };
