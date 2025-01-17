const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get token from cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Token is not valid!" });
    }

    // Attach user data to the request object for use in subsequent routes
    req.userId = data._id;
    
    // Log for debugging (optional)
    console.log("Token verified successfully, userId:", req.userId);

    // Pass control to the next middleware
    next();
  });
};

module.exports = verifyToken;
