const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    req.user = { username: "test" }; // Mocked user object
    return next();
  }
  // Get the token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET);

    next(); // Continue to the route handler
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
